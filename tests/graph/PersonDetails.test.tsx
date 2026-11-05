// @vitest-environment jsdom
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PersonDetails } from '../../src/graph/PersonDetails'
import { people, tenures } from '../../src/data/lineage'
import { stubBrowser } from '../helpers/browser'

beforeAll(() => stubBrowser())
afterEach(cleanup)
afterAll(() => vi.unstubAllGlobals())

test('shows sourced multiple reigns with both calendar labels and closes by keyboard', async () => {
  const person = people.find(({ id }) => id === 'jafar-ibn-ahmad')!
  let closed = false
  render(<PersonDetails person={person} tenures={tenures.filter(({ personId }) => personId === person.id)} onClose={() => { closed = true }} />)
  const dialog = screen.getByRole('dialog')
  expect(dialog.textContent).toContain('295–296 AH')
  expect(dialog.textContent).toContain('908–908 CE')
  expect(dialog.textContent).toContain('929–932 CE')
  expect(screen.getAllByRole('link').length).toBeGreaterThan(0)
  await userEvent.keyboard('{Escape}')
  expect(closed).toBe(true)
})
