import { AnimatePresence, motion, useIsPresent, useReducedMotion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { gentleFade, springs } from './motion'

function PageLayer({ children }: { children: ReactNode }) {
  const isPresent = useIsPresent()
  const reducedMotion = useReducedMotion()
  const layer = useRef<HTMLDivElement>(null)

  // Scoped to this layer: the previous page's title is still in the document.
  useEffect(() => {
    if (isPresent) layer.current?.querySelector<HTMLElement>('#page-title')?.focus()
  }, [isPresent])

  // A leaving page comes out of the flow, so the next page lays out alone, and stays
  // where the reader last saw it. This must run before the document can shrink, which
  // would clamp the scroll position. Going by `isPresent` undoes it if the page is called back.
  useLayoutEffect(() => {
    const { style } = layer.current!
    if (isPresent) {
      style.position = style.insetInline = style.top = ''
    } else {
      Object.assign(style, { position: 'fixed', insetInline: 0, top: `${-window.scrollY}px` })
    }
  }, [isPresent])

  return (
    <motion.div
      ref={layer}
      inert={!isPresent}
      aria-hidden={!isPresent || undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={reducedMotion ? gentleFade : springs.settle}
    >
      {children}
    </motion.div>
  )
}

/**
 * Cross-fades between pages, using opacity alone so nothing that measures the page
 * sees it move. The next page is mounted and usable at once; the previous one only
 * lingers as an inert layer. The first page after a load appears without a fade.
 */
export function PageFade({ pageKey, children }: { pageKey: string; children: ReactNode }) {
  return (
    <AnimatePresence initial={false}>
      <PageLayer key={pageKey}>{children}</PageLayer>
    </AnimatePresence>
  )
}
