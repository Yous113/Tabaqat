import type { PeriodId } from './data/types'

export type AppRoute =
  | { kind: 'home' }
  | { kind: 'period'; periodId: PeriodId }
  | { kind: 'not-found' }

export function resolveRoute(pathname: string): AppRoute {
  if (pathname === '/') return { kind: 'home' }
  const match = /^\/periods\/(rashidun|umayyad|abbasid)\/?$/.exec(pathname)
  const periodId = match?.[1]
  if (periodId === 'rashidun' || periodId === 'umayyad' || periodId === 'abbasid') {
    return { kind: 'period', periodId }
  }
  return { kind: 'not-found' }
}
