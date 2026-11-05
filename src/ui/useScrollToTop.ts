import { useEffect, useRef } from 'react'

/** A ref for a scrolling element, which returns to its start whenever `content` changes. */
export function useScrollToTop<Scroller extends HTMLElement>(content: unknown) {
  const scroller = useRef<Scroller>(null)
  useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = 0
  }, [content])
  return scroller
}
