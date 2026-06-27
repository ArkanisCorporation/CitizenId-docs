import assert from 'node:assert/strict'
import process from 'node:process'
import { chromium } from 'playwright'

const baseUrl = process.env.IMAGE_STEPPER_BASE_URL ?? 'http://127.0.0.1:5177'
const targetUrl = `${baseUrl}/players/rsi-verification`

const browser = await chromium.launch({ headless: true })

async function checkInlineImage(path, index, options = {}) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } })

  try {
    await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' })

    if (options.expectedStepperCount !== undefined) {
      assert.equal(await page.locator('.cid-image-stepper').count(), options.expectedStepperCount)
    }

    const figure = page.locator('.cid-image-figure').nth(index)
    await figure.waitFor({ state: 'visible', timeout: 5000 })
    assert.equal(await figure.locator('.cid-image-stepper__header').count(), 0)
    assert.equal(await figure.locator('.cid-image-stepper__dot').count(), 0)
    assert.equal(await figure.locator('.cid-image-stepper__image-nav').count(), 0)

    if (options.hasCopy) {
      await assert.match(await figure.locator('.cid-image-stepper__copy').textContent(), options.hasCopy)
    }
    else {
      assert.equal(await figure.locator('.cid-image-stepper__copy').count(), 0)
    }

    await figure.locator('.cid-image-stepper__preview-button').click()

    const dialog = page.getByRole('dialog', { name: /Image preview/i })
    await dialog.waitFor({ state: 'visible', timeout: 5000 })
    if (options.hasLightboxTitle) {
      await assert.match(await dialog.locator('.cid-image-stepper__lightbox-title').textContent(), options.hasLightboxTitle)
    }
    assert.equal(await dialog.getByRole('button', { name: 'Next image' }).count(), 0)
    assert.equal(await dialog.getByRole('button', { name: 'Previous image' }).count(), 0)

    await page.keyboard.press('Escape')
    await dialog.waitFor({ state: 'hidden', timeout: 5000 })
  }
  finally {
    await page.close()
  }
}

async function checkMultiImageStepper(path, expectedTitle, expectedDots, index = 0) {
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } })

  try {
    await page.goto(`${baseUrl}${path}`, { waitUntil: 'networkidle' })

    const stepper = page.locator('.cid-image-stepper').nth(index)
    await stepper.waitFor({ state: 'visible', timeout: 5000 })
    await assert.match(await stepper.locator('.cid-image-stepper__content-title').textContent(), expectedTitle)
    assert.equal(await stepper.locator('.cid-image-stepper__dot').count(), expectedDots)

    await stepper.getByRole('button', { name: 'Next image' }).click()
    await stepper.locator('.cid-image-stepper__preview-button').click()

    const dialog = page.getByRole('dialog', { name: /Image preview/i })
    await dialog.waitFor({ state: 'visible', timeout: 5000 })
    assert.equal(await dialog.getByRole('button', { name: 'Next image' }).count(), 1)
    assert.equal(await dialog.getByRole('button', { name: 'Previous image' }).count(), 1)

    await page.keyboard.press('Escape')
    await dialog.waitFor({ state: 'hidden', timeout: 5000 })
  }
  finally {
    await page.close()
  }
}

