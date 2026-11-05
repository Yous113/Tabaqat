// @vitest-environment jsdom
import { cleanup, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterAll, afterEach, beforeAll, beforeEach, expect, test, vi } from 'vitest'
import App from '../src/App'
import { desktop, stubBrowser } from './helpers/browser'
import { card, choose } from './helpers/personCards'

beforeAll(() => stubBrowser(desktop))
beforeEach(() => window.history.replaceState(null, '', '/periods/rashidun'))
afterEach(cleanup)
afterAll(() => vi.unstubAllGlobals())

const details = (name: string) => screen.getByRole('region', { name: `Person details: ${name}` })

test('on desktop, details open beside a tree that stays undimmed and usable', async () => {
  const user = userEvent.setup()
  render(<App />)
  await choose(user, 'Abū Bakr')

  expect(within(details('Abū Bakr')).getByRole('heading', { name: /Abū Bakr/ })).toBeTruthy()
  expect(screen.queryByRole('dialog')).toBeNull()
  expect(screen.queryByRole('button', { name: 'Dismiss details backdrop' })).toBeNull()
  expect(screen.getByRole('button', { name: 'Reset view' })).toBeTruthy()
})

test('a reader moves from person to person and home again without closing the panel first', async () => {
  const user = userEvent.setup()
  render(<App />)
  await choose(user, 'Abū Bakr')
  const panel = details('Abū Bakr')

  await choose(user, 'ʿAlī')

  expect(details('ʿAlī')).toBe(panel)
  expect(screen.getByRole('status').textContent).toContain('ʿAlī')
  expect(document.activeElement).toBe(card('ʿAlī'))

  await user.keyboard('{Escape}')
  await waitFor(() => expect(screen.queryByRole('region', { name: /^Person details/ })).toBeNull())

  await user.click(screen.getByRole('link', { name: 'Islamic history' }))
  expect(screen.getByRole('heading', { name: 'Islamic history', level: 1 })).toBeTruthy()
})

test('opening moves focus into the panel, and closing returns it to the person card', async () => {
  const user = userEvent.setup()
  render(<App />)
  await choose(user, 'Abū Bakr')
  const close = within(details('Abū Bakr')).getByRole('button', { name: 'Close' })
  expect(document.activeElement).toBe(close)

  await user.keyboard('{Enter}')

  expect(document.activeElement).toBe(card('Abū Bakr'))
  await waitFor(() => expect(screen.queryByRole('region', { name: /^Person details/ })).toBeNull())
  expect(document.activeElement).toBe(card('Abū Bakr'))
})

test('Escape closes the panel from the tree and leaves focus where the reader put it', async () => {
  const user = userEvent.setup()
  render(<App />)
  await choose(user, 'Abū Bakr')
  expect(details('Abū Bakr')).toBeTruthy()
  const reset = screen.getByRole('button', { name: 'Reset view' })
  reset.focus()

  await user.keyboard('{Escape}')

  await waitFor(() => expect(screen.queryByRole('region', { name: /^Person details/ })).toBeNull())
  expect(document.activeElement).toBe(reset)
})

test('focus is not trapped in the panel', async () => {
  const user = userEvent.setup()
  render(<App />)
  await choose(user, 'Abū Bakr')
  const panel = details('Abū Bakr')
  const stops = within(panel).getAllByRole('button').length + within(panel).queryAllByRole('link').length

  for (let index = 0; index < stops; index += 1) await user.tab()

  expect(panel.contains(document.activeElement)).toBe(false)
})

test('choosing a person while the panel is leaving brings it straight back', async () => {
  const user = userEvent.setup()
  render(<App />)
  await choose(user, 'Abū Bakr')
  const panel = details('Abū Bakr')
  await user.keyboard('{Escape}')

  await choose(user, 'ʿAlī')

  expect(details('ʿAlī')).toBe(panel)
  await new Promise((resolve) => setTimeout(resolve, 700))
  expect(details('ʿAlī')).toBe(panel)
})

test('going Back with details open lands on the previous page title, not the old tree', async () => {
  window.history.replaceState(null, '', '/')
  const user = userEvent.setup()
  render(<App />)
  await user.click(screen.getByRole('link', { name: 'Explore Rashidun lineage tree' }))
  await choose(user, 'Abū Bakr')
  expect(details('Abū Bakr')).toBeTruthy()

  window.history.back()

  const title = await screen.findByRole('heading', { name: 'Islamic history', level: 1 })
  expect(document.activeElement).toBe(title)
  await waitFor(() => expect(document.querySelector('.period-tree')).toBeNull())
  expect(document.activeElement).toBe(title)
})
