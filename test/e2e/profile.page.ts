import { BasePage } from './base-page.js'
import { Locator, Page } from '@playwright/test'

export class ProfilePage extends BasePage {
  readonly email: Locator
  readonly username: Locator
  readonly website: Locator
  readonly updateButton: Locator
  readonly signOutButton: Locator

  constructor(page: Page) {
    super(page)
    this.email = page.getByTestId('input-account-email').getByRole('textbox')
    this.username = page.getByTestId('input-account-username').getByRole('textbox')
    this.website = page.getByTestId('input-account-website').getByRole('textbox')
    this.updateButton = page.getByTestId('button-account-updateProfile')
    this.signOutButton = page.getByTestId('button-account-signOut')
  }

  public async goto(): Promise<void> {
    await super.goto('/me')
  }
}
