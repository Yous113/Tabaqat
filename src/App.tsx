import { MotionConfig } from 'motion/react'
import { useEffect, useState, type MouseEvent, type MouseEventHandler } from 'react'
import { periods } from './data/lineage'
import type { PeriodDefinition } from './data/types'
import { resolveRoute, type AppRoute } from './navigation'
import { LandingPage } from './pages/LandingPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { PeriodPage } from './pages/PeriodPage'
import { PageFade } from './ui/PageFade'

function Router() {
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

  return <PageFade pageKey={pathname}><CurrentPage route={route} period={period} navigate={navigate} /></PageFade>
}

function CurrentPage({ route, period, navigate }: {
  route: AppRoute
  period: PeriodDefinition | undefined
  navigate: MouseEventHandler<HTMLElement>
}) {
  if (route.kind === 'home') {
    return <main onClick={navigate}><LandingPage periods={periods} /></main>
  }

  if (period) {
    return <main className="history-period" onClick={navigate}><PeriodPage period={period} /></main>
  }

  return <NotFoundPage onClick={navigate} />
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Router />
    </MotionConfig>
  )
}

export default App
