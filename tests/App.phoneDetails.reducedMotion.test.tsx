// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest'
import App from '../src/App'
import { phone, stubBrowser } from './helpers/browser'
import { choose } from './helpers/personCards'

beforeAll(() => stubBrowser(phone, { reducedMotion: true }))
afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})
afterAll(() => vi.unstubAllGlobals())

test('with reduced motion, the phone sheet fades in and out instead of sliding', async () => {
  // jsdom has no layout, so give the sheet a height it could have slid by.
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(600)
  const user = userEvent.setup()
  window.history.replaceState(null, '', '/periods/rashidun')
  render(<App />)
  await choose(user, 'Abū Bakr')

  const sheet = screen.getByRole('dialog')
  expect(Number(sheet.style.opacity)).toBeLessThan(1)
  expect(sheet.style.transform).toMatch(/^(none)?$/)
  await waitFor(() => expect(sheet.style.opacity).toBe('1'))

  await user.keyboard('{Escape}')
  await waitFor(() => expect(Number(sheet.style.opacity)).toBeLessThan(1))
  expect(sheet.style.transform).toMatch(/^(none)?$/)
  await waitFor(() => expect(sheet.isConnected).toBe(false))
})
