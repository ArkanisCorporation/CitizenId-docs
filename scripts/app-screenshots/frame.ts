import type { CaptureFrame } from './types.js'
import { Buffer } from 'node:buffer'
import sharp from 'sharp'

interface FramedScreenshot {
  data: Buffer
  info: sharp.OutputInfo
}

export async function frameScreenshot(input: Buffer, frame?: CaptureFrame): Promise<FramedScreenshot> {
  if (!frame) {
    return await sharp(input)
      .png()
      .toBuffer({ resolveWithObject: true })
  }

  const metadata = await sharp(input).metadata()
  const width = metadata.width
  const height = metadata.height

  if (!width || !height) {
    throw new Error('Unable to read screenshot dimensions for post-processing.')
  }

  const padding = frame.padding ?? 0
  const shadowMargin = frame.shadow
    ? Math.ceil(frame.shadow.blur * 2 + Math.max(Math.abs(frame.shadow.offsetX ?? 0), Math.abs(frame.shadow.offsetY ?? 0)))
    : 0
  const inset = padding + shadowMargin
  const outputWidth = width + inset * 2
  const outputHeight = height + inset * 2
  const roundedInput = await applyRoundedMask(input, width, height, frame.borderRadius ?? 0)
  const composites: sharp.OverlayOptions[] = []

  if (frame.shadow) {
    composites.push({
      input: createShadowSvg(outputWidth, outputHeight, {
        x: inset + (frame.shadow.offsetX ?? 0),
        y: inset + (frame.shadow.offsetY ?? 0),
        width,
        height,
        radius: frame.borderRadius ?? 0,
        blur: frame.shadow.blur,
        color: frame.shadow.color,
      }),
      left: 0,
      top: 0,
    })
  }

  composites.push({
    input: roundedInput,
    left: inset,
    top: inset,
  })

  return await sharp({
    create: {
      width: outputWidth,
      height: outputHeight,
      channels: 4,
      background: frame.background ?? { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite(composites)
    .png()
    .toBuffer({ resolveWithObject: true })
}

async function applyRoundedMask(input: Buffer, width: number, height: number, radius: number) {
  if (radius <= 0) {
    return input
  }

  const mask = Buffer.from(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="#fff"/>
    </svg>`,
  )

  return await sharp(input)
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer()
}

function createShadowSvg(
  outputWidth: number,
  outputHeight: number,
  rect: {
    x: number
    y: number
    width: number
    height: number
    radius: number
    blur: number
    color: string
  },
) {
  return Buffer.from(
    `<svg width="${outputWidth}" height="${outputHeight}" viewBox="0 0 ${outputWidth} ${outputHeight}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="${rect.blur}"/>
        </filter>
      </defs>
      <rect x="${rect.x}" y="${rect.y}" width="${rect.width}" height="${rect.height}" rx="${rect.radius}" ry="${rect.radius}" fill="${rect.color}" filter="url(#shadow)"/>
    </svg>`,
  )
}
