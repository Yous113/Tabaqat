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
export function PersonDetails(props: DetailsSurfaceProps) {
  const Surface = useIsDesktop() ? DetailsPanel : DetailsSheet
  return <Surface {...props} />
}
