import type { ReignInterval } from '../data/types'

function formatYears({ start, end }: ReignInterval['ah']) {
  return start === end ? `${start}` : `${start}–${end}`
}

export function formatReign({ ah, ce }: ReignInterval) {
  return `${formatYears(ah)} AH / ${formatYears(ce)} CE`
}
