import { getViewportForBounds } from '@xyflow/react'
import { describe, expect, test } from 'vitest'
import { fitAllView, focusView, revealShift } from '../../src/graph/treeView'

const pane = { width: 800, height: 700 }
const panel = 416
const focusCard = { x: 2000, y: 3000, width: 240, height: 160 }
const wholeTree = { x: 0, y: 0, width: 2060, height: 6000 }

function screenEdges(bounds: typeof focusCard, { minZoom, maxZoom, padding }: ReturnType<typeof focusView>) {
  const { x, y, zoom } = getViewportForBounds(bounds, pane.width, pane.height, minZoom, maxZoom, padding)
  return { left: x + bounds.x * zoom, right: x + (bounds.x + bounds.width) * zoom, top: y + bounds.y * zoom }
}

describe('the views the tree controls move to', () => {
  test('Reset view stays clear of the open panel and the header', () => {
    const { left, right, top } = screenEdges(focusCard, focusView('focus', { top: 90, right: panel }))
    expect(right).toBeLessThanOrEqual(pane.width - panel)
    expect(left).toBeGreaterThanOrEqual(0)
    expect(top).toBeGreaterThanOrEqual(90)
  })

  test('Reset view centres the focus person when nothing covers the side', () => {
    const { left, right } = screenEdges(focusCard, focusView('focus', { top: 90, right: 0 }))
    expect(left).toBe(280)
    expect(right).toBe(520)
  })

  test('Fit all brings the whole tree out from under the open panel', () => {
    const { left, right, top } = screenEdges(wholeTree, fitAllView({ top: 90, right: panel }))
    expect(right).toBeLessThanOrEqual(pane.width - panel)
    expect(left).toBeGreaterThanOrEqual(0)
    expect(top).toBeGreaterThanOrEqual(90)
  })
})

describe('revealShift', () => {
  const area = { left: 0, right: 800, top: 90, bottom: 640 }

  test('leaves a card that can already be seen alone', () => {
    expect(revealShift({ left: 100, right: 340, top: 200, bottom: 360 }, area)).toBeNull()
  })

  test('brings a card from far above into the middle of the visible area, without moving sideways', () => {
    expect(revealShift({ left: 100, right: 340, top: -4800, bottom: -4640 }, area)).toEqual({ x: 0, y: 5085 })
  })

  test('moves a card out from under the panel, without moving vertically', () => {
    expect(revealShift({ left: 300, right: 540, top: 200, bottom: 360 }, { ...area, right: 384 })).toEqual({ x: -228, y: 0 })
  })

  test('counts a card under the header as out of view', () => {
    expect(revealShift({ left: 100, right: 340, top: 40, bottom: 200 }, area)).toEqual({ x: 0, y: 245 })
  })
})
