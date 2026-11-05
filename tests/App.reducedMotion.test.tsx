// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, afterEach, beforeAll, beforeEach, expect, test, vi } from 'vitest'
import App from '../src/App'

beforeAll(() => {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query === '(prefers-reduced-motion)' || query === '(prefers-reduced-motion: reduce)',
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  }))
  vi.stubGlobal('ResizeObserver', class {
    observe() {}
    unobserve() {}
    disconnect() {}
  })
})
beforeEach(() => window.history.replaceState(null, '', '/'))
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

test('with reduced motion, changing page still swaps at once and only fades', async () => {
  const user = userEvent.setup()
  render(<App />)
  const previousCard = screen.getByRole('link', { name: 'Explore Umayyad lineage tree' })

  await user.click(previousCard)

  const title = screen.getByRole('heading', { name: 'Umayyad', level: 1 })
  expect(document.activeElement).toBe(title)
  expect(previousCard.closest('[inert]')).not.toBeNull()
  await waitFor(() => expect(previousCard.isConnected).toBe(false))
  for (let element: HTMLElement | null = title; element; element = element.parentElement) {
    expect(element.style.transform).toBe('')
  }
})
