export type ScreenshotScope = 'viewport' | 'fullPage' | 'element'

export interface CaptureViewport {
  id: string
  width: number
  height: number
  deviceScaleFactor?: number
  isMobile?: boolean
}

export interface CaptureShadow {
  blur: number
  offsetX?: number
  offsetY?: number
  color: string
}

export interface CaptureFrame {
  padding?: number
  background?: string
  borderRadius?: number
  shadow?: CaptureShadow
  browserChrome?: {
    title: string
    url?: string
  }
}

export type CaptureStep
  = | { type: 'clearLocalStorage' }
    | { type: 'click', selector: string }
    | { type: 'waitForSelector', selector: string, visible?: boolean, timeoutMs?: number }
    | { type: 'evaluate', script: string }

export interface CaptureTarget {
  id: string
  path: string
  scope: ScreenshotScope
  selector?: string
  outputName?: string
  viewports?: string[]
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2'
  waitForSelector?: string
  steps?: CaptureStep[]
  styles?: string[]
  frame?: CaptureFrame
  frames?: Record<string, CaptureFrame>
  scrollIntoView?: boolean
}

export interface CaptureOptions {
  baseUrl: URL
  displayOrigin: URL
  outputDir: string
  selectedTargets: string[]
  selectedViewports: string[]
  forceFullPage: boolean
  debug: boolean
}

export interface CaptureResult {
  targetId: string
  viewportId: string
  outputPath: string
  width: number
  height: number
  size: number
}

export type CliCommand
  = | { kind: 'list', text: string }
    | { kind: 'capture', options: CaptureOptions }
