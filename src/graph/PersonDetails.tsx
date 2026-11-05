import type { CaliphTenure, Person } from '../data/types'
import { useIsDesktop } from '../ui/useIsDesktop'
import { DetailsPanel } from './DetailsPanel'
import { DetailsSheet } from './DetailsSheet'

export type DetailsSurfaceProps = {
  person: Person
  tenures: CaliphTenure[]
  onClose: () => void
}

/** The person details surface for this device. Render inside AnimatePresence so it can animate out. */
export function PersonDetails({ onReopen, returnFocus, ...surface }: DetailsSurfaceProps & {
  onReopen: () => void
  returnFocus: (personId: string) => void
}) {
  return useIsDesktop()
    ? <DetailsPanel {...surface} returnFocus={returnFocus} />
    : <DetailsSheet {...surface} onReopen={onReopen} />
}
