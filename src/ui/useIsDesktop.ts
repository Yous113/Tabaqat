import { useSyncExternalStore } from 'react'

/** Matches Tailwind's `md`, and the width that periodTree.css makes room for the panel at. */
const desktop = '(min-width: 48rem)'

function subscribe(onChange: () => void) {
  const query = window.matchMedia?.(desktop)
  query?.addEventListener('change', onChange)
  return () => query?.removeEventListener('change', onChange)
}

export function useIsDesktop() {
  return useSyncExternalStore(subscribe, () => window.matchMedia?.(desktop).matches ?? false)
}
