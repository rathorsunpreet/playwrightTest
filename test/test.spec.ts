/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { test, expect } from '@playwright/test'
import { SamplePage } from './pages/artoftesting-page'

test('Bold text is present', async ({ page }) => {
  const samplePage = new SamplePage(page)
  await samplePage.goto()
  await expect.soft(samplePage.boldText).toHaveText('This is sample text!')
})

test('Link is present', async ({ page }) => {
  const samplePage = new SamplePage(page)
  await samplePage.goto()
  await expect.soft(samplePage.refreshLink).toHaveAttribute('href', 'http://www.artoftesting.com/sampleSiteForSelenium.html')
})

test('Input Box is active', async ({ page }) => {
  const samplePage = new SamplePage(page)
  await samplePage.goto()
  await samplePage.fillInTextBox()
  await expect.soft(samplePage.inputTextBox).toHaveValue('Peter Desmond')
})

test('Hover Button changes background style', async ({ page }) => {
  const samplePage = new SamplePage(page)
  await samplePage.goto()
  await samplePage.hoverOverButton()
  await expect.soft(samplePage.hoverButton).toHaveAttribute('style', 'background: blue;')
  // await expect.soft(samplePage.hoverButton).toHaveCSS('background', 'blue')
})

test('Double Click Alert Box has the correct message', async ({ page }) => {
  const samplePage = new SamplePage(page)
  await samplePage.goto()
  samplePage.page.on('dialog', dialog => {
    const handler = async (): any => {
      await expect.soft(dialog.message()).toEqual('Hi! Art Of Testing, Here!')
      await dialog.accept()
    }
    try {
      handler()
    } catch (err) {
      console.log(err)
    }
  })
  await samplePage.alertDBClickButton.dblclick()
})

test('Male / Female Radio Buttons can be toggled', async ({ page }) => {
  const samplePage = new SamplePage(page)
  await samplePage.goto()
  await samplePage.checkMRadioButton()
  await expect.soft(samplePage.mRadioButton).toBeChecked()

  await samplePage.checkFRadioButton()
  await expect.soft(samplePage.fRadioButton).toBeChecked()
})

test('Checkboxes can be toggled', async ({ page }) => {
  const samplePage = new SamplePage(page)
  await samplePage.goto()
  await samplePage.autoCheckBoxSelect()
  await expect.soft(samplePage.autoCheckBox).toBeChecked()

  samplePage.perfCheckBoxSelect()
  await expect.soft(samplePage.perfCheckBox).toBeChecked()
})

test('Drop Down Options can be selected', async ({ page }) => {
  const samplePage = new SamplePage(page)
  await samplePage.goto()
  // Check if default of Automation is there
  await expect.soft(samplePage.dropDown).toHaveValue('Automation')

  // Update to other value
  await samplePage.dropDownSelect('Manual')
  await expect.soft(samplePage.dropDown).toHaveValue('Manual')
})

test('Single Click Alert Box has the correct message', async ({ page }) => {
  const samplePage = new SamplePage(page)
  await samplePage.goto()
  samplePage.page.on('dialog', dialog => {
    const handler = async (): any => {
      await expect.soft(dialog.message()).toEqual('Hi! Art Of Testing, Here!')
      await dialog.accept()
    }
    try {
      handler()
    } catch (err) {
      console.log(err)
    }
  })
  await samplePage.alertButton.click()
})

test('Accepting the confirm box provides the correct text', async ({ page }) => {
  const samplePage = new SamplePage(page)
  await samplePage.goto()
  await samplePage.confirmBoxAccept()
  await expect.soft(samplePage.confirmButtonMsg).toHaveText(/OK!/)
})

// Dismiss the dialog
test('Dismissing the confirm box provides the correct text', async ({ page }) => {
  const samplePage = new SamplePage(page)
  await samplePage.goto()
  await samplePage.confirmBoxDismiss()
  await expect.soft(samplePage.confirmButtonMsg).toContainText('Cancel!')
})

// test('Move image to div', async ({ page }) => {
// const samplePage = new SamplePage(page)
// await samplePage.goto()
// await samplePage.dragImage()
// await expect.soft(samplePage.targetDiv).not.toBeEmpty()
// })