try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 } })
  await page.goto(targetUrl, { waitUntil: 'networkidle' })

  const stepper = page.locator('.cid-image-stepper')
  await stepper.waitFor({ state: 'visible', timeout: 5000 })

  const dots = stepper.locator('.cid-image-stepper__dot')
  assert.equal(await dots.count(), 3, 'RSI verification should render three image position dots')
  assert.equal(
    await stepper.evaluate((element) => {
      const stage = element.querySelector('.cid-image-stepper__stage')
      const dots = element.querySelector('.cid-image-stepper__dots')
      const copy = element.querySelector('.cid-image-stepper__copy')

      if (!stage || !dots || !copy)
        return false

      return Boolean(stage.compareDocumentPosition(dots) & Node.DOCUMENT_POSITION_FOLLOWING)
        && Boolean(dots.compareDocumentPosition(copy) & Node.DOCUMENT_POSITION_FOLLOWING)
    }),
    true,
    'image dots should sit between the image and the caption copy',
  )
  assert.equal(
    await stepper.evaluate((element) => {
      const dots = element.querySelector('.cid-image-stepper__dots')

      if (!(dots instanceof HTMLElement))
        return false

      const style = getComputedStyle(dots)

      return Number.parseFloat(style.paddingTop) > 0
        && Number.parseFloat(style.paddingBottom) > 0
        && style.borderBottomStyle !== 'none'
        && Number.parseFloat(style.borderBottomWidth) > 0
    }),
    true,
    'image dots row should contain the active marker and separate from the caption band',
  )

  const activeTitle = stepper.locator('.cid-image-stepper__content-title')
  await assert.match(await activeTitle.textContent(), /Pending status/)

  await stepper.getByRole('button', { name: 'Next image' }).click()
  await assert.match(await activeTitle.textContent(), /Verification flow/)

  await stepper.getByRole('button', { name: 'Previous image' }).click()
  await assert.match(await activeTitle.textContent(), /Pending status/)

  await stepper.getByRole('button', { name: 'Previous image' }).click()
  await assert.match(await activeTitle.textContent(), /Verified status/)

  await stepper.getByRole('button', { name: 'Next image' }).click()
  await assert.match(await activeTitle.textContent(), /Pending status/)

  await stepper.getByRole('button', { name: 'Go to image 2: Verification flow' }).click()
  await assert.match(await activeTitle.textContent(), /Verification flow/)

  await stepper.locator('.cid-image-stepper__preview-button').click()

  const dialog = page.getByRole('dialog', { name: /Image preview/i })
  await dialog.waitFor({ state: 'visible', timeout: 5000 })
  await assert.match(await dialog.locator('.cid-image-stepper__lightbox-title').textContent(), /Verification flow/)
  assert.equal(
    await dialog.evaluate((element) => {
      const viewer = element.querySelector('.cid-image-stepper__lightbox-viewer')
      const image = element.querySelector('.cid-image-stepper__lightbox-image')

      if (!(viewer instanceof HTMLElement) || !(image instanceof HTMLElement))
        return false

      const viewerRect = viewer.getBoundingClientRect()
      const imageRect = image.getBoundingClientRect()

      return viewerRect.width > imageRect.width + 120
    }),
    true,
    'fullscreen image stepper should expand beyond the image width so arrows sit at the dialog navigation edges',
  )

  await dialog.getByRole('button', { name: 'Next image' }).click()
  await assert.match(await dialog.locator('.cid-image-stepper__lightbox-title').textContent(), /Verified status/)

  await dialog.getByRole('button', { name: 'Next image' }).click()
  await assert.match(await dialog.locator('.cid-image-stepper__lightbox-title').textContent(), /Pending status/)

  await dialog.getByRole('button', { name: 'Previous image' }).click()
  await assert.match(await dialog.locator('.cid-image-stepper__lightbox-title').textContent(), /Verified status/)

  await page.keyboard.press('ArrowRight')
  await assert.match(await dialog.locator('.cid-image-stepper__lightbox-title').textContent(), /Pending status/)

  await page.keyboard.press('ArrowLeft')
  await assert.match(await dialog.locator('.cid-image-stepper__lightbox-title').textContent(), /Verified status/)

  await page.keyboard.press('Escape')
  await dialog.waitFor({ state: 'hidden', timeout: 5000 })
  await page.close()

  await checkInlineImage('/players/website-basics', 0, {
    expectedStepperCount: 0,
    hasCopy: /Sign-in providers/,
    hasLightboxTitle: /Sign-in providers/,
  })
  await checkInlineImage('/players/website-basics', 1, {
    expectedStepperCount: 0,
    hasCopy: /Account portal/,
    hasLightboxTitle: /Account portal/,
  })
  await checkInlineImage('/players/linked-accounts', 0, {
    expectedStepperCount: 0,
    hasCopy: /Provider authorization/,
    hasLightboxTitle: /Provider authorization/,
  })
  await checkInlineImage('/players/external-apps', 0, {
    expectedStepperCount: 0,
    hasCopy: /Sign in button/,
    hasLightboxTitle: /Sign in button/,
  })
  await checkMultiImageStepper('/players/discord-integrations', /Open linked roles/, 5)
  await checkMultiImageStepper('/community-admins/discord-bot', /Install bot/, 3)
  await checkMultiImageStepper('/community-admins/discord-bot', /Open role links/, 3, 1)
  await checkInlineImage('/user-guide/signing-up', 0)
  await checkInlineImage('/user-guide/discord/linked-roles', 0, { hasCopy: /Discord server menu/ })
}
finally {
  await browser.close()
}
