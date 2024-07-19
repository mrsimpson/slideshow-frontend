import { expect, test } from '@playwright/test'
import { presenterCredentialsFile } from './helpers.js'
import { ProfilePage } from './profile.page.js'

test.use({ storageState: presenterCredentialsFile })

test('After sign-in, the profile page should be visible', async ({ page }) => {
  const profilePage = new ProfilePage(page)

  await profilePage.goto()
  await expect(profilePage.signOutButton).toBeEnabled()

  await expect(profilePage.email).toBeDisabled()
  // await expect(profilePage.email).toContainText('presenter@local')
  await expect(profilePage.email).toHaveValue('presenter@local')
})
