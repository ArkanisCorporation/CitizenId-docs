export interface ImageItem {
  src: string
  alt: string
  title?: string
  caption?: string
  description?: string
}

export interface ImageDisplayItem extends ImageItem {
  key: string
  imageSrc: string
  label: string
}

export function getImageLabel(item: ImageItem | undefined) {
  return item?.title ?? item?.caption ?? item?.alt ?? 'Image'
}

export function hasImageSummary(item: ImageItem | undefined) {
  return Boolean(item?.title || item?.caption)
}

export function hasImageCopy(item: ImageItem | undefined) {
  return Boolean(hasImageSummary(item) || item?.description)
}

export function getLightboxTitle(item: ImageItem | undefined) {
  return item?.title ?? item?.caption ?? ''
}
