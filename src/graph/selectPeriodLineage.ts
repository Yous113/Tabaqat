import type { FatherConnection, PeriodDefinition, Person } from '../data/types'

export function selectPeriodLineage(
  people: Person[],
  connections: FatherConnection[],
  period: PeriodDefinition,
): { people: Person[]; connections: FatherConnection[] } {
  const parents = new Map(connections.map(({ from, to }) => [to, from]))
  const visible = new Set<string>()
  for (const memberId of period.memberIds) {
    let id: string | undefined = memberId
    while (id !== undefined && !visible.has(id)) {
      visible.add(id)
      id = parents.get(id)
    }
  }
  return {
    people: people.filter(({ id }) => visible.has(id)),
    connections: connections.filter(({ from, to }) => visible.has(from) && visible.has(to)),
  }
}
