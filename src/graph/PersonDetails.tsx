import { useEffect, useId, useRef } from 'react'
import type { CaliphTenure, EvidenceReference, Person } from '../data/types'
import { periodAppearance } from './periodAppearance'

function Sources({ sources }: { sources: EvidenceReference[] }) {
  return (
    <div className="mt-5">
      <h3 className="mb-2 text-sm font-semibold">Sources</h3>
      <ul className="space-y-3 text-sm">
        {sources.map(({ label, url, locator }, index) => (
          <li key={`${url}:${index}`}>
            <a href={url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline decoration-stone-400 underline-offset-4">{label}<span className="sr-only"> (opens in a new tab)</span></a>
            {locator && <p className="text-xs leading-relaxed text-stone-500">{locator}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function PersonDetails({ person, tenures, onClose }: {
  person: Person
  tenures: CaliphTenure[]
  onClose: () => void
}) {
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
    <div className="fixed inset-0 z-50 flex items-end bg-stone-950/25 md:justify-end md:items-stretch">
      <button type="button" aria-label="Dismiss details backdrop" tabIndex={-1} className="absolute inset-0 cursor-default" onClick={onClose} />
      <section
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
        className="relative max-h-[80svh] w-full overflow-y-auto rounded-t-3xl border border-stone-200 bg-[#fffdf7] p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] shadow-xl md:max-h-none md:w-[26rem] md:max-w-[55vw] md:rounded-none md:p-8"
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
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Person details</p>
            <h2 id={headingId} className="font-serif text-2xl leading-tight text-stone-900">{person.name} {person.honorific}</h2>
          </div>
          <button ref={closeButton} type="button" onClick={onClose} className="min-h-11 min-w-11 rounded-full border border-stone-300 px-3 text-sm hover:bg-stone-100">Close</button>
        </div>
        {person.aliases?.length ? <p className="mb-5 text-stone-600">Also known as {person.aliases.join(' · ')}</p> : null}
        {person.roles?.includes('prophet') && <p className="mb-5 font-semibold text-emerald-900">Prophet</p>}
        {tenures.length === 0 && <p className="leading-relaxed text-stone-600">Shown as family context. No caliph tenure is recorded for this person.</p>}
        {tenures.map((tenure) => {
          const appearance = periodAppearance[tenure.periodId]
          return (
            <section key={`${tenure.periodId}:${tenure.personId}`} className="mb-6">
              <p className={`mb-3 inline-block rounded-full border px-3 py-1 text-xs font-semibold ${appearance.badge}`}>
                {appearance.label} {tenure.status === 'claimant' ? 'claimant' : 'caliph'}
              </p>
              {tenure.title !== person.name && <h3 className="mb-3 text-lg font-semibold">{tenure.title}</h3>}
              <p className="mb-2 text-xs uppercase tracking-wider text-stone-500">Reign · year precision</p>
              <ol className="space-y-3">
                {tenure.reigns.map(({ ah, ce, note }, index) => (
                  <li key={index} className="rounded-xl border border-stone-200 bg-white/60 p-3">
                    <p className="font-medium">{ah.start}–{ah.end} AH <span className="mx-1 text-stone-400">/</span> {ce.start}–{ce.end} CE</p>
                    {note && <p className="mt-2 text-sm leading-relaxed text-stone-600">{note}</p>}
                  </li>
                ))}
              </ol>
              {tenure.note && <p className="mt-3 text-sm leading-relaxed text-stone-600">{tenure.note}</p>}
              <Sources sources={tenure.sources} />
            </section>
          )
        })}
        {tenures.length === 0 && person.sources?.length ? (
          <Sources sources={person.sources} />
        ) : null}
      </section>
    </div>
  )
}
