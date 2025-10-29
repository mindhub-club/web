import React from 'react'
import { ImageWithFallback } from './figma/ImageWithFallback'
import { buildCloudinaryUrl } from '../lib/cloudinary'

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  publicId?: string
  src?: string
  width?: number
  height?: number
  aspectRatio?: number | string
  crop?: 'fill' | 'fit' | 'crop' | 'scale' | 'thumb'
  gravity?: 'auto' | 'center' | 'north' | 'south' | 'east' | 'west' | 'north_east' | 'north_west' | 'south_east' | 'south_west'
  offsetX?: number
  offsetY?: number
  format?: 'auto' | 'jpg' | 'png' | 'webp' | 'avif'
  quality?: 'auto' | number
}

/**
 * CloudinaryImage
 * - Uses Cloudinary URL Generation SDK to build a transformed URL.
 * - Accepts either a Cloudinary `publicId` or a full Cloudinary `src` URL.
 * - Supports width/height/aspectRatio and basic crop modes. Defaults to fill + auto gravity.
 */
export function CloudinaryImage(props: Props) {
  const {
    publicId,
    src,
    width,
    height,
    aspectRatio,
    crop = 'fill',
    gravity,
    offsetX,
    offsetY,
    format = 'auto',
    quality = 'auto',
    alt,
    className,
    ...rest
  } = props

  const url = buildCloudinaryUrl({ publicId, src, width, height, aspectRatio, crop, format, quality, gravity, offsetX, offsetY }) || src

  return (
    <ImageWithFallback
      src={url}
      alt={alt}
      className={className}
      {...rest}
    />
  )
}

export default CloudinaryImage
