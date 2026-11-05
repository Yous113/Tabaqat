import { useEffect, useId, useRef } from 'react'
import type { DetailsSurfaceProps } from './PersonDetails'
import { PersonProfile } from './PersonProfile'

/** Phone presentation: modal, dimmed, with focus held inside until it closes. */
export function DetailsSheet({ person, tenures, onClose }: DetailsSurfaceProps) {
  const headingId = useId()
  const panel = useRef<HTMLElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previousFocus = document.activeElement
    closeButton.current?.focus()
    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus()
    }
  }, [person.id])

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-stone-950/25">
      <button type="button" aria-label="Dismiss details backdrop" tabIndex={-1} className="absolute inset-0 cursor-default" onClick={onClose} />
      <section
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="relative max-h-[80svh] w-full overflow-y-auto rounded-t-3xl border border-stone-200 bg-[#fffdf7] p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-xl"
        onKeyDown={(event) => {
          if (event.key === 'Escape') { event.stopPropagation(); onClose() }
          if (event.key !== 'Tab') return
          const targets = panel.current?.querySelectorAll<HTMLElement>('button, a[href]')
          if (!targets?.length) return
          const first = targets[0]
          const last = targets[targets.length - 1]
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
          if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
        }}
      >
        <PersonProfile person={person} tenures={tenures} headingId={headingId} closeButton={closeButton} onClose={onClose} />
      </section>
    </div>
  )
}
