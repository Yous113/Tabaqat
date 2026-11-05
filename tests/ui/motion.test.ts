import { expect, test } from 'vitest'
import { settleTiming } from '../../src/ui/motion'

// A critically damped 0.4s spring: quick to start, slow to arrive, never past its target.
test('the CSS timing runs for as long as the settle spring and follows its curve', () => {
  const [, duration, points] = /^(\d+)ms linear\((.+)\)$/.exec(settleTiming)!
  const curve = points.split(', ').map(Number)

  expect(duration).toBe('400')
  expect(curve[0]).toBe(0)
  expect(curve[curve.length - 1]).toBe(1)
  expect(curve[Math.floor(curve.length / 2)]).toBeGreaterThan(0.9)
  expect(curve.every((point, index) => index === 0 || point >= curve[index - 1])).toBe(true)
})
