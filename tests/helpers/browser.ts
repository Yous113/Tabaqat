import { vi } from 'vitest'

export type Viewport = { width: number; height: number }

export const phone: Viewport = { width: 390, height: 844 }
export const landscapePhone: Viewport = { width: 844, height: 390 }
export const tablet: Viewport = { width: 768, height: 1024 }
export const desktop: Viewport = { width: 1440, height: 900 }

const pxPerRem = 16

function matches(condition: string, { width, height }: Viewport, reducedMotion: boolean) {
  if (condition === '(prefers-reduced-motion)' || condition === '(prefers-reduced-motion: reduce)') return reducedMotion
  const size = /^\(min-(width|height): ([\d.]+)rem\)$/.exec(condition)
  if (!size) return false
  return (size[1] === 'width' ? width : height) >= Number(size[2]) * pxPerRem
}

/**
 * What jsdom lacks: ResizeObserver, which React Flow needs, and matchMedia, which
 * answers queries as a browser at this viewport would, so a test states a device
 * rather than repeating the app's media queries. Undo with `vi.unstubAllGlobals()`.
 */
export function stubBrowser(viewport: Viewport = phone, { reducedMotion = false } = {}) {
  vi.stubGlobal('ResizeObserver', class {
    observe() {}
    unobserve() {}
    disconnect() {}
  })
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: query.split(' and ').every((condition) => matches(condition, viewport, reducedMotion)),
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
  }))
}
