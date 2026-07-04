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

  if (frame.browserChrome) {
    return await frameBrowserChrome(input, width, height, frame)
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

async function frameBrowserChrome(input: Buffer, width: number, height: number, frame: CaptureFrame) {
  const chromeHeight = 86
  const radius = frame.borderRadius ?? 14
  const padding = frame.padding ?? 0
  const shadowMargin = frame.shadow
    ? Math.ceil(frame.shadow.blur * 2 + Math.max(Math.abs(frame.shadow.offsetX ?? 0), Math.abs(frame.shadow.offsetY ?? 0)))
    : 0
  const inset = padding + shadowMargin
  const windowHeight = height + chromeHeight
  const outputWidth = width + inset * 2
  const outputHeight = windowHeight + inset * 2
  const composites: sharp.OverlayOptions[] = []

  if (frame.shadow) {
    composites.push({
      input: createShadowSvg(outputWidth, outputHeight, {
        x: inset + (frame.shadow.offsetX ?? 0),
        y: inset + (frame.shadow.offsetY ?? 0),
        width,
        height: windowHeight,
        radius,
        blur: frame.shadow.blur,
        color: frame.shadow.color,
      }),
      left: 0,
      top: 0,
    })
  }

  composites.push({
    input: createBrowserChromeSvg(width, windowHeight, chromeHeight, radius, frame.browserChrome.title, frame.browserChrome.url ?? ''),
    left: inset,
    top: inset,
  })
  composites.push({
    input: await applyBottomRoundedMask(input, width, height, radius),
    left: inset,
    top: inset + chromeHeight,
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

async function applyBottomRoundedMask(input: Buffer, width: number, height: number, radius: number) {
  if (radius <= 0) {
    return input
  }

  const mask = Buffer.from(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <path d="M0 0 H${width} V${height - radius} Q${width} ${height} ${width - radius} ${height} H${radius} Q0 ${height} 0 ${height - radius} Z" fill="#fff"/>
    </svg>`,
  )

  return await sharp(input)
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer()
}

function createBrowserChromeSvg(
  width: number,
  height: number,
  chromeHeight: number,
  radius: number,
  title: string,
  url: string,
) {
  const tabWidth = Math.min(340, Math.round(width * 0.36))
  const addressX = 184
  const addressWidth = Math.max(300, width - 346)
  const escapedTitle = escapeSvg(title)
  const escapedUrl = escapeSvg(url.replace(/^https?:\/\//, ''))

  return Buffer.from(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="${radius}" fill="#2c2d33" stroke="#5f6067"/>
      <clipPath id="windowClip">
        <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}"/>
      </clipPath>
      <g clip-path="url(#windowClip)">
        <rect x="0" y="0" width="${width}" height="${chromeHeight}" fill="#252529"/>
        <rect x="0" y="42" width="${width}" height="${chromeHeight - 42}" fill="#2f3035"/>
        <path d="M0 0 H${width} V42 H${tabWidth + 96} Q${tabWidth + 76} 42 ${tabWidth + 76} 22 V14 Q${tabWidth + 76} 4 ${tabWidth + 66} 4 H116 Q104 4 104 16 V24 Q104 42 86 42 H0 Z" fill="#2b2b2d"/>
        <circle cx="30" cy="21" r="7" fill="#ff5f57"/>
        <circle cx="54" cy="21" r="7" fill="#febc2e"/>
        <circle cx="78" cy="21" r="7" fill="#28c840"/>
        <circle cx="118" cy="21" r="8" fill="#44464b"/>
        <text x="136" y="26" fill="#d9d9dd" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="16">${escapedTitle}</text>
        <text x="${tabWidth + 48}" y="26" fill="#d9d9dd" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="22">+</text>
        <text x="28" y="67" fill="#c8c8cd" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="28">&#8249;</text>
        <text x="66" y="67" fill="#8f9198" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="28">&#8250;</text>
        <text x="107" y="65" fill="#d3d4d8" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="18">&#8635;</text>
        <rect x="${addressX}" y="52" width="${addressWidth}" height="26" rx="13" fill="#202125"/>
        <circle cx="${addressX + 22}" cy="65" r="9" fill="#3a3c42"/>
        <text x="${addressX + 40}" y="70" fill="#f2f2f4" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="17">${escapedUrl}</text>
        <text x="${addressX + addressWidth - 34}" y="70" fill="#c4c5ca" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="20">&#9734;</text>
        <rect x="${width - 158}" y="52" width="116" height="28" rx="14" fill="#1f2024"/>
        <text x="${width - 136}" y="71" fill="#f4f4f6" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="16">Incognito</text>
        <text x="${width - 24}" y="70" fill="#c7c8cd" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="22">&#8942;</text>
      </g>
    </svg>`,
  )
}

function escapeSvg(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&apos;')
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
