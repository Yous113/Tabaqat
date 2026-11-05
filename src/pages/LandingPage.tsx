import { motion } from 'motion/react'
import type { PeriodDefinition } from '../data/types'
import { usePressFeedback } from '../ui/motion'

function LineageMark({ variant }: { variant: string }) {
  const middle = variant === 'umayyad' ? 68 : 80

  return (
    <svg className="period-card__lineage" viewBox="0 0 200 124" fill="none" aria-hidden="true" focusable="false">
      <path d={`M100 25V48M100 48H44V${middle}M100 48H156V${middle}M44 ${middle + 17}V105M156 ${middle + 17}V105`} stroke="currentColor" strokeWidth="1.4" />
      {variant === 'abbasid' && <path d="M100 48V97" stroke="currentColor" strokeWidth="1.4" />}
      <rect x="79" y="8" width="42" height="25" rx="8" fill="currentColor" />
      <rect x="23" y={middle - 5} width="42" height="25" rx="8" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.2" />
      <rect x="135" y={middle - 5} width="42" height="25" rx="8" fill="currentColor" fillOpacity="0.22" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="44" cy="109" r="4" fill="currentColor" fillOpacity="0.45" />
      <circle cx="156" cy="109" r="4" fill="currentColor" fillOpacity="0.45" />
      {variant === 'abbasid' && <circle cx="100" cy="101" r="4" fill="currentColor" fillOpacity="0.45" />}
    </svg>
  )
}

export function LandingPage({ periods }: { periods: PeriodDefinition[] }) {
  const pressFeedback = usePressFeedback({ lift: true })

  return (
    <div className="history-home">
      <header className="history-home__masthead material">
        <span className="history-home__brand"><svg viewBox="0 0 28 28" aria-hidden="true"><path d="M14 2v24M2 14h24M5.5 5.5l17 17M5.5 22.5l17-17" stroke="currentColor" strokeWidth="1.5" /><circle cx="14" cy="14" r="4" fill="currentColor" /></svg> Tabaqat</span>
        <span className="history-home__edition type-caption">A history of connections</span>
      </header>
      <section className="history-home__intro" aria-labelledby="page-title">
        <p className="history-home__eyebrow type-eyebrow">People · Families · Periods</p>
        <h1 className="type-display" id="page-title" tabIndex={-1}>Islamic history</h1>
        <p className="history-home__description type-body">Explore the caliphs and the family connections that bring each period into focus.</p>
      </section>
      <nav className="period-grid" aria-label="Historical periods">
        {periods.map((period, index) => (
          <motion.a
            {...pressFeedback}
            className="period-card"
            data-period={period.id}
            data-app-link
            href={`/periods/${period.id}`}
            aria-label={`Explore ${period.title} lineage tree`}
            key={period.id}
          >
            <span className="period-card__top type-eyebrow">Period {String(index + 1).padStart(2, '0')}</span>
            <LineageMark variant={period.id} />
            <div className="period-card__copy">
              <h2 className="type-title">{period.title}</h2>
              <p className="type-callout">{period.description}</p>
            </div>
            <span className="period-card__action type-callout">Explore tree <span aria-hidden="true">→</span></span>
          </motion.a>
        ))}
      </nav>
      <footer className="history-home__footer">
        <span className="history-home__footer-mark" aria-hidden="true">↳</span>
        <p className="type-caption">Each line connects a father and child.<br />Caliph badges distinguish office from family membership.</p>
      </footer>
    </div>
  )
}
