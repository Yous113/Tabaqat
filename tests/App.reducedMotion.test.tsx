// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
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
    matches: ['(prefers-reduced-motion)', '(prefers-reduced-motion: reduce)', '(min-width: 48rem)'].includes(query),
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  }))
})
afterEach(cleanup)
afterAll(() => vi.unstubAllGlobals())

test('with reduced motion, a held period card fades instead of moving', async () => {
  render(<App />)
  const card = screen.getByRole('link', { name: 'Explore Rashidun lineage tree' })

  fireEvent.pointerDown(card, { button: 0, isPrimary: true, pointerType: 'mouse' })

  await waitFor(() => {
    expect(card.style.opacity).not.toBe('')
    expect(Number(card.style.opacity)).toBeLessThan(1)
  })
  expect(card.style.transform).toBe('')
  fireEvent.pointerCancel(window, { isPrimary: true, pointerType: 'mouse' })
})

test('with reduced motion, the desktop details panel fades in and out instead of sliding', async () => {
  const user = userEvent.setup()
  window.history.replaceState(null, '', '/periods/rashidun')
  render(<App />)
  fireEvent.click(document.querySelector('.react-flow__node button[aria-label^="Abū Bakr"]')!)

  const panel = screen.getByRole('region', { name: /^Person details/ })
  expect(Number(panel.style.opacity)).toBeLessThan(1)
  expect(panel.style.transform).toBe('')
  await waitFor(() => expect(panel.style.opacity).toBe('1'))

  await user.keyboard('{Escape}')
  await waitFor(() => expect(Number(panel.style.opacity)).toBeLessThan(1))
  expect(panel.style.transform).toBe('')
  window.history.replaceState(null, '', '/')
})
