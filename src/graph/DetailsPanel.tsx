import { motion, useIsPresent, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef } from 'react'
import { settleTransition } from '../ui/motion'
import type { DetailsSurfaceProps } from './PersonDetails'
import { PersonProfile } from './PersonProfile'

/**
 * Desktop presentation: a non-modal region beside the tree. Nothing dims or traps
 * focus, so it stays mounted while the selection changes. Render it directly inside
 * AnimatePresence: a selection made while it is leaving reverses it from where it is.
 */
export function DetailsPanel({ person, tenures, onClose }: DetailsSurfaceProps) {
  const panel = useRef<HTMLElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const isPresent = useIsPresent()
  const reducedMotion = useReducedMotion()

  const close = useCallback(() => {
    // A reader who has moved on into the tree keeps their place.
    const focused = document.activeElement
    if (!focused || focused === document.body || panel.current?.contains(focused)) {
      // Within this tree, because a fading page can leave a second copy in the document.
      panel.current?.closest('.period-tree')
        ?.querySelector<HTMLElement>(`.react-flow__node[data-id="${person.id}"] button`)
        ?.focus({ preventScroll: true })
    }
    onClose()
  }, [person.id, onClose])

  // Opening moves focus in. Choosing someone else leaves it on the tree, so a reader can keep going from card to card.
  useEffect(() => {
    if (isPresent) closeButton.current?.focus({ preventScroll: true })
  }, [isPresent])

  useEffect(() => {
    if (panel.current) panel.current.scrollTop = 0
  }, [person.id])

  // On the window, because focus may be anywhere in the tree.
  useEffect(() => {
    if (!isPresent) return
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') close() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isPresent, close])

  return (
    <motion.section
      ref={panel}
      aria-label={`Person details: ${person.name}`}
      className="details-panel material"
      inert={!isPresent}
      initial={reducedMotion ? { opacity: 0 } : { x: '100%' }}
      animate={reducedMotion ? { opacity: 1 } : { x: 0 }}
      exit={reducedMotion ? { opacity: 0 } : { x: '100%' }}
      transition={settleTransition(reducedMotion)}
    >
      <p role="status" className="sr-only">Showing details for {person.name}</p>
      <PersonProfile person={person} tenures={tenures} closeButton={closeButton} onClose={close} />
    </motion.section>
  )
}
