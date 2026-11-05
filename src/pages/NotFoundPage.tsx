import { motion } from 'motion/react'
import type { MouseEventHandler } from 'react'
import { usePressFeedback } from '../ui/motion'

export function NotFoundPage({ onClick }: { onClick: MouseEventHandler<HTMLElement> }) {
  const pressFeedback = usePressFeedback()

  return (
    <main className="history-not-found" onClick={onClick}>
      <p className="history-home__eyebrow type-eyebrow">Islamic history</p>
      <h1 className="type-display" id="page-title" tabIndex={-1}>This period isn’t here yet.</h1>
      <p className="history-not-found__message type-body">Choose Rashidun, Umayyad, or Abbasid from the period chooser.</p>
      <motion.a {...pressFeedback} className="history-not-found__home type-callout" href="/" data-app-link><span aria-hidden="true">←</span> Islamic history</motion.a>
    </main>
  )
}
