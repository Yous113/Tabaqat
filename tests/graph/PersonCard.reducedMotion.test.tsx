// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { ReactFlowProvider, type NodeProps } from '@xyflow/react'
import { afterAll, afterEach, beforeAll, expect, test, vi } from 'vitest'
import { people } from '../../src/data/lineage'
import type { PersonNode } from '../../src/graph/createLineageGraph'
import { PersonCard } from '../../src/graph/PersonCard'
import { phone, stubBrowser } from '../helpers/browser'

beforeAll(() => stubBrowser(phone, { reducedMotion: true }))
afterEach(cleanup)
afterAll(() => vi.unstubAllGlobals())

test('with reduced motion, a held person card fades instead of moving', async () => {
  const person = people.find(({ id }) => id === 'omar-ibn-khattab')!
  render(<ReactFlowProvider><PersonCard {...({ data: { person } } as NodeProps<PersonNode>)} /></ReactFlowProvider>)
  const card = screen.getByRole('button')

  fireEvent.pointerDown(card, { button: 0, isPrimary: true, pointerType: 'mouse' })

  await waitFor(() => {
    expect(card.style.opacity).not.toBe('')
    expect(Number(card.style.opacity)).toBeLessThan(1)
  })
  expect(card.style.transform).toBe('')
  fireEvent.pointerCancel(window, { isPrimary: true, pointerType: 'mouse' })
})
