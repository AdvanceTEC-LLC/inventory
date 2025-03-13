import { test, expect, beforeEach, describe } from '@playwright/test'
import { startReport } from './helper'

describe('example', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await page.goto('/')
  })

  test(`default 'Debug' text is shown`, async ({ page }) => {
    const debugText = page.getByText('Debug')
    await expect(debugText).toBeVisible()
  })
})
