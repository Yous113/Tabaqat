import { motion } from 'motion/react'
import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import type { PeriodDefinition } from '../data/types'
import { PeriodTree } from '../graph/PeriodTree'
import { usePressFeedback } from '../ui/motion'

export function PeriodPage({ period }: { period: PeriodDefinition }) {
  const pressFeedback = usePressFeedback()
  const header = useRef<HTMLElement>(null)
  // The tree runs under the header, so anything that must stay clear of it needs this height.
  // Measured rather than fixed, because the header wraps with width and text size.
  const [headerHeight, setHeaderHeight] = useState(0)

  useLayoutEffect(() => {
    const element = header.current!
    const measure = () => setHeaderHeight(element.getBoundingClientRect().height)
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header ref={header} className="history-period__header material">
        <motion.a {...pressFeedback} className="history-home-link" href="/" data-app-link><span aria-hidden="true">←</span> Islamic history</motion.a>
        <div className="history-period__heading">
          <h1 className="type-headline" id="page-title" tabIndex={-1}>{period.title}</h1>
          <p className="type-caption">{period.description} · Father-to-child lineage</p>
        </div>
      </header>
      <div className="history-period__canvas" style={{ '--period-header-height': `${headerHeight}px` } as CSSProperties}>
        <PeriodTree key={period.id} periodId={period.id} topInset={headerHeight} />
      </div>
    </>
  )
}
