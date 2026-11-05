import { useEffect, type RefObject } from 'react'

/** Returns a scrolling element to its start whenever `content` changes. */
export function useScrollToTop(scroller: RefObject<HTMLElement | null>, content: unknown) {
  useEffect(() => {
    const element = scroller.current
    if (element) element.scrollTop = 0
  }, [scroller, content])
}
