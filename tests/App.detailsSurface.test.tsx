// @vitest-environment jsdom
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, afterEach, beforeEach, expect, test, vi } from 'vitest'
import App from '../src/App'
import { desktop, landscapePhone, phone, stubBrowser, tablet, type Viewport } from './helpers/browser'
import { choose } from './helpers/personCards'

beforeEach(() => window.history.replaceState(null, '', '/periods/rashidun'))
afterEach(cleanup)
afterAll(() => vi.unstubAllGlobals())

async function openDetails(viewport: Viewport) {
  stubBrowser(viewport)
  const user = userEvent.setup()
  render(<App />)
  await choose(user, 'Abū Bakr')
}

test.each([
  ['a phone', phone],
  ['a phone held sideways', landscapePhone],
])('on %s, details are a modal sheet', async (_, viewport) => {
  await openDetails(viewport)

  expect(screen.getByRole('dialog', { name: /Abū Bakr/ }).getAttribute('aria-modal')).toBe('true')
  expect(screen.queryByRole('region', { name: /^Person details/ })).toBeNull()
})

test.each([
  ['a tablet', tablet],
  ['a desktop', desktop],
])('on %s, details are a panel beside the tree', async (_, viewport) => {
  await openDetails(viewport)

  expect(screen.getByRole('region', { name: 'Person details: Abū Bakr' })).toBeTruthy()
  expect(screen.queryByRole('dialog')).toBeNull()
})
