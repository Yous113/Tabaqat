// @vitest-environment jsdom
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, afterEach, beforeAll, beforeEach, expect, test, vi } from 'vitest'
import App from '../src/App'

beforeAll(() => {
  vi.stubGlobal('ResizeObserver', class {
    observe() {}
    unobserve() {}
    disconnect() {}
  })
})
beforeEach(() => window.history.replaceState(null, '', '/'))
afterEach(cleanup)
afterAll(() => vi.unstubAllGlobals())

test('a visitor chooses a period and can return to the chooser', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('link', { name: 'Explore Umayyad lineage tree' }))
  expect(window.location.pathname).toBe('/periods/umayyad')
  expect(screen.getByRole('heading', { name: 'Umayyad', level: 1 })).toBeTruthy()
  await user.click(screen.getByRole('link', { name: 'Islamic history' }))
  expect(screen.getByRole('heading', { name: 'Islamic history', level: 1 })).toBeTruthy()
})

test('a directly loaded period URL opens its tree and page title', () => {
  window.history.replaceState(null, '', '/periods/abbasid')
  render(<App />)
  expect(screen.getByRole('heading', { name: 'Abbasid', level: 1 })).toBeTruthy()
  expect(screen.getByRole('region', { name: 'Abbasid lineage tree' })).toBeTruthy()
  expect(document.title).toBe('Abbasid · Islamic history')
})

test('browser Back restores the chooser after entering a period', async () => {
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('link', { name: 'Explore Rashidun lineage tree' }))
  expect(screen.getByRole('region', { name: 'Rashidun lineage tree' })).toBeTruthy()
  window.history.back()
  await waitFor(() => expect(screen.getByRole('heading', { name: 'Islamic history', level: 1 })).toBeTruthy())
  expect(window.location.pathname).toBe('/')
})

test('an unknown period offers a working route back to the chooser', async () => {
  const user = userEvent.setup()
  window.history.replaceState(null, '', '/periods/unknown')
  render(<App />)
  expect(screen.getByRole('heading', { name: 'This period isn’t here yet.' })).toBeTruthy()
  await user.click(screen.getByRole('link', { name: 'Islamic history' }))
  expect(screen.getByRole('link', { name: 'Explore Abbasid lineage tree' })).toBeTruthy()
})
