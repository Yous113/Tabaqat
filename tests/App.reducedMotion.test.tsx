// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, afterEach, beforeAll, beforeEach, expect, test, vi } from 'vitest'
import App from '../src/App'
import { desktop, stubBrowser } from './helpers/browser'
import { card } from './helpers/personCards'

beforeAll(() => stubBrowser(desktop, { reducedMotion: true }))
beforeEach(() => window.history.replaceState(null, '', '/'))
afterEach(cleanup)
afterAll(() => vi.unstubAllGlobals())

test('with reduced motion, a held period card fades instead of moving', async () => {
  render(<App />)
  const periodCard = screen.getByRole('link', { name: 'Explore Rashidun lineage tree' })

  fireEvent.pointerDown(periodCard, { button: 0, isPrimary: true, pointerType: 'mouse' })

  await waitFor(() => {
    expect(periodCard.style.opacity).not.toBe('')
    expect(Number(periodCard.style.opacity)).toBeLessThan(1)
  })
  expect(periodCard.style.transform).toBe('')
  fireEvent.pointerCancel(window, { isPrimary: true, pointerType: 'mouse' })
})

test('with reduced motion, the desktop details panel fades in and out instead of sliding', async () => {
  const user = userEvent.setup()
  window.history.replaceState(null, '', '/periods/rashidun')
  render(<App />)
  fireEvent.click(card('Abū Bakr'))

  const panel = screen.getByRole('region', { name: /^Person details/ })
  expect(Number(panel.style.opacity)).toBeLessThan(1)
  expect(panel.style.transform).toBe('')
  await waitFor(() => expect(panel.style.opacity).toBe('1'))

  await user.keyboard('{Escape}')
  await waitFor(() => expect(Number(panel.style.opacity)).toBeLessThan(1))
  expect(panel.style.transform).toBe('')
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
