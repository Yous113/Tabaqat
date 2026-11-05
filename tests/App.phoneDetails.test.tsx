// @vitest-environment jsdom
import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, afterEach, beforeAll, beforeEach, expect, test, vi } from 'vitest'
import App from '../src/App'
import { stubBrowser } from './helpers/browser'
import { card, choose } from './helpers/personCards'

beforeAll(() => stubBrowser())
beforeEach(() => {
  window.history.replaceState(null, '', '/periods/rashidun')
  // jsdom has no layout, and a sheet with no height has nowhere to slide.
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(600)
})
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})
afterAll(() => vi.unstubAllGlobals())

test('on a phone, details open in a modal sheet that holds focus', async () => {
  const user = userEvent.setup()
  render(<App />)
  await choose(user, 'Abū Bakr')

  const sheet = screen.getByRole('dialog', { name: /Abū Bakr/ })
  expect(sheet.getAttribute('aria-modal')).toBe('true')
  expect(screen.getByRole('button', { name: 'Dismiss details backdrop', hidden: true })).toBeTruthy()
  expect(document.activeElement).toBe(within(sheet).getByRole('button', { name: 'Close' }))

  const stops = within(sheet).getAllByRole('button').length + within(sheet).queryAllByRole('link').length
  for (let index = 0; index < stops + 1; index += 1) {
    await user.tab()
    expect(sheet.contains(document.activeElement)).toBe(true)
  }
})

test('tapping the text in the sheet keeps focus inside it', async () => {
  const user = userEvent.setup()
  render(<App />)
  await choose(user, 'Abū Bakr')
  const sheet = screen.getByRole('dialog')

  await user.click(within(sheet).getByText('Person details'))

  expect(sheet.contains(document.activeElement)).toBe(true)
  await user.keyboard('{Shift>}{Tab}{/Shift}')
  expect(sheet.contains(document.activeElement)).toBe(true)
  expect(document.activeElement).not.toBe(sheet)
})

test('Escape dismisses the sheet at once, returns focus to the card, and it then leaves', async () => {
  const user = userEvent.setup()
  render(<App />)
  await choose(user, 'Abū Bakr')
  const sheet = screen.getByRole('dialog')

  await user.keyboard('{Escape}')

  expect(screen.queryByRole('dialog')).toBeNull()
  expect(sheet.isConnected).toBe(true)
  expect(document.activeElement).toBe(card('Abū Bakr'))
  await waitFor(() => expect(sheet.isConnected).toBe(false), { timeout: 2000 })
  expect(document.activeElement).toBe(card('Abū Bakr'))
})

test('the Close button dismisses the sheet', async () => {
  const user = userEvent.setup()
  render(<App />)
  await choose(user, 'ʿAlī')

  await user.click(within(screen.getByRole('dialog')).getByRole('button', { name: 'Close' }))

  expect(screen.queryByRole('dialog')).toBeNull()
})

test('choosing a person while the sheet is leaving brings it straight back', async () => {
  const user = userEvent.setup()
  render(<App />)
  await choose(user, 'Abū Bakr')
  const sheet = screen.getByRole('dialog')
  await user.keyboard('{Escape}')

  await choose(user, 'ʿAlī')

  expect(screen.getByRole('dialog', { name: /ʿAlī/ })).toBe(sheet)
  await new Promise((resolve) => setTimeout(resolve, 1000))
  expect(screen.getByRole('dialog', { name: /ʿAlī/ })).toBe(sheet)
  expect(document.activeElement).toBe(within(sheet).getByRole('button', { name: 'Close' }))
})

test('going Back with the sheet open lands on the previous page title', async () => {
  window.history.replaceState(null, '', '/')
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('link', { name: 'Explore Rashidun lineage tree' }))
  await choose(user, 'Abū Bakr')
  expect(screen.getByRole('dialog')).toBeTruthy()

  window.history.back()

  const title = await screen.findByRole('heading', { name: 'Islamic history', level: 1 })
  await waitFor(() => expect(document.querySelector('.period-tree')).toBeNull())
  expect(document.activeElement).toBe(title)
})
