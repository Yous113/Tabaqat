import { describe, expect, test } from 'vitest'
import { sheetRelease } from '../../src/graph/sheetRelease'

// A flick of 1000 px/s projects about 499 px on: (1000 / 1000) * 0.998 / 0.002.
const height = 600

describe('sheetRelease', () => {
  test('a long, slow drag closes', () => {
    expect(sheetRelease({ distance: 400, velocity: 20, height })).toBe('close')
  })

  test('a short, slow drag springs back', () => {
    expect(sheetRelease({ distance: 60, velocity: 40, height })).toBe('spring back')
  })

  test('a short, fast flick closes', () => {
    expect(sheetRelease({ distance: 30, velocity: 1000, height })).toBe('close')
  })

  test('an upward flick from far down springs back', () => {
    expect(sheetRelease({ distance: 450, velocity: -1000, height })).toBe('spring back')
  })

  test('the boundary is half the sheet, once momentum is projected', () => {
    expect(sheetRelease({ distance: 299, velocity: 0, height })).toBe('spring back')
    expect(sheetRelease({ distance: 301, velocity: 0, height })).toBe('close')
    expect(sheetRelease({ distance: 200, velocity: 100, height })).toBe('spring back')
    expect(sheetRelease({ distance: 200, velocity: 250, height })).toBe('close')
  })

  test('a drag past the open position springs back', () => {
    expect(sheetRelease({ distance: -40, velocity: 0, height })).toBe('spring back')
  })

  test('with no height to measure, only real movement closes', () => {
    expect(sheetRelease({ distance: 0, velocity: 0, height: 0 })).toBe('spring back')
  })
})
