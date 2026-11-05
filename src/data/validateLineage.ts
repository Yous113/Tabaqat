import type { LineageData } from './types'

export function validateLineage(data: LineageData): void {
  const ids = new Set<string>()
  for (const person of data.people) {
    if (ids.has(person.id)) throw new Error(`Duplicate person: ${person.id}`)
    ids.add(person.id)
  }
  const parents = new Map<string, string>()
  for (const { from, to } of data.connections) {
    if (!ids.has(from) || !ids.has(to)) throw new Error(`Unknown person in connection: ${from} → ${to}`)
    if (parents.has(to)) throw new Error(`Multiple fathers for ${to}`)
    parents.set(to, from)
  }
  for (const id of ids) {
    const seen = new Set<string>()
    let current: string | undefined = id
    while (current !== undefined) {
      if (seen.has(current)) throw new Error(`Lineage cycle at ${current}`)
      seen.add(current)
      current = parents.get(current)
    }
  }
  const periodIds = new Set<string>()
  for (const period of data.periods) {
    if (periodIds.has(period.id)) throw new Error(`Duplicate period: ${period.id}`)
    periodIds.add(period.id)
    for (const id of [...period.memberIds, period.focusId]) {
      if (!ids.has(id)) throw new Error(`Unknown period member: ${id}`)
    }
    if (!period.memberIds.includes(period.focusId)) throw new Error(`Period focus is not a member: ${period.id}`)
  }
  for (const [oldId, canonicalId] of Object.entries(data.redirects)) {
    if (ids.has(oldId) || !ids.has(canonicalId)) throw new Error(`Invalid redirect: ${oldId}`)
  }
  const offices = new Set<string>()
  for (const tenure of data.tenures) {
    const period = data.periods.find(({ id }) => id === tenure.periodId)
    const key = `${tenure.periodId}:${tenure.personId}`
    if (!period || !ids.has(tenure.personId) || !period.memberIds.includes(tenure.personId) || offices.has(key)) {
      throw new Error(`Invalid tenure: ${key}`)
    }
    offices.add(key)
    if (tenure.sources.length === 0 || tenure.sources.some(({ url }) => !/^https?:\/\//.test(url))) {
      throw new Error(`Missing source for ${key}`)
    }
    if (tenure.reigns.length === 0 || tenure.reigns.some(({ ah, ce }) => [ah, ce].some(({ start, end }) =>
      !Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start,
    ))) throw new Error(`Invalid reign interval for ${key}`)
  }
}
