import { useSyncExternalStore } from 'react'

/**
 * Room for a panel beside the tree. The height is what tells a phone held sideways,
 * which is wide but short, from a tablet. This is the only copy of the condition:
 * periodTree.css follows `data-panel-open` rather than repeating it.
 */
const desktop = '(min-width: 48rem) and (min-height: 32rem)'

function subscribe(onChange: () => void) {
  const query = window.matchMedia(desktop)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

export function useIsDesktop() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(desktop).matches)
}
