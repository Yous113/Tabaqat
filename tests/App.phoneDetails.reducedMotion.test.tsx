// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest'
import App from '../src/App'

beforeAll(() => {
  vi.stubGlobal('ResizeObserver', class {
    observe() {}
    unobserve() {}
    disconnect() {}
  })
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: ['(prefers-reduced-motion)', '(prefers-reduced-motion: reduce)'].includes(query),
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  }))
})
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
  document.querySelector<HTMLButtonElement>('.react-flow__node button[aria-label^="Abū Bakr"]')!.focus()
  await user.keyboard('{Enter}')

  const sheet = screen.getByRole('dialog')
  expect(Number(sheet.style.opacity)).toBeLessThan(1)
  expect(sheet.style.transform).toMatch(/^(none)?$/)
  await waitFor(() => expect(sheet.style.opacity).toBe('1'))

  await user.keyboard('{Escape}')
  await waitFor(() => expect(Number(sheet.style.opacity)).toBeLessThan(1))
  expect(sheet.style.transform).toMatch(/^(none)?$/)
  await waitFor(() => expect(sheet.isConnected).toBe(false))
})
