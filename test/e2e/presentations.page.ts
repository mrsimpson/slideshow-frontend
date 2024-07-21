import { BasePage } from './base-page.js'
import { Locator, Page } from '@playwright/test'

export class PresentationsPage extends BasePage {
  readonly newPresentationButton: Locator
  readonly newPresentationTitleInput: Locator
  readonly newPresentationDescriptionInput: Locator
  readonly createPresentationButton: Locator
  readonly currentPresentationTitle: Locator
  readonly currentPresentationDescription: Locator

  constructor(page: Page) {
    super(page)
    this.newPresentationButton = page.getByTestId('button-new-presentation')
    this.newPresentationTitleInput = page
      .getByTestId('input-presentation-title')
      .getByRole('textbox')
    this.newPresentationDescriptionInput = page
      .getByTestId('input-presentation-description')
      .getByRole('textbox')
    this.createPresentationButton = page.getByTestId('button-create-presentation')
    this.currentPresentationTitle = page
      .getByTestId('thing-presentation-factsheet')
      .locator('.n-thing-header__title')
    this.currentPresentationDescription = page
      .getByTestId('thing-presentation-factsheet')
      .locator('.n-thing-main__description')
  }

  public async goto(): Promise<void> {
    await super.goto('/presentations')
  }
}
