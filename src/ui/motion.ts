import { useReducedMotion, type Transition } from 'motion/react'

/** Critically damped, except `momentum`: nothing overshoots unless a gesture earned it. */
export const springs = {
  /** The default for anything moving back to rest. */
  settle: { type: 'spring', bounce: 0, duration: 0.4 },
  /** Fast enough to read as the press itself rather than a reaction to it. */
  press: { type: 'spring', bounce: 0, duration: 0.15 },
  /** Only after a release that carried momentum: damping 0.8, response 0.3. */
  momentum: { type: 'spring', bounce: 0.2, visualDuration: 0.3 },
} satisfies Record<string, Transition>

/** Replaces springs when a reader asks for reduced motion. */
export const gentleFade: Transition = { duration: 0.15, ease: 'easeOut' }

/** Follows a drag past a boundary, giving way less the further it goes. */
export function rubberband(overshoot: number, dimension: number, constant = 0.55) {
  return (overshoot * dimension * constant) / (dimension + constant * Math.abs(overshoot))
}

/**
 * Motion props for anything pressable: spread them onto a `motion.a` or
 * `motion.button`. Feedback starts on pointer down, and on Enter from the keyboard.
 * `lift` also raises the element under a real mouse; touch never triggers it.
 */
export function usePressFeedback({ lift = false }: { lift?: boolean } = {}) {
  if (useReducedMotion()) {
    return { whileTap: { opacity: 0.65 }, transition: gentleFade }
  }
  return {
    whileTap: { scale: 0.97, transition: springs.press },
    whileHover: lift ? { y: -4 } : undefined,
    transition: springs.settle,
  }
}
