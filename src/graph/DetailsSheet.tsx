import { animate, motion, useMotionValue, usePresence, useReducedMotion, useTransform, type AnimationPlaybackControls } from 'motion/react'
import { useEffect, useId, useLayoutEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import { gentleFade, rubberband, springs } from '../ui/motion'
import type { DetailsSurfaceProps } from './PersonDetails'
import { PersonProfile } from './PersonProfile'
import { sheetRelease } from './sheetRelease'

/** Movement, in px, before a touch counts as a drag rather than a tap. */
const dragThreshold = 10
/** Below this release speed, in px/s, the gesture carried no momentum worth a bounce. */
const momentumSpeed = 200
/** How much recent movement sets the release velocity, in ms. A finger that paused longer has none. */
const velocityWindow = 100

type Sample = { y: number; time: number }

/** One finger or mouse on the sheet, from press to release. */
type Grip = {
  pointerId: number
  startX: number
  startY: number
  fromBody: boolean
  /** Sheet position minus finger position, kept for the whole drag. Null until this is a drag. */
  grabOffset: number | null
  /** Past the threshold, so releasing decides the outcome rather than resuming the animation. */
  moved: boolean
  samples: Sample[]
}

function releaseVelocity(samples: Sample[], releasedAt: number) {
  const recent = samples.filter(({ time }) => releasedAt - time <= velocityWindow)
  const first = recent[0]
  const last = recent[recent.length - 1]
  if (!first || last.time === first.time) return 0
  return ((last.y - first.y) / (last.time - first.time)) * 1000
}

/**
 * Phone presentation: a modal sheet that follows the finger, with focus held inside
 * until it closes. One motion value owns the position and every animation starts from
 * its live value, so the sheet can be grabbed at any moment, even on its way out.
 * Render it directly inside AnimatePresence.
 */
export function DetailsSheet({ person, tenures, onClose, onReopen }: DetailsSurfaceProps) {
  const headingId = useId()
  const sheet = useRef<HTMLElement>(null)
  const body = useRef<HTMLDivElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const [isPresent, safeToRemove] = usePresence()
  const reducedMotion = useReducedMotion()

  const y = useMotionValue(reducedMotion ? 0 : window.innerHeight)
  const opacity = useMotionValue(reducedMotion ? 0 : 1)
  const height = useRef(window.innerHeight)
  const dim = useTransform(() => opacity.get() * (1 - Math.min(Math.max(y.get() / height.current, 0), 1)))

  const animation = useRef<AnimationPlaybackControls | null>(null)
  const grip = useRef<Grip | null>(null)
  const releaseSpeed = useRef<number | undefined>(undefined)

  function animateTo(state: 'open' | 'closed', velocity = y.getVelocity()) {
    animation.current?.stop()
    const onComplete = () => {
      animation.current = null
      if (state === 'closed') safeToRemove?.()
    }
    if (reducedMotion) {
      if (state === 'open' && y.get() !== 0) {
        y.jump(0)
        opacity.jump(0.5)
      }
      animation.current = animate(opacity, state === 'open' ? 1 : 0, { ...gentleFade, onComplete })
    } else {
      const spring = Math.abs(velocity) < momentumSpeed ? springs.settle : springs.momentum
      animation.current = animate(y, state === 'open' ? 0 : height.current, { ...spring, velocity, onComplete })
    }
  }

  useLayoutEffect(() => {
    height.current = sheet.current!.offsetHeight
    if (!reducedMotion) y.jump(height.current)
    // Only the first placement: from here on, motion starts from wherever the sheet is.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // A finger on the sheet outranks this: its release decides what happens next.
  useEffect(() => {
    if (!grip.current) animateTo(isPresent ? 'open' : 'closed', releaseSpeed.current)
    releaseSpeed.current = undefined
    return () => animation.current?.stop()
    // Only when presence changes: anything else re-running this would restart a moving sheet.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPresent])

  useEffect(() => {
    if (!isPresent) return
    const previousFocus = document.activeElement
    closeButton.current?.focus({ preventScroll: true })
    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true })
    }
  }, [isPresent])

  useEffect(() => {
    if (body.current) body.current.scrollTop = 0
  }, [person.id])

  // Once the sheet owns a touch the browser must not also scroll it. Only a non-passive
  // native listener can say so, and pointermove has always run by the time this does.
  useEffect(() => {
    const element = body.current!
    const claimTouch = (event: TouchEvent) => { if (grip.current && event.cancelable) event.preventDefault() }
    element.addEventListener('touchmove', claimTouch, { passive: false })
    return () => element.removeEventListener('touchmove', claimTouch)
  }, [])

  /** Inner content scrolls first: the sheet only moves when the list has nowhere to go. */
  function bodyTakesScroll(deltaY: number) {
    const { scrollTop, scrollHeight, clientHeight } = body.current!
    return scrollTop > 0 || (deltaY < 0 && scrollHeight > clientHeight)
  }

  function onPointerDown(event: ReactPointerEvent<HTMLElement>) {
    if (!event.isPrimary || event.button !== 0) return
    const fromBody = body.current!.contains(event.target as Node)
    // A mouse in the body is selecting text or using the scrollbar.
    if (event.pointerType === 'mouse' && fromBody) return
    // Nothing outside the body takes a tap, and a mouse can leave the sheet before the threshold.
    if (!fromBody) event.currentTarget.setPointerCapture(event.pointerId)
    height.current = sheet.current!.offsetHeight
    // Catching a moving sheet holds it straight away; a resting one waits for the threshold.
    const caught = animation.current !== null
    animation.current?.stop()
    animation.current = null
    grip.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      fromBody,
      grabOffset: caught ? y.get() - event.clientY : null,
      moved: false,
      samples: [],
    }
  }

  function onPointerMove(event: ReactPointerEvent<HTMLElement>) {
    const current = grip.current
    if (!current || event.pointerId !== current.pointerId) return
    const deltaX = event.clientX - current.startX
    const deltaY = event.clientY - current.startY

    if (current.grabOffset === null) {
      if (current.fromBody && bodyTakesScroll(deltaY)) {
        grip.current = null
        return
      }
      if (Math.hypot(deltaX, deltaY) < dragThreshold) return
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        grip.current = null
        return
      }
      // From here, not from the press, so the sheet doesn't jump by the threshold.
      current.grabOffset = y.get() - event.clientY
    }

    // Only now: capturing sends the click to the sheet, and a tap should reach its target.
    if (!current.moved && Math.abs(deltaY) >= dragThreshold) {
      current.moved = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }

    const position = event.clientY + current.grabOffset
    const next = position < 0 ? rubberband(position, height.current) : position
    y.set(next)
    current.samples.push({ y: next, time: event.timeStamp })
  }

  function onPointerEnd(event: ReactPointerEvent<HTMLElement>) {
    const current = grip.current
    if (!current || event.pointerId !== current.pointerId) return
    grip.current = null
    if (current.grabOffset === null) return
    if (!current.moved) {
      animateTo(isPresent ? 'open' : 'closed')
      return
    }

    const velocity = releaseVelocity(current.samples, event.timeStamp)
    const outcome = sheetRelease({ distance: y.get(), velocity, height: height.current })
    if (outcome === 'close' && isPresent) {
      releaseSpeed.current = velocity
      onClose()
    } else if (outcome === 'spring back' && !isPresent) {
      releaseSpeed.current = velocity
      onReopen?.()
    } else {
      animateTo(isPresent ? 'open' : 'closed', velocity)
    }
  }

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
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
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
