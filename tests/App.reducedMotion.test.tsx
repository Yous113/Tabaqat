// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest'
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
