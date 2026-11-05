import type { FitViewOptions } from '@xyflow/react'

/** How much of the tree floating surfaces cover, in px. */
export type Covered = { top: number; right: number }

type Edges = { left: number; right: number; top: number; bottom: number }
type View = Required<Pick<FitViewOptions, 'minZoom' | 'maxZoom' | 'padding'>> & Pick<FitViewOptions, 'nodes'>

/** Space kept between the tree and whatever covers it, in px. */
const clearance = 16

const clear = (covered: number) => `${covered + clearance}px` as const

function clearOf({ top, right }: Covered) {
  return { top: clear(top), right: right ? clear(right) : undefined }
}

/** Reset view: the period's focus person at full size. */
export function focusView(focusId: string, covered: Covered): View {
  return { nodes: [{ id: focusId }], minZoom: 1, maxZoom: 1, padding: clearOf(covered) }
}

/** Fit all: the whole tree, inside whatever the header and details panel leave uncovered. */
export function fitAllView(covered: Covered): View {
  const { top, right = '5%' } = clearOf(covered)
  return { minZoom: 0.02, maxZoom: 1, padding: { top, right, left: '5%', bottom: '15%' } }
}

function shiftAlong(start: number, end: number, areaStart: number, areaEnd: number) {
  if (start >= areaStart && end <= areaEnd) return 0
  return (areaStart + areaEnd) / 2 - (start + end) / 2
}

/**
 * How far the tree must pan, in screen px, to bring a card into the visible area,
 * or null if it is already there. Each axis moves only if it has to.
 */
export function revealShift(card: Edges, area: Edges) {
  const x = shiftAlong(card.left, card.right, area.left, area.right)
  const y = shiftAlong(card.top, card.bottom, area.top, area.bottom)
  return x || y ? { x, y } : null
}
