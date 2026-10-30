import type { PeriodId } from '../data/types'

export const periodAppearance: Record<PeriodId, { label: string; card: string; badge: string }> = {
  rashidun: {
    label: 'Rashidun', card: 'border-emerald-700 bg-[#f2f6ed] text-emerald-950',
    badge: 'border-emerald-200 bg-emerald-100 text-emerald-950',
  },
  umayyad: {
    label: 'Umayyad', card: 'border-amber-700 bg-[#fbf3e6] text-amber-950',
    badge: 'border-amber-300 bg-amber-100 text-amber-950',
  },
  abbasid: {
    label: 'Abbasid', card: 'border-indigo-600 bg-[#f0f0f9] text-indigo-950',
    badge: 'border-indigo-200 bg-indigo-100 text-indigo-950',
  },
}
