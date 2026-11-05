import type { FitViewOptions } from '@xyflow/react'

/** How much of the tree floating surfaces cover, in px. */
export type Covered = { top: number; right: number }

type Box = { left: number; right: number; top: number; bottom: number }
type View = Required<Pick<FitViewOptions, 'minZoom' | 'maxZoom' | 'padding'>> & Pick<FitViewOptions, 'nodes'>

/** Space kept between the tree and whatever covers it, in rem so it grows with the text. */
const clearance = 1

function clearOf({ top, right }: Covered, rem: number) {
  const clear = (covered: number) => `${covered + clearance * rem}px` as const
  return { top: clear(top), right: right ? clear(right) : undefined }
}

/** Reset view: the period's focus person at full size. `rem` is the px in 1rem, as for fitAllView. */
export function focusView(focusId: string, covered: Covered, rem: number): View {
  return { nodes: [{ id: focusId }], minZoom: 1, maxZoom: 1, padding: clearOf(covered, rem) }
}

/** Fit all: the whole tree, inside whatever the header and details panel leave uncovered. */
export function fitAllView(covered: Covered, rem: number): View {
  const { top, right = '5%' } = clearOf(covered, rem)
  return { minZoom: 0.02, maxZoom: 1, padding: { top, right, left: '5%', bottom: '15%' } }
}

/** What a reader can see of the tree. `bottomControlTops` is where each control along the bottom starts, in px down the pane. */
export function visibleArea(pane: { width: number; height: number }, covered: Covered, bottomControlTops: number[]): Box {
  return { left: 0, right: pane.width - covered.right, top: covered.top, bottom: Math.min(pane.height, ...bottomControlTops) }
}

function shiftAlong(start: number, end: number, areaStart: number, areaEnd: number) {
  if (start >= areaStart && end <= areaEnd) return 0
  return (areaStart + areaEnd) / 2 - (start + end) / 2
}

/**
 * How far the tree must pan, in screen px, to bring a card into the visible area,
 * or null if it is already there. Each axis moves only if it has to.
 */
export function revealShift(card: Box, area: Box) {
  const x = shiftAlong(card.left, card.right, area.left, area.right)
  const y = shiftAlong(card.top, card.bottom, area.top, area.bottom)
  return x || y ? { x, y } : null
}
