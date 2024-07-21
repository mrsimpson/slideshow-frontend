import { expect, test } from '@playwright/test'
import { presenterCredentialsFile } from './helpers.js'
import { PresentationsPage } from './presentations.page.js'

test.use({ storageState: presenterCredentialsFile })

test.describe('Presentation handling', async () => {
  const now = new Date()
  const presentationTitle = `Playwright rules on ${now.toISOString()}`
  const presentationDescription = `We've come a long way.\nThis test started at ${now.toISOString()}`
  let createdPresentationId: string

  test('Should be able to create a new presentation', async ({ page }) => {
    const presentationsPage = new PresentationsPage(page)

    await presentationsPage.goto()
    await presentationsPage.newPresentationButton.click()
    await presentationsPage.newPresentationTitleInput.fill(presentationTitle)
    await presentationsPage.newPresentationDescriptionInput.click()
    await presentationsPage.newPresentationDescriptionInput.fill(presentationDescription)
    await presentationsPage.createPresentationButton.click()

    await presentationsPage.page.waitForURL(new RegExp(/\/presentations\/\d+/))
    createdPresentationId = page.url().slice(page.url().lastIndexOf('/'))

    await expect(presentationsPage.currentPresentationTitle).toHaveText(presentationTitle)
    await expect(presentationsPage.currentPresentationDescription).toHaveText(
      presentationDescription
    )
  })

  test.afterAll(async ({ request }) => {
    await request.delete(`http://127.0.0.1:54321/presentations?id=${createdPresentationId}`)
  })
})
