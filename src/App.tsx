import { MotionConfig } from 'motion/react'
import { useEffect, useState, type MouseEvent } from 'react'
import { periods } from './data/lineage'
import { resolveRoute } from './navigation'
import { LandingPage } from './pages/LandingPage'
import { PeriodPage } from './pages/PeriodPage'

function Screen() {
  const [pathname, setPathname] = useState(() => window.location.pathname)
  const route = resolveRoute(pathname)
  const period = route.kind === 'period'
    ? periods.find(({ id }) => id === route.periodId)
    : undefined

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  useEffect(() => {
    document.title = period ? `${period.title} · Islamic history` : 'Islamic history · Tabaqat'
    document.getElementById('page-title')?.focus()
  }, [pathname, period])

  function navigate(event: MouseEvent<HTMLElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    if (!(event.target instanceof Element)) return
    const anchor = event.target.closest<HTMLAnchorElement>('a[data-app-link]')
    if (!anchor || anchor.hasAttribute('download') || (anchor.target && anchor.target !== '_self')) return
    const url = new URL(anchor.href)
    if (url.origin !== window.location.origin) return
    event.preventDefault()
    if (url.href !== window.location.href) window.history.pushState(null, '', url)
    setPathname(url.pathname)
  }

  if (route.kind === 'home') {
    return <main onClick={navigate}><LandingPage periods={periods} /></main>
  }

  if (period) {
    return <main className="history-period" onClick={navigate}><PeriodPage period={period} /></main>
  }

  return (
    <main className="history-not-found" onClick={navigate}>
      <p className="history-home__eyebrow type-eyebrow">Islamic history</p>
      <h1 id="page-title" tabIndex={-1}>This period isn’t here yet.</h1>
      <p>Choose Rashidun, Umayyad, or Abbasid from the period chooser.</p>
      <a className="history-home-link" href="/" data-app-link><span aria-hidden="true">←</span> Islamic history</a>
    </main>
  )
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Screen />
    </MotionConfig>
  )
}

export default App
