import {
  type Locator,
  type Page
} from '@playwright/test'

export class SamplePage {
  readonly page: Page
  // All locators here
  readonly boldText: Locator
  readonly refreshLink: Locator
  readonly inputTextBox: Locator
  readonly hoverButton: Locator
  readonly alertDBClickButton: Locator
  // Radio Buttons
  readonly mRadioButton: Locator
  readonly fRadioButton: Locator
  // Check Boxes
  readonly autoCheckBox: Locator
  readonly perfCheckBox: Locator
  // Options List for dropDown
  readonly optionList: string[]
  readonly dropDown: Locator
  readonly alertButton: Locator
  readonly confirmButton: Locator
  readonly confirmButtonMsg: Locator
  // Move srcImage inside targetDiv
  readonly targetDiv: Locator
  readonly srcImage: Locator

  constructor (page: Page): void {
    this.page = page

    // Setup all locators
    this.boldText = page.locator('#idOfDiv')
    this.refreshLink = page.getByRole('link', { name: 'This is a link' })
    this.inputTextBox = page.locator('#fname')
    this.hoverButton = page.getByRole('button', { name: 'Submit' })
    this.alertDBClickButton = page.getByRole('button', { name: 'Double-click to generate' })
    this.mRadioButton = page.locator('#male')
    this.fRadioButton = page.locator('#female')
    this.autoCheckBox = page.getByRole('checkbox').first()
    this.perfCheckBox = page.getByRole('checkbox').nth(1)
    this.dropDown = page.locator('#testingDropdown')
    this.alertButton = page.getByRole('button', { name: 'Generate Alert Box', exact: true })
    this.confirmButton = page.getByRole('button', { name: 'Generate Confirm Box' })
    this.confirmButtonMsg = page.locator('#demo')
    this.targetDiv = page.locator('#targetDiv')
    this.srcImage = page.getByAltText('art of testing')

    this.optionList = ['Automation', 'Performance', 'Manual', 'Database']
  }

  async goto (): void {
    await this.page.goto('https://artoftesting.com/samplesiteforselenium')
  }

  async fillInTextBox (): void {
    await this.inputTextBox.fill('Peter Desmond')
  }

  async hoverOverButton (): void {
    await this.hoverButton.hover()
    await this.hoverButton.click()
  }

  async checkMRadioButton (): void {
    await this.mRadioButton.check()
  }

  async checkFRadioButton (): void {
    await this.fRadioButton.check()
  }

  async autoCheckBoxSelect (): void {
    await this.autoCheckBox.check()
  }

  async perfCheckBoxSelect (): void {
    await this.perfCheckBox.check()
  }

  async dropDownSelect (val): void {
    const loc = this.optionList.indexOf(val)
    await this.dropDown.selectOption(this.optionList[loc])
  }

  async confirmBoxAccept (): void {
    this.page.on('dialog', dialog => {
      const handler = async (): any => { await dialog.accept() }
      try {
        handler()
      } catch (err) {
        console.log(err)
      }
    })
    await this.confirmButton.click()
  }

  async confirmBoxDismiss (): void {
    this.page.on('dialog', dialog => {
      const handler = async (): any => { await dialog.dismiss() }
      try {
        handler()
      } catch (err) {
        console.log(err)
      }
    })
    await this.confirmButton.click()
  }

  async dragImage (): void {
    await srcImage.dragTo(targetDiv)
  }
}
