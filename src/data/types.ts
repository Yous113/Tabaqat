export interface Person {
  id: string
  name: string
  aliases?: string[]
  honorific?: string
  roles?: string[]
  sources?: EvidenceReference[]
}

export type PeriodId = 'rashidun' | 'umayyad' | 'abbasid'

export interface EvidenceReference {
  label: string
  url: string
  locator?: string
}

export interface ReignInterval {
  ah: { start: number; end: number }
  ce: { start: number; end: number }
  note?: string
}

export interface CaliphTenure {
  personId: string
  periodId: PeriodId
  title: string
  status: 'caliph' | 'claimant'
  reigns: ReignInterval[]
  sources: EvidenceReference[]
  note?: string
}

export interface PeriodDefinition {
  id: PeriodId
  title: string
  description: string
  focusId: string
  memberIds: string[]
}

export interface PeriodData {
  period: PeriodDefinition
  people: Person[]
  connections: FatherConnection[]
  tenures: CaliphTenure[]
}

export interface LineageData {
  people: Person[]
  connections: FatherConnection[]
  tenures: CaliphTenure[]
  periods: PeriodDefinition[]
  redirects: Record<string, string>
}

export interface FatherConnection {
  from: string
  to: string
  type: 'father'
}
