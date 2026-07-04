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
  const topHeight = 38
  const toolbarHeight = chromeHeight - topHeight
  const toolbarCenter = topHeight + toolbarHeight / 2
  const addressHeight = 30
  const addressY = topHeight + Math.round((toolbarHeight - addressHeight) / 2)
  const tabX = 104
  const tabWidth = Math.min(270, Math.round(width * 0.22))
  const toolbarItemSize = 24
  const toolbarGap = 12
  const toolbarStartX = 16
  const backX = toolbarStartX + toolbarItemSize / 2
  const forwardX = backX + toolbarItemSize + toolbarGap
  const reloadX = forwardX + toolbarItemSize + toolbarGap
  const addressX = reloadX + toolbarItemSize / 2 + toolbarGap
  const incognitoHeight = addressHeight
  const incognitoWidth = 124
  const menuX = width - 24
  const incognitoX = menuX - incognitoWidth - 24
  const addressWidth = Math.max(300, incognitoX - addressX - 20)
  const starX = addressX + addressWidth - 28
  const lockX = addressX + 43
  const urlTextX = lockX + 22
  const escapedTitle = escapeSvg(title)
  const escapedUrl = escapeSvg(url.replace(/^https?:\/\//, ''))

  return Buffer.from(
    `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="${width - 1}" height="${height - 1}" rx="${radius}" fill="#2b2d30" stroke="#4a4d52"/>
      <clipPath id="windowClip">
        <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}"/>
      </clipPath>
      <g clip-path="url(#windowClip)">
        <rect x="0" y="0" width="${width}" height="${topHeight}" fill="#1f2023"/>
        <rect x="0" y="${topHeight}" width="${width}" height="${toolbarHeight}" fill="#303337"/>
        <circle cx="26" cy="19" r="6.5" fill="#ff5f57"/>
        <circle cx="50" cy="19" r="6.5" fill="#febc2e"/>
        <circle cx="74" cy="19" r="6.5" fill="#28c840"/>
        <path d="M${tabX + 10} 4 H${tabX + tabWidth - 12} Q${tabX + tabWidth} 4 ${tabX + tabWidth} 16 V28 Q${tabX + tabWidth} 38 ${tabX + tabWidth + 10} 38 H${tabX - 10} Q${tabX} 38 ${tabX} 28 V16 Q${tabX} 4 ${tabX + 10} 4 Z" fill="#303337"/>
        <circle cx="${tabX + 17}" cy="19.5" r="7.5" fill="none" stroke="#cbd0d6" stroke-width="1.3"/>
        <path d="M${tabX + 9.5} 19.5 H${tabX + 24.5} M${tabX + 17} 12 C${tabX + 13.5} 15.5 ${tabX + 13.5} 23.5 ${tabX + 17} 27 M${tabX + 17} 12 C${tabX + 20.5} 15.5 ${tabX + 20.5} 23.5 ${tabX + 17} 27" fill="none" stroke="#cbd0d6" stroke-width="1.1" stroke-linecap="round"/>
        <text x="${tabX + 34}" y="25" fill="#dadddf" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="13">${escapedTitle}</text>
        <path d="M${tabX + tabWidth - 27} 16.5 L${tabX + tabWidth - 20} 23.5 M${tabX + tabWidth - 20} 16.5 L${tabX + tabWidth - 27} 23.5" stroke="#dadddf" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M${tabX + tabWidth + 30} 15.5 V24.5 M${tabX + tabWidth + 25.5} 20 H${tabX + tabWidth + 34.5}" stroke="#dadddf" stroke-width="2" stroke-linecap="round"/>
        <g transform="translate(${backX - 12} ${toolbarCenter - 12})" fill="none" stroke="#e8eaed" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6 L9 12 L15 18"/><path d="M9 12 H21"/></g>
        <g transform="translate(${forwardX - 12} ${toolbarCenter - 12})" fill="none" stroke="#8d9095" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6 L15 12 L9 18"/><path d="M3 12 H15"/></g>
        <g transform="translate(${reloadX - 12} ${toolbarCenter - 12})" fill="none" stroke="#e8eaed" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M19 4 V9 H14"/><path d="M5 12 A7 7 0 0 1 17.5 7.5 L19 9"/><path d="M5 20 V15 H10"/><path d="M19 12 A7 7 0 0 1 6.5 16.5 L5 15"/></g>
        <rect x="${addressX}" y="${addressY}" width="${addressWidth}" height="${addressHeight}" rx="${addressHeight / 2}" fill="#202124"/>
        <circle cx="${addressX + 18}" cy="${toolbarCenter}" r="13" fill="#4a4d52"/>
        <path d="M${addressX + 11} ${toolbarCenter - 4} H${addressX + 25} M${addressX + 11} ${toolbarCenter + 4} H${addressX + 25}" stroke="#e8eaed" stroke-width="1.8" stroke-linecap="round"/>
        <circle cx="${addressX + 15}" cy="${toolbarCenter - 4}" r="2" fill="#3c4043" stroke="#e8eaed" stroke-width="1.4"/>
        <circle cx="${addressX + 21}" cy="${toolbarCenter + 4}" r="2" fill="#3c4043" stroke="#e8eaed" stroke-width="1.4"/>
        <rect x="${lockX}" y="${toolbarCenter - 1}" width="13" height="10" rx="2" fill="#34a853"/>
        <path d="M${lockX + 3} ${toolbarCenter - 1} V${toolbarCenter - 5} C${lockX + 3} ${toolbarCenter - 9} ${lockX + 10} ${toolbarCenter - 9} ${lockX + 10} ${toolbarCenter - 5} V${toolbarCenter - 1}" fill="none" stroke="#34a853" stroke-width="2" stroke-linecap="round"/>
        <text x="${urlTextX}" y="${toolbarCenter + 5}" fill="#ffffff" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="16">${escapedUrl}</text>
        <g transform="translate(${starX - 10} ${toolbarCenter - 10})" fill="none" stroke="#e8eaed" stroke-width="1.8" stroke-linejoin="round"><path d="M10 2 L12.5 7 L18 7.5 L14 11.5 L15 17 L10 14 L5 17 L6 11.5 L2 7.5 L7.5 7 Z"/></g>
        <rect x="${incognitoX}" y="${addressY}" width="${incognitoWidth}" height="${incognitoHeight}" rx="${incognitoHeight / 2}" fill="#202124"/>
        <text x="${incognitoX + 23}" y="${toolbarCenter + 5}" fill="#ffffff" font-family="Inter,Segoe UI,Arial,sans-serif" font-size="16">Incognito</text>
        <circle cx="${menuX}" cy="${toolbarCenter - 8}" r="2.2" fill="#e8eaed"/>
        <circle cx="${menuX}" cy="${toolbarCenter}" r="2.2" fill="#e8eaed"/>
        <circle cx="${menuX}" cy="${toolbarCenter + 8}" r="2.2" fill="#e8eaed"/>
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
