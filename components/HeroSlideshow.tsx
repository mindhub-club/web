import React, { useEffect, useMemo, useRef, useState } from 'react';
import CloudinaryImage from './CloudinaryImage';

export type HeroSlide = {
  url: string;
  alt?: string;
  /** A short date label, e.g. "Fri, Nov 14" */
  dateLabel?: string;
  /** A short event name, e.g. "Entrepreneurs" */
  eventLabel?: string;
  /** Optional crop and gravity controls for Cloudinary */
  crop?: 'fill' | 'fit' | 'crop' | 'scale' | 'thumb';
  gravity?: 'auto' | 'center' | 'north' | 'south' | 'east' | 'west' | 'north_east' | 'north_west' | 'south_east' | 'south_west';
  offsetX?: number
  offsetY?: number
};

type Props = {
  slides: HeroSlide[];
  /** milliseconds between slides */
  interval?: number;
  /** adds rounded/shadow classes to match existing hero */
  className?: string;
  /** place caption on left or right (to avoid other overlays) */
  captionSide?: 'left' | 'right';
  /** callback when slide changes */
  onSlideChange?: (index: number) => void;
  /** render built-in caption inside image */
  showCaptionInside?: boolean;
  /** extra classes to control inside caption visibility (e.g., 'lg:hidden') */
  insideCaptionClassName?: string;
};

export function HeroSlideshow({ slides, interval = 3000, className, captionSide = 'left', onSlideChange, showCaptionInside = true, insideCaptionClassName }: Props) {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  const count = slides.length || 0;
  const safeSlides = useMemo(() => slides.filter(Boolean), [slides]);

  useEffect(() => {
    if (count === 0) return;
    const id = setInterval(() => {
      if (pausedRef.current) return;
      setIndex((i) => (i + 1) % count);
    }, interval);
    return () => clearInterval(id);
  }, [count, interval]);

  useEffect(() => {
    if (typeof onSlideChange === 'function') onSlideChange(index);
  }, [index, onSlideChange]);

  if (!count) return null;

  return (
    <div
      className={`relative overflow-hidden ${className || ''}`}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
      aria-roledescription="carousel"
    >
      {/* Layout spacer to preserve natural image height */}
      <div className="relative">
        <CloudinaryImage
          src={safeSlides[0]?.url}
          alt=""
          aria-hidden
          className="w-full h-auto opacity-0 invisible select-none pointer-events-none"
        />
      </div>

      {/* Slides */}
      <div className="absolute inset-0 z-0">
        {safeSlides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={i !== index}
          >
            <CloudinaryImage
              src={s.url}
              alt={s.alt || ''}
              className="w-full h-full object-cover block"
              crop={s.crop}
              gravity={s.gravity}
              offsetX={s.offsetX}
              offsetY={s.offsetY}
            />

            {/* Gradient for legibility */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Event type and day caption (optional inside) */}
            {showCaptionInside && (s.dateLabel || s.eventLabel) && (
              <div
                className={`absolute bottom-4 ${captionSide === 'right' ? 'right-4' : 'left-4'} z-10 bg-black/60 text-white px-3 py-2 rounded-md backdrop-blur-sm flex items-center gap-2 ${insideCaptionClassName || ''}`}
              >
                {s.eventLabel && <span className="text-xs font-medium">{s.eventLabel}</span>}
                {s.dateLabel && s.eventLabel && <span className="opacity-70">•</span>}
                {s.dateLabel && <span className="text-xs">{s.dateLabel}</span>}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        {safeSlides.map((_, i) => (
          <button
            key={i}
            className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-white' : 'w-2 bg-white/60'}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSlideshow;
