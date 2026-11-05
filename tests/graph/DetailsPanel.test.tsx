// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AnimatePresence } from 'motion/react'
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest'
import { people, tenures } from '../../src/data/lineage'
import { DetailsPanel } from '../../src/graph/DetailsPanel'
import { desktop, stubBrowser } from '../helpers/browser'

beforeAll(() => stubBrowser(desktop))
afterEach(cleanup)
afterAll(() => vi.unstubAllGlobals())

const onClose = vi.fn()
const returnFocus = vi.fn()
afterEach(() => vi.clearAllMocks())

function surface(id: string | null) {
  const person = people.find((candidate) => candidate.id === id)
  return (
    <>
      <button type="button">Elsewhere in the tree</button>
      <AnimatePresence>
        {person && <DetailsPanel key="details" person={person} tenures={tenures.filter(({ personId }) => personId === id)} onClose={onClose} returnFocus={returnFocus} />}
      </AnimatePresence>
    </>
  )
}

const panel = () => screen.getByRole('region', { name: /^Person details/, hidden: true })

test('is a named region rather than a dialog, showing reigns and sources', () => {
  render(surface('jafar-ibn-ahmad'))

  expect(screen.queryByRole('dialog')).toBeNull()
  expect(panel().textContent).toContain('295–296 AH')
  expect(panel().textContent).toContain('929–932 CE')
  expect(within(panel()).getAllByRole('link').length).toBeGreaterThan(0)
})

test('names the prophet as such', () => {
  render(surface('muhammad-ibn-abdullah'))

  expect(within(panel()).getByText('Prophet')).toBeTruthy()
})

test('opening moves focus to Close', () => {
  render(surface('abu-bakr'))

  expect(document.activeElement).toBe(within(panel()).getByRole('button', { name: 'Close' }))
})

test('choosing someone else updates it in place, from the top, and leaves focus on the tree', () => {
  const { rerender } = render(surface('abu-bakr'))
  const opened = panel()
  const tree = screen.getByRole('button', { name: 'Elsewhere in the tree' })
  tree.focus()
  opened.scrollTop = 200

  rerender(surface('omar-ibn-khattab'))

  expect(panel()).toBe(opened)
  expect(screen.getByRole('status').textContent).toContain('ʿOmar')
  expect(opened.scrollTop).toBe(0)
  expect(document.activeElement).toBe(tree)
})

test('Close hands focus back to this person and closes', async () => {
  const user = userEvent.setup()
  render(surface('abu-bakr'))

  await user.click(within(panel()).getByRole('button', { name: 'Close' }))

  expect(returnFocus).toHaveBeenCalledWith('abu-bakr')
  expect(onClose).toHaveBeenCalledOnce()
})

test('Escape closes from anywhere, and a reader who moved on keeps their place', () => {
  render(surface('abu-bakr'))
  screen.getByRole('button', { name: 'Elsewhere in the tree' }).focus()

  fireEvent.keyDown(window, { key: 'Escape' })

  expect(onClose).toHaveBeenCalledOnce()
  expect(returnFocus).not.toHaveBeenCalled()
})

test('once leaving, it takes no focus or keys and then goes', async () => {
  const { rerender } = render(surface('abu-bakr'))
  const leaving = panel()

  rerender(surface(null))

  expect(leaving.hasAttribute('inert')).toBe(true)
  fireEvent.keyDown(window, { key: 'Escape' })
  expect(onClose).not.toHaveBeenCalled()
  await waitFor(() => expect(leaving.isConnected).toBe(false), { timeout: 2000 })
})
