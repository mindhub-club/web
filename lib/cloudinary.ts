import { Cloudinary } from '@cloudinary/url-gen'
import { fill, fit, crop as cCrop, scale, thumbnail } from '@cloudinary/url-gen/actions/resize'
import { autoGravity, compass, xyCenter } from '@cloudinary/url-gen/qualifiers/gravity'
// note: we avoid explicit format/quality to keep types simple

export type CropMode = 'fill' | 'fit' | 'crop' | 'scale' | 'thumb'

export type BuildUrlOptions = {
  publicId?: string
  src?: string
  cloudNameHint?: string
  width?: number
  height?: number
  aspectRatio?: number | string
  crop?: CropMode
  gravity?: 'auto' | 'center' | 'north' | 'south' | 'east' | 'west' | 'north_east' | 'north_west' | 'south_east' | 'south_west'
  offsetX?: number
  offsetY?: number
  format?: 'auto' | 'jpg' | 'png' | 'webp' | 'avif'
  quality?: 'auto' | number
}

export function getCloudNameFromEnvOrUrl(urlHint?: string): string | undefined {
  const fromEnv = (import.meta as any)?.env?.VITE_CLOUDINARY_CLOUD_NAME as string | undefined
  if (fromEnv) return fromEnv
  if (!urlHint) return undefined
  try {
    const u = new URL(urlHint)
    // https://res.cloudinary.com/<cloud>/image/upload/...
    const parts = u.pathname.split('/').filter(Boolean)
    if (u.hostname.includes('res.cloudinary.com') && parts.length > 0) {
      return parts[0]
    }
  } catch {}
  return undefined
}

export function getPublicIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url)
    if (!u.hostname.includes('res.cloudinary.com')) return null
    // path: /<cloud>/image/upload/v123/folder/name.jpg
    const segments = u.pathname.split('/').filter(Boolean)
    const uploadIndex = segments.findIndex((s) => s === 'upload')
    if (uploadIndex === -1) return null
    const afterUpload = segments.slice(uploadIndex + 1)
    // drop version if present (e.g., v123456)
    const rest = afterUpload[0]?.startsWith('v') ? afterUpload.slice(1) : afterUpload
    let publicId = rest.join('/')
    // strip extension only for known image types, keep folder/name without extension
    publicId = publicId.replace(/\.(jpg|jpeg|png|gif|webp|avif)$/i, '')
    return publicId
  } catch {
    return null
  }
}

export function buildCloudinaryUrl(opts: BuildUrlOptions): string | undefined {
  const { src, publicId: explicitPublicId } = opts
  const cloudName = getCloudNameFromEnvOrUrl(src) || opts.cloudNameHint
  const publicId = explicitPublicId ?? (src ? getPublicIdFromUrl(src) ?? undefined : undefined)

  // If not Cloudinary (or cannot parse), return original src
  if (!cloudName || !publicId) return src

  const cld = new Cloudinary({ cloud: { cloudName } })
  const img = cld.image(publicId)

  // Resize / crop
  const crop = opts.crop ?? 'fill'
  const width = typeof opts.width === 'number' ? Math.max(1, Math.round(opts.width)) : undefined
  const height = typeof opts.height === 'number' ? Math.max(1, Math.round(opts.height)) : undefined
  const aspect = opts.aspectRatio

  let w = width
  let h = height
  if (!h && !w && aspect) {
    // nothing to compute without a concrete dimension; provide a sane width
    w = 1600
  }
  if (aspect && (w || h)) {
    const parseAR = (ar: number | string): number | undefined => {
      if (typeof ar === 'number' && isFinite(ar) && ar > 0) return ar
      if (typeof ar === 'string') {
        const m = ar.match(/^(\d+)\s*:\s*(\d+)$/)
        if (m) {
          const a = parseFloat(m[1])
          const b = parseFloat(m[2])
          if (a > 0 && b > 0) return a / b
        }
      }
      return undefined
    }
    const arNum = parseAR(aspect)
    if (arNum) {
      if (w && !h) h = Math.round(w / arNum)
      if (h && !w) w = Math.round(h * arNum)
    }
  }

  const makeGravity = () => {
    const g = opts.gravity ?? 'auto'
    if (g === 'auto') return autoGravity()
    if (g === 'center') {
      return xyCenter()
    }
    // string compass directions supported by SDK
    // north|south|east|west|north_east|north_west|south_east|south_west
    // @ts-ignore - SDK allows string for compass values per changelog
    return compass(g)
  }

  switch (crop) {
    case 'fill': {
      const action = fill().width(w ?? 1600).height(h ?? 900).gravity(makeGravity())
      if (opts.gravity === 'center') {
        if (typeof opts.offsetX === 'number') (action as any).x?.(opts.offsetX)
        if (typeof opts.offsetY === 'number') (action as any).y?.(opts.offsetY)
      }
      img.resize(action)
      break
    }
    case 'fit': {
      const action = fit().width(w ?? 1600).height(h ?? 900)
      img.resize(action)
      break
    }
    case 'crop': {
      const action = cCrop().width(w ?? 1600).height(h ?? 900).gravity(makeGravity())
      if (opts.gravity === 'center') {
        if (typeof opts.offsetX === 'number') (action as any).x?.(opts.offsetX)
        if (typeof opts.offsetY === 'number') (action as any).y?.(opts.offsetY)
      }
      img.resize(action)
      break
    }
    case 'scale': {
      img.resize(scale().width(w ?? 1600))
      break
    }
    case 'thumb': {
      const action = thumbnail().width(w ?? 400).height(h ?? 400).gravity(makeGravity())
      img.resize(action)
      break
    }
  }

  // Format / quality intentionally skipped here for broad compatibility.
  // You can add them later using the url-gen delivery API if needed.

  return img.toURL()
}
