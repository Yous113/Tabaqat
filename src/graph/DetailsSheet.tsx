import { motion, usePresence } from 'motion/react'
import { useEffect, useId, useRef } from 'react'
import { useScrollToTop } from '../ui/useScrollToTop'
import type { DetailsSurfaceProps } from './PersonDetails'
import { PersonProfile } from './PersonProfile'
import { useSheetDrag } from './useSheetDrag'

/**
 * Phone presentation: a modal sheet that follows the finger, with focus held inside
 * until it closes. Render it directly inside AnimatePresence.
 * `onReopen` keeps this person open when a reader catches the sheet as it leaves.
 */
export function DetailsSheet({ person, tenures, onClose, onReopen }: DetailsSurfaceProps & { onReopen: () => void }) {
  const headingId = useId()
  const sheet = useRef<HTMLElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const [isPresent, safeToRemove] = usePresence()
  const { y, opacity, dim, dragHandlers } = useSheetDrag({ sheet, body, isPresent, safeToRemove, onClose, onReopen })

  useEffect(() => {
    if (!isPresent) return
    const previousFocus = document.activeElement
    closeButton.current?.focus({ preventScroll: true })
    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true })
    }
  }, [isPresent])

  useScrollToTop(body, person.id)

  return (
    <div className={`fixed inset-0 z-50 flex items-end ${isPresent ? '' : 'pointer-events-none'}`}>
      <motion.button
        type="button"
        aria-label="Dismiss details backdrop"
        tabIndex={-1}
        className="absolute inset-0 cursor-default bg-stone-950/25"
        style={{ opacity: dim }}
        onClick={onClose}
      />
      {/* Not inert while leaving, because an inert element can't be grabbed. It just ignores focus and clicks. */}
      <motion.section
        ref={sheet}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-hidden={!isPresent || undefined}
        tabIndex={-1}
        className="details-sheet pointer-events-auto rounded-t-3xl border border-b-0 border-stone-200 bg-[#fffdf7] shadow-xl"
        style={{ y, opacity }}
        {...dragHandlers}
        onMouseDown={(event) => { if (!isPresent) event.preventDefault() }}
        onClickCapture={(event) => { if (!isPresent) { event.preventDefault(); event.stopPropagation() } }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') { event.stopPropagation(); onClose() }
          if (event.key !== 'Tab') return
          const targets = sheet.current?.querySelectorAll<HTMLElement>('button, a[href]')
          if (!targets?.length) return
          const first = targets[0]
          const last = targets[targets.length - 1]
          // The sheet itself takes focus when a reader taps its text.
          if (event.shiftKey && (document.activeElement === first || document.activeElement === sheet.current)) { event.preventDefault(); last.focus() }
          if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
        }}
      >
        <div className="details-sheet__grabber" aria-hidden="true" />
        <div ref={body} className="details-sheet__body">
          <PersonProfile person={person} tenures={tenures} headingId={headingId} closeButton={closeButton} onClose={onClose} />
        </div>
      </motion.section>
    </div>
  )
}
