import React, { useEffect, useMemo, useRef, useState, useLayoutEffect } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

type LocationStatus = 'active' | 'potential' | 'inactive';

export interface GlobeLocation {
  id: string;
  name: string;
  country?: string;
  countryName?: string;
  lat: number;
  lng: number;
  status: LocationStatus;
}

interface GlobeMapProps {
  locations: GlobeLocation[];
  selectedLocation?: string | null;
  onLocationSelect?: (locationId: string | null) => void;
  onLocationHover?: (locationId: string | null) => void;
  className?: string;
  showPotentialLocations?: boolean;
  customStyles?: {
    activeLocationColor?: string;
    potentialLocationColor?: string;
    inactiveLocationColor?: string;
    hoverColor?: string;
  };
}

export function GlobeMap({
  locations,
  selectedLocation = null,
  onLocationSelect,
  onLocationHover,
  className,
  showPotentialLocations = true,
  customStyles
}: GlobeMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const globeRef = useRef<any>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 1, h: 520 });
  const hoveredObjRef = useRef<THREE.Object3D | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  // Track whether pointer is hovering the globe container to pause auto-rotation
  const isHoveringRef = useRef(false);
  // Detect coarse pointer (touch) to tune hit target sizes
  const isCoarsePointer = useMemo(() => {
    try {
      return (
        (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
        (typeof navigator !== 'undefined' && ((navigator as any).maxTouchPoints || 0) > 0) ||
        (typeof window !== 'undefined' && 'ontouchstart' in window)
      );
    } catch {
      return false;
    }
  }, []);
  // Timer to resume auto-rotation after user interaction
  const autoRotateResumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // High-quality day/night textures (CORS-friendly). You can override via Vite env.
  const DAY_TEX = (import.meta as any).env?.VITE_GLOBE_DAY_URL || 'https://cdn.jsdelivr.net/gh/vasturiano/three-globe@v2.44.1/example/img/earth-blue-marble.jpg';
  const NIGHT_TEX = (import.meta as any).env?.VITE_GLOBE_NIGHT_URL || 'https://res.cloudinary.com/mipigu/image/upload/v1761757886/mindhub/8k_earth_nightmap_twkxoc.jpg';
  const [texUrl, setTexUrl] = useState<string>(NIGHT_TEX);

  // Parse HEX with optional alpha (#RRGGBB or #RRGGBBAA) to hex + opacity
  const parseHexWithAlpha = (hex?: string): { hex?: string; opacity?: number } => {
    if (!hex || typeof hex !== 'string') return {};
    const m8 = hex.match(/^#([0-9a-fA-F]{8})$/);
    if (m8) {
      const full = m8[1];
      const rgb = full.slice(0, 6);
      const a = full.slice(6, 8);
      const opacity = Math.max(0, Math.min(1, parseInt(a, 16) / 255));
      return { hex: `#${rgb}`, opacity };
    }
    const m6 = hex.match(/^#([0-9a-fA-F]{6})$/);
    if (m6) return { hex, opacity: 1 };
    return { hex, opacity: 1 };
  };

  // Brand/transition accent gradient texture (canvas-based) for active pin heads
  const brandHeadTexture = useMemo(() => {
    try {
      const size = 256;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return undefined;
      const grad = ctx.createRadialGradient(
        size * 0.35, // center x (slight offset for a nice highlight)
        size * 0.35, // center y
        size * 0.05,
        size * 0.5,
        size * 0.5,
        size * 0.7
      );
      // Match the app's transition accent gradient: violet → fuchsia → rose
      grad.addColorStop(0.0, '#7c3aed'); // violet-600
      grad.addColorStop(0.55, '#c026d3'); // fuchsia-600
      grad.addColorStop(1.0, '#e11d48'); // rose-600
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);

      const tex = new THREE.CanvasTexture(canvas);
      // Ensure proper color space
      if ('colorSpace' in tex) {
        (tex as any).colorSpace = (THREE as any).SRGBColorSpace;
      } else if ('encoding' in tex) {
        (tex as any).encoding = (THREE as any).sRGBEncoding;
      }
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
      tex.needsUpdate = true;
      return tex;
    } catch {
      return undefined;
    }
  }, []);

  // Resolve CSS color variables like `hsl(var(--primary))` into hex the renderer understands
  const resolveColor = (c?: string): string | undefined => {
    if (!c) return c;
    if (!c.includes('var(--')) return c;
    try {
      const match = c.match(/var\((--[^)]+)\)/);
      if (!match) return c;
      const varName = match[1];
      const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      // raw format "H S% L%" (tailwind CSS vars style)
      const parts = raw.split(/\s+/);
      const H = parseFloat(parts[0]);
      const S = parseFloat((parts[1] || '0').replace('%', '')) / 100;
      const L = parseFloat((parts[2] || '0').replace('%', '')) / 100;
      // Convert HSL to RGB
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const h = ((H % 360) + 360) % 360 / 360;
      const q = L < 0.5 ? L * (1 + S) : L + S - L * S;
      const p = 2 * L - q;
      let r = hue2rgb(p, q, h + 1/3);
      let g = hue2rgb(p, q, h);
      let b = hue2rgb(p, q, h - 1/3);
      const toHex = (x: number) => {
        const v = Math.round(x * 255);
        return (v < 16 ? '0' : '') + v.toString(16);
      };
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    } catch {
      return c;
    }
  };

  const colors = useMemo(() => ({
    // Use transition accent hue when not using the gradient texture
    active: resolveColor(customStyles?.activeLocationColor) || '#c026d3', // fuchsia-600 (center of gradient)
    potential: resolveColor(customStyles?.potentialLocationColor) || '#052c5bff',
    inactive: resolveColor(customStyles?.inactiveLocationColor) || '#d1d5db',
    hover: resolveColor(customStyles?.hoverColor) || '#ffffff',
  }), [customStyles]);

  const visibleLocations = useMemo(() => (
    locations.filter(l => l.status === 'active' || (showPotentialLocations && l.status === 'potential'))
  ), [locations, showPotentialLocations]);

  // Single anchored label (selected takes precedence, else hovered)
  const anchoredLabelData = useMemo(() => {
    const id = selectedLocation || hoveredId || null;
    if (!id) return [] as any[];
    const loc = locations.find(l => l.id === id);
    return loc ? [loc] : [];
  }, [selectedLocation, hoveredId, locations]);

  // Track container size and set width/height for the Globe component
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const handle = () => setSize({ w: el.clientWidth || 800, h: el.clientHeight || 520 });
    handle();
    let ro: ResizeObserver | null = null;
    if (typeof (window as any).ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(handle);
      ro.observe(el);
    } else {
      window.addEventListener('resize', handle);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', handle);
    };
  }, []);

  // Configure POV and autorotate when globe is ready
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;
    try {
      // Initial POV focused roughly on Europe
      globe.pointOfView?.({ lat: 45, lng: 15, altitude: 0.55 }, 0);
      const controls = globe.controls?.() || globe.controls;
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.25;
        controls.enableZoom = false;
        controls.enablePan = true;
        const isTouch = (navigator as any).maxTouchPoints > 0 || 'ontouchstart' in window;
        if (isTouch) {
          // On touch: one finger scrolls page (we suppress its moves); two fingers rotate (no dolly/zoom)
          controls.enableRotate = true;
          controls.enableZoom = false;
          try {
            if ((THREE as any).TOUCH && controls.touches) {
              const T = (THREE as any).TOUCH;
              // Use DOLLY_ROTATE so two-finger rotates; with enableZoom=false no dolly occurs
              const two = typeof T.DOLLY_ROTATE !== 'undefined' ? T.DOLLY_ROTATE : (typeof T.DOLLY_PAN !== 'undefined' ? T.DOLLY_PAN : T.ROTATE);
              controls.touches = {
                ONE: T.ROTATE, // single-finger moves are suppressed by our pointer filter
                TWO: two,
              } as any;
            }
          } catch {}
          // Hard-lock zoom distance on touch devices to prevent any drift
          try {
            const camera: any = globe.camera?.() || globe.camera;
            if (camera && camera.position && camera.position.distanceTo && controls?.target) {
              const dist = camera.position.distanceTo(controls.target);
              if (Number.isFinite(dist)) {
                controls.minDistance = dist;
                controls.maxDistance = dist;
              }
            }
          } catch {}
        } else {
          // Desktop: allow mouse rotate
          controls.enableRotate = true;
        }
      }
      // Improve texture quality: raise anisotropy, mipmap filters, and DPR
      const renderer = globe.renderer?.() || globe.renderer;
      // Ensure the interactive element (canvas/controls) allows one-finger page scroll
      try {
        const ctrl = globe.controls?.() || globe.controls;
        const ctrlEl: HTMLElement | undefined = (ctrl && (ctrl.domElement as HTMLElement)) || undefined;
        const canvasEl: HTMLElement | undefined = (renderer && (renderer.domElement as HTMLElement)) || undefined;
        // three.js OrbitControls sets touch-action: none by default; override to allow vertical scroll
        if (ctrlEl) {
          ctrlEl.style.touchAction = 'pan-y';
        }
        if (canvasEl) {
          canvasEl.style.touchAction = 'pan-y';
        }
      } catch {}
      if (renderer?.setPixelRatio) {
        renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      }
      // Slightly increase exposure and ensure sRGB output for brighter, accurate colors
      try {
        if (renderer) {
          (renderer as any).toneMappingExposure = 1.25;
          if ('outputEncoding' in renderer) {
            (renderer as any).outputEncoding = (THREE as any).sRGBEncoding;
          } else if ('outputColorSpace' in renderer) {
            (renderer as any).outputColorSpace = (THREE as any).SRGBColorSpace;
          }
        }
      } catch {}
      const mat = globe.globeMaterial?.() || globe.globeMaterial;
      const maxAniso = renderer?.capabilities?.getMaxAnisotropy?.() || 0;
      const applyTexQuality = (tex?: THREE.Texture) => {
        if (!tex) return;
        tex.anisotropy = Math.max(tex.anisotropy || 0, maxAniso || 0);
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.needsUpdate = true;
      };
      applyTexQuality(mat?.map);
      applyTexQuality(mat?.bumpMap);
      // Disable specular glare/reflection and flatten relief
      if (mat) {
        mat.shininess = 0;
        mat.specular = new THREE.Color(0x000000);
        (mat as any).reflectivity = 0;
        (mat as any).metalness = 0;
        (mat as any).emissive = new THREE.Color(0x000000);
        (mat as any).emissiveIntensity = 0;
        (mat as any).envMap = null;
        if (typeof (mat as any).bumpScale !== 'undefined') {
          (mat as any).bumpScale = 0; // remove relief that can cause highlight bands
        }
        mat.needsUpdate = true;
      }
      // Dim directional lights to avoid shiny highlights; favor ambient lighting
      const scene = globe.scene?.() || globe.scene;
      if (scene && Array.isArray(scene.children)) {
        scene.children.forEach((obj: any) => {
          if (obj?.isDirectionalLight) {
            obj.intensity = 0.35;
          }
          if (obj?.isAmbientLight) {
            obj.intensity = 1.4;
          }
        });
      }
      // Use a clean, solid background (no starfield) to reduce distraction.
    } catch {}
  }, []);

  // Pause/resume globe auto-rotation on hover over the map container
  useEffect(() => {
    const el = containerRef.current;
    const globe = globeRef.current;
    if (!el || !globe) return;

    const getControls = () => globe.controls?.() || globe.controls;

    const onEnter = () => {
      isHoveringRef.current = true;
      try {
        const controls = getControls();
        if (controls) {
          controls.autoRotateSpeed = 0.07
          controls.update?.();
        }
      } catch {}
    };
    
    const onLeave = () => {
      isHoveringRef.current = false;
      try {
        const controls = getControls();
        if (controls) {
          controls.autoRotateSpeed = 0.2
          controls.update?.();
        }
      } catch {}
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    // Also handle pointer events to be robust across devices
    el.addEventListener('pointerenter', onEnter);
    el.addEventListener('pointerleave', onLeave);

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('pointerenter', onEnter);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  // Textures are loaded via CDN (not bundled)
  // Choose dark or light texture based on OS theme; can be overridden via env above
  useEffect(() => {
    const mql = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
    const apply = () => setTexUrl(mql?.matches ? NIGHT_TEX : DAY_TEX);
    apply();
    if (mql && 'addEventListener' in mql) {
      mql.addEventListener('change', apply);
      return () => mql.removeEventListener('change', apply);
    } else if (mql && 'addListener' in mql) {
      // Safari fallback
      // @ts-ignore
      mql.addListener(apply);
      // @ts-ignore
      return () => mql.removeListener(apply);
    }
  }, [DAY_TEX, NIGHT_TEX]);

  // Ensure one-finger touch over the globe does not hijack page scroll
  // Use pointer events so iOS/Safari also behaves; do not preventDefault so scrolling remains
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const activePointers = new Set<number>();
    const getEls = () => {
      const globe = globeRef.current;
      const renderer: any = globe?.renderer?.() || globe?.renderer;
      const controls: any = globe?.controls?.() || globe?.controls;
      const ctrlEl: HTMLElement | undefined = controls?.domElement as HTMLElement | undefined;
      const canvasEl: HTMLElement | undefined = renderer?.domElement as HTMLElement | undefined;
      return { ctrlEl, canvasEl };
    };
    const setTouchAction = (value: string) => {
      try {
        const { ctrlEl, canvasEl } = getEls();
        if (ctrlEl) ctrlEl.style.touchAction = value;
        if (canvasEl) canvasEl.style.touchAction = value;
      } catch {}
    };
    // iOS Safari emits non-standard gesture events for pinch; block them when multitouching the globe
    const onGesture = (e: Event) => {
      e.preventDefault();
    };
    // Fallback for browsers using TouchEvent: block page zoom/scroll when 2+ touches on the globe
    const onTouchMoveBlock = (e: TouchEvent) => {
      if (e.touches && e.touches.length >= 2) {
        e.preventDefault();
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      // Track active touch pointers but do not block the initial down event.
      // OrbitControls needs the first pointerdown to correctly initialize multi-touch.
      activePointers.add(e.pointerId);
      if (activePointers.size >= 2) {
        // When two fingers are down, temporarily disable browser gestures so OrbitControls receives movement
        setTouchAction('none');
        // Add blocking listeners to suppress browser pinch-zoom and two-finger scroll
        try {
          el.addEventListener('gesturestart', onGesture as any, { passive: false, capture: true } as any);
          el.addEventListener('gesturechange', onGesture as any, { passive: false, capture: true } as any);
          el.addEventListener('touchmove', onTouchMoveBlock as any, { passive: false, capture: true } as any);
        } catch {}
      }
    };
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      // Allow two-finger gestures to reach controls; suppress single-finger moves
      if (activePointers.size === 1) {
        (e as any).stopImmediatePropagation?.();
        e.stopPropagation();
      }
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') return;
      activePointers.delete(e.pointerId);
      if (activePointers.size <= 1) {
        // Restore page-friendly touch behavior
        setTouchAction('pan-y pinch-zoom');
        // Remove blocking listeners when no longer multitouching
        try {
          el.removeEventListener('gesturestart', onGesture as any, true);
          el.removeEventListener('gesturechange', onGesture as any, true);
          el.removeEventListener('touchmove', onTouchMoveBlock as any, true);
        } catch {}
      }
    };
    el.addEventListener('pointerdown', onPointerDown as any, true);
    el.addEventListener('pointermove', onPointerMove as any, true);
    el.addEventListener('pointerup', onPointerUp as any, true);
    el.addEventListener('pointercancel', onPointerUp as any, true);
    el.addEventListener('pointerleave', onPointerUp as any, true);
    return () => {
      el.removeEventListener('pointerdown', onPointerDown as any, true);
      el.removeEventListener('pointermove', onPointerMove as any, true);
      el.removeEventListener('pointerup', onPointerUp as any, true);
      el.removeEventListener('pointercancel', onPointerUp as any, true);
      el.removeEventListener('pointerleave', onPointerUp as any, true);
    };
  }, []);

  

  // No imperative updates needed; props below capture visibleLocations and selection
  // Fly to the selected location when it changes and pause auto-rotation briefly
  useEffect(() => {
    if (!selectedLocation) return;
    const target = locations.find(l => l.id === selectedLocation);
    const globe = globeRef.current;
    if (!target || !globe) return;
    try {
      // Smooth pan/zoom to target; keep a readable altitude
      const durationMs = 1200;
      globe.pointOfView?.({ lat: target.lat, lng: target.lng }, durationMs);

      // Temporarily pause auto-rotation after selection, then resume
      const controls = globe.controls?.() || globe.controls;
      if (controls) {
        if (autoRotateResumeTimer.current) {
          clearTimeout(autoRotateResumeTimer.current);
          autoRotateResumeTimer.current = null;
        }
        controls.autoRotate = false;
        controls.update?.();
        autoRotateResumeTimer.current = setTimeout(() => {
          try {
            controls.autoRotate = true;
            controls.autoRotateSpeed = isHoveringRef.current ? 0.07 : 0.2;
            controls.update?.();
          } catch {}
        }, 1500);
      }
    } catch {}
  }, [selectedLocation, locations]);

  // Cleanup any pending timers on unmount
  useEffect(() => {
    return () => {
      if (autoRotateResumeTimer.current) {
        clearTimeout(autoRotateResumeTimer.current);
        autoRotateResumeTimer.current = null;
      }
    };
  }, []);

  const formatLocationLabel = (d: any) => {
    const city = d?.name || '';
    const country = d?.countryName || d?.country || '';
    return country ? `${city}, ${country}` : city;
  };

  // Canvas-based label sprite to support full unicode (accents) via system fonts
  const createLabelSprite = (text: string) => {
    try {
      const dpr = Math.min(2, (typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1));
      const padding = 8 * dpr;
      const fontSize = (isCoarsePointer ? 16 : 14) * dpr;
      const font = `${Math.round(fontSize)}px Inter, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Helvetica, Arial, sans-serif`;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('no-ctx');
      ctx.font = font;
      // Normalize to NFC to avoid accent rendering issues on some canvases
      const normalized = (text || '').toString().normalize('NFC');
      const metrics = ctx.measureText(normalized);
      const textW = Math.ceil(metrics.width);
      const textH = Math.ceil(fontSize * 1.35);
      canvas.width = textW + padding * 2;
      canvas.height = textH + padding * 2;
      // Redraw with proper size
      ctx.font = font;
      ctx.textBaseline = 'middle';
      // Background pill for readability
      const radius = 10 * dpr;
      const w = canvas.width, h = canvas.height;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.beginPath();
      ctx.moveTo(padding + radius, padding);
      ctx.lineTo(w - padding - radius, padding);
      ctx.quadraticCurveTo(w - padding, padding, w - padding, padding + radius);
      ctx.lineTo(w - padding, h - padding - radius);
      ctx.quadraticCurveTo(w - padding, h - padding, w - padding - radius, h - padding);
      ctx.lineTo(padding + radius, h - padding);
      ctx.quadraticCurveTo(padding, h - padding, padding, h - padding - radius);
      ctx.lineTo(padding, padding + radius);
      ctx.quadraticCurveTo(padding, padding, padding + radius, padding);
      ctx.closePath();
      ctx.fill();
      // Text with slight shadow
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 2 * dpr;
      ctx.shadowOffsetY = 1 * dpr;
      ctx.fillText(normalized, padding, h / 2);

      const tex = new THREE.CanvasTexture(canvas);
      if ('colorSpace' in tex) {
        (tex as any).colorSpace = (THREE as any).SRGBColorSpace;
      } else if ('encoding' in tex) {
        (tex as any).encoding = (THREE as any).sRGBEncoding;
      }
      tex.needsUpdate = true;
      const material = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false });
      const sprite = new THREE.Sprite(material);
      // Size in world units (keep modest); width scales with aspect ratio
      const worldHeight = isCoarsePointer ? 6 : 5;
      const aspect = canvas.width / canvas.height;
      sprite.scale.set(worldHeight * aspect, worldHeight, 1);
      // Expose a way to update text later if needed
      (sprite as any).userData.__updateText = (newText: string) => {
        try {
          const ctx2 = canvas.getContext('2d');
          if (!ctx2) return;
          const t = (newText || '').toString().normalize('NFC');
          // Clear and redraw (keeping same canvas size to avoid reallocating texture)
          ctx2.clearRect(0, 0, canvas.width, canvas.height);
          // Background
          ctx2.fillStyle = 'rgba(0, 0, 0, 0.45)';
          ctx2.beginPath();
          ctx2.moveTo(padding + radius, padding);
          ctx2.lineTo(canvas.width - padding - radius, padding);
          ctx2.quadraticCurveTo(canvas.width - padding, padding, canvas.width - padding, padding + radius);
          ctx2.lineTo(canvas.width - padding, canvas.height - padding - radius);
          ctx2.quadraticCurveTo(canvas.width - padding, canvas.height - padding, canvas.width - padding - radius, canvas.height - padding);
          ctx2.lineTo(padding + radius, canvas.height - padding);
          ctx2.quadraticCurveTo(padding, canvas.height - padding, padding, canvas.height - padding - radius);
          ctx2.lineTo(padding, padding + radius);
          ctx2.quadraticCurveTo(padding, padding, padding + radius, padding);
          ctx2.closePath();
          ctx2.fill();
          // Text
          ctx2.fillStyle = '#ffffff';
          ctx2.shadowColor = 'rgba(0,0,0,0.4)';
          ctx2.shadowBlur = 2 * dpr;
          ctx2.shadowOffsetY = 1 * dpr;
          ctx2.textBaseline = 'middle';
          ctx2.font = font;
          ctx2.fillText(t, padding, canvas.height / 2);
          tex.needsUpdate = true;
        } catch {}
      };
      return sprite;
    } catch {
      return undefined;
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width: '100%', maxWidth: '100%', height: '520px', boxSizing: 'border-box', touchAction: 'pan-y pinch-zoom' }}
    >
      <Globe
        ref={globeRef}
        width={Math.max(1, size.w)}
        height={size.h || 520}
        globeImageUrl={texUrl}
        animateIn={false}
        rendererConfig={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        // Disable built-in labels to avoid missing diacritics in default typeface
        labelsData={[]}
        labelSize={0}
        labelDotRadius={0}
        labelsTransitionDuration={0}

        // True 3D pins via objects API
        objectsData={visibleLocations}
        objectLat={'lat' as any}
        objectLng={'lng' as any}
        objectAltitude={() => 0}
        // Keep hover tooltip text consistent with anchored label
        objectLabel={formatLocationLabel}
        objectThreeObject={(d: any) => {
          const group = new THREE.Group();
          group.userData.__id = d.id;
          const status = d.status as LocationStatus;
          const base = status === 'active' ? colors.active : status === 'potential' ? colors.potential : colors.inactive;
          const { hex: baseHex, opacity: baseOpacity = 1 } = parseHexWithAlpha(base || '#388cf3');
          const color = new THREE.Color(baseHex || '#388cf3');
          const useActiveOverride = status === 'active' && !!customStyles?.activeLocationColor;

          // Sizes (world units; globe radius ~100). Thin needle and taller shaft so head has clear altitude.
          const headRadius = status === 'active' ? 0.8 : 0.6;
          // Keep pins visually slender to avoid large pick areas
          const tipHeight = headRadius * 1.2;
          const tipRadius = Math.max(0.12, headRadius * 0.08); // contact radius (near the globe)

          // Materials
          // Use the transition accent gradient texture for active heads; otherwise fall back to a solid accent hue
          const headMat = (status === 'active' && brandHeadTexture && !useActiveOverride)
            ? new THREE.MeshStandardMaterial({
                color: new THREE.Color(0xffffff), // keep texture colors
                map: brandHeadTexture,
                metalness: 0.15,
                roughness: 0.35,
                transparent: baseOpacity < 1,
                opacity: baseOpacity
              })
            : new THREE.MeshStandardMaterial({
                color: status === 'active' ? new THREE.Color(colors.active) : color,
                metalness: 0.1,
                roughness: 0.35,
                transparent: baseOpacity < 1,
                opacity: baseOpacity
              });
          // Tip should match the head color/texture
          const tipMat = (status === 'active' && brandHeadTexture && !useActiveOverride)
            ? new THREE.MeshStandardMaterial({
                color: new THREE.Color(0xffffff), // keep texture colors
                map: brandHeadTexture,
                metalness: 0.12,
                roughness: 0.45,
                transparent: baseOpacity < 1,
                opacity: baseOpacity
              })
            : new THREE.MeshStandardMaterial({
                color: status === 'active' ? new THREE.Color(colors.active) : color.clone(),
                metalness: 0.1,
                roughness: 0.5,
                transparent: baseOpacity < 1,
                opacity: baseOpacity
              });

          // Geometry
          const headGeo = new THREE.SphereGeometry(headRadius, 28, 24);
          // Use a straight cylinder shaft (equal radii) so the entire tip has the same thickness
          const tipGeo = new THREE.CylinderGeometry(tipRadius, tipRadius, tipHeight, 32, 1, false);
          // Orient the cylinder to extend along local +Z with the base touching the globe at z=0.
          tipGeo.rotateX(-Math.PI / 2);
          tipGeo.translate(0, 0, tipHeight / 2);

          const headMesh = new THREE.Mesh(headGeo, headMat);
          const tipMesh = new THREE.Mesh(tipGeo, tipMat);
          // Mark parts with root reference so event handlers can resolve the group from children
          (headMesh as any).userData.__root = group;
          (tipMesh as any).userData.__root = group;
          // Disable mesh raycasts so we can control precision via a custom group raycast
          (headMesh as any).raycast = () => {};
          headMesh.castShadow = false;
          headMesh.receiveShadow = false;
          (tipMesh as any).raycast = () => {};
          tipMesh.castShadow = false;
          tipMesh.receiveShadow = false;

          // Place the head further out from the apex along +Z.
          // Keep a tiny gap between cone base and sphere bottom for a crisp separation.
          const gap = headRadius * 0.08;
          headMesh.position.z = tipHeight + headRadius + gap;

          group.add(tipMesh);
          group.add(headMesh);

          // Create a canvas-based label that supports accents
          const labelSprite = createLabelSprite(formatLocationLabel(d));
          if (labelSprite) {
            // Position slightly above the head along local +Z
            labelSprite.position.copy(headMesh.position.clone());
            labelSprite.position.z += headRadius * 1.3 + tipHeight * 0.15;
            labelSprite.visible = false; // only show for hovered/selected
            // Ensure correct draw order above globe
            (labelSprite.material as any).depthTest = false;
            (labelSprite.material as any).depthWrite = false;
            // Do not allow label to capture pointer events
            (labelSprite as any).raycast = () => {};
            group.add(labelSprite);
            group.userData.__labelSprite = labelSprite;
          }

          // Store for hover tweaks
          group.userData.__parts = { headMesh, tipMesh, headMat, tipMat };

          // Custom precise raycast: intersect a small sphere around the head only
          (group as any).raycast = (raycaster: THREE.Raycaster, intersects: any[]) => {
            try {
              const headWorld = new THREE.Vector3();
              headMesh.getWorldPosition(headWorld);
              const ray = raycaster.ray;
              const oc = new THREE.Vector3().subVectors(ray.origin, headWorld);
              const dir = ray.direction;
              // Use at least the visible head radius so hovering the head always registers
              const headR = headRadius; // captured from outer scope
              const radius = headR * (isCoarsePointer ? 1.25 : 1.05);
              const b = oc.dot(dir);
              const c = oc.lengthSq() - radius * radius;
              const disc = b * b - c;
              if (disc < 0) return; // no hit
              const sqrtDisc = Math.sqrt(disc);
              let t = -b - sqrtDisc;
              if (t < 0) t = -b + sqrtDisc;
              if (t < 0) return;
              const point = new THREE.Vector3();
              ray.at(t, point);
              intersects.push({ distance: ray.origin.distanceTo(point), point, object: group });
            } catch {}
          };

          return group;
        }}
        
        onObjectHover={(obj?: any, prev?: any) => {
          // Resolve child meshes to the root group for consistent styling/selection
          const resolveRoot = (o: any) => (o?.userData?.__id ? o : (o?.userData?.__root || o));
          prev = resolveRoot(prev);
          obj = resolveRoot(obj);
          // Reset previous
          if (prev) {
            try {
              prev.scale.set(1, 1, 1);
              const parts = prev.userData?.__parts;
              if (parts?.headMat) {
                parts.headMat.emissive?.set?.(0x000000);
                (parts.headMat as any).emissiveIntensity = 0;
              }
              prev.userData.__hovered = false;
            } catch {}
          }
          if (obj) {
            try {
              obj.scale.set(1.08, 1.08, 1.08);
              const parts = obj.userData?.__parts;
              if (parts?.headMat) {
                parts.headMat.emissive?.set?.('#ffffff');
                (parts.headMat as any).emissiveIntensity = 0.2;
              }
              const id = obj.userData?.__id as string | undefined;
              if (id) {
                onLocationHover?.(id);
                setHoveredId(id);
              }
              obj.userData.__hovered = true;
            } catch {}
          } else {
            try { onLocationHover?.(null); } catch {}
            setHoveredId(null);
          }
          hoveredObjRef.current = obj || null;
        }}
        onObjectClick={(obj: any) => {
          try {
            const root = obj?.userData?.__id ? obj : obj?.userData?.__root || obj;
            const id = root?.userData?.__id as string | undefined;
            if (id) onLocationSelect?.(id);
          } catch {}
        }}
      />
    </div>
  );
}
