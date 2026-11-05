// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, afterEach, beforeAll, beforeEach, expect, test, vi } from 'vitest'
import App from '../src/App'
import { stubBrowser } from './helpers/browser'

beforeAll(() => stubBrowser())
beforeEach(() => window.history.replaceState(null, '', '/'))
afterEach(cleanup)
afterAll(() => vi.unstubAllGlobals())

test('the next page is there at once while the previous page fades away beneath it', async () => {
  const user = userEvent.setup()
  render(<App />)
  const previousCard = screen.getByRole('link', { name: 'Explore Umayyad lineage tree' })

  await user.click(previousCard)

  expect(window.location.pathname).toBe('/periods/umayyad')
  expect(screen.getByRole('region', { name: 'Umayyad lineage tree' })).toBeTruthy()
  expect(previousCard.isConnected).toBe(true)
  expect(previousCard.closest('[inert]')).not.toBeNull()
  await waitFor(() => expect(previousCard.isConnected).toBe(false))
})

test('focus lands on the new page title and the page title updates while the old page is still fading', async () => {
  const user = userEvent.setup()
  render(<App />)

  await user.click(screen.getByRole('link', { name: 'Explore Abbasid lineage tree' }))

  expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Abbasid', level: 1 }))
  expect(document.title).toBe('Abbasid · Islamic history')
})

test('returning to a page mid-fade keeps its focus on that page and leaves it usable', async () => {
  const user = userEvent.setup()
  window.history.replaceState(null, '', '/periods/rashidun')
  render(<App />)
  await user.click(screen.getByRole('link', { name: 'Islamic history' }))

  window.history.back()

  const title = await screen.findByRole('heading', { name: 'Rashidun', level: 1 })
  await waitFor(() => expect(document.activeElement).toBe(title))
  expect(title.closest('[inert]')).toBeNull()
  await waitFor(() => expect(screen.queryByRole('link', { name: 'Explore Abbasid lineage tree' })).toBeNull())
  expect(document.activeElement).toBe(title)
})

test('the way home from an unknown page responds while it is held down', async () => {
  window.history.replaceState(null, '', '/periods/unknown')
  render(<App />)
  const home = screen.getByRole('link', { name: 'Islamic history' })

  fireEvent.pointerDown(home, { button: 0, isPrimary: true, pointerType: 'mouse' })

  await waitFor(() => expect(home.style.transform).toMatch(/scale\(0\.9\d*\)/))
  expect(window.location.pathname).toBe('/periods/unknown')
  fireEvent.pointerCancel(window, { isPrimary: true, pointerType: 'mouse' })
})
