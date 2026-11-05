import { motion } from 'motion/react'
import type { Ref } from 'react'
import type { CaliphTenure, EvidenceReference, Person } from '../data/types'
import { usePressFeedback } from '../ui/motion'
import { periodAppearance } from './periodAppearance'

function Sources({ sources }: { sources: EvidenceReference[] }) {
  return (
    <div className="mt-5">
      <h3 className="mb-2 text-sm font-semibold">Sources</h3>
      <ul className="space-y-3 text-sm">
        {sources.map(({ label, url, locator }, index) => (
          <li key={`${url}:${index}`}>
            <a href={url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center underline decoration-stone-400 underline-offset-4">{label}<span className="sr-only"> (opens in a new tab)</span></a>
            {locator && <p className="text-xs leading-relaxed">{locator}</p>}
          </li>
        ))}
      </ul>
    </div>
  )
}

/** What the details surfaces show. Each surface owns its own placement, motion, semantics and focus. */
export function PersonProfile({ person, tenures, headingId, closeButton, onClose }: {
  person: Person
  tenures: CaliphTenure[]
  headingId?: string
  closeButton: Ref<HTMLButtonElement>
  onClose: () => void
}) {
  const press = usePressFeedback()

  return (
    <>
    <div className="mb-6 flex items-start justify-between gap-4">
      <div>
        <p className="type-eyebrow mb-2">Person details</p>
        <h2 id={headingId} className="type-headline">{person.name} {person.honorific}</h2>
      </div>
      <motion.button {...press} ref={closeButton} type="button" onClick={onClose} className="min-h-11 min-w-11 rounded-full border border-stone-300 px-3 text-sm hover:bg-stone-100">Close</motion.button>
    </div>
    {person.aliases?.length ? <p className="mb-5">Also known as {person.aliases.join(' · ')}</p> : null}
    {person.roles?.includes('prophet') && <p className="mb-5 font-semibold text-emerald-900">Prophet</p>}
    {tenures.length === 0 && <p className="leading-relaxed">Shown as family context. No caliph tenure is recorded for this person.</p>}
    {tenures.map((tenure) => {
      const appearance = periodAppearance[tenure.periodId]
      return (
        <section key={`${tenure.periodId}:${tenure.personId}`} className="mb-6">
          <p className={`mb-3 inline-block rounded-full border px-3 py-1 text-xs font-semibold ${appearance.badge}`}>
            {appearance.label} {tenure.status === 'claimant' ? 'claimant' : 'caliph'}
          </p>
          {tenure.title !== person.name && <h3 className="mb-3 text-lg font-semibold">{tenure.title}</h3>}
          <p className="type-eyebrow mb-2">Reign · year precision</p>
          <ol className="space-y-3">
            {tenure.reigns.map(({ ah, ce, note }, index) => (
              <li key={index} className="rounded-xl border border-stone-200 bg-white/60 p-3">
                <p className="font-medium">{ah.start}–{ah.end} AH <span className="mx-1 text-stone-400">/</span> {ce.start}–{ce.end} CE</p>
                {note && <p className="mt-2 text-sm leading-relaxed">{note}</p>}
              </li>
            ))}
          </ol>
          {tenure.note && <p className="mt-3 text-sm leading-relaxed">{tenure.note}</p>}
          <Sources sources={tenure.sources} />
        </section>
      )
    })}
    {tenures.length === 0 && person.sources?.length ? (
      <Sources sources={person.sources} />
    ) : null}
    </>
  )
}
