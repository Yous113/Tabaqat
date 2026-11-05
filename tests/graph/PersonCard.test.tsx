// @vitest-environment jsdom
import { afterEach, expect, test } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ReactFlowProvider, type NodeProps } from '@xyflow/react'
import { people, tenures } from '../../src/data/lineage'
import type { PersonNode } from '../../src/graph/createLineageGraph'
import { PersonCard } from '../../src/graph/PersonCard'

afterEach(cleanup)

function renderCard(id: string) {
  const person = people.find((candidate) => candidate.id === id)!
  const data = { person, tenures: tenures.filter(({ personId }) => personId === id) }
  render(<ReactFlowProvider><PersonCard {...({ data } as NodeProps<PersonNode>)} /></ReactFlowProvider>)
  return screen.getByRole('button')
}

test('shows a Rashidun reign in both calendars and in the accessible name', () => {
  const card = renderCard('omar-ibn-khattab')
  expect(card.textContent).toContain('13–23 AH / 634–644 CE')
  expect(card.getAttribute('aria-label')).toContain('13–23 AH / 634–644 CE')
})

test('collapses each calendar separately when its years match', () => {
  expect(renderCard('hasan-ibn-ali').textContent).toContain('40–41 AH / 661 CE')
})

test('shows an Umayyad reign', () => {
  const id = tenures.find(({ periodId }) => periodId === 'umayyad')!.personId
  expect(renderCard(id).textContent).toMatch(/AH \/ .*CE/)
})

test('leaves reigns off Abbasid cards', () => {
  const card = renderCard('jafar-ibn-ahmad')
  expect(card.textContent).toContain('Abbasid caliph')
  expect(card.textContent).not.toContain('AH')
})

test('leaves cards without a tenure unchanged', () => {
  expect(renderCard('muhammad-ibn-abdullah').textContent).not.toContain('AH')
})

test('responds while held down, before the press is released', async () => {
  const card = renderCard('omar-ibn-khattab')
  expect(card.style.transform).toBe('')

  fireEvent.pointerDown(card, { button: 0, isPrimary: true, pointerType: 'mouse' })

  await waitFor(() => expect(card.style.transform).toMatch(/scale\(0\.9\d*\)/))
  fireEvent.pointerCancel(window, { isPrimary: true, pointerType: 'mouse' })
})
