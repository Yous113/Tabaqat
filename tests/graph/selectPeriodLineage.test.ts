import { expect, test } from 'vitest'
import { selectPeriodLineage } from '../../src/graph/selectPeriodLineage'
import type { FatherConnection, PeriodDefinition, Person } from '../../src/data/types'

const people: Person[] = ['root', 'branch', 'focus', 'cousin', 'unrelated'].map((id) => ({ id, name: id }))
const connections: FatherConnection[] = [
  { from: 'root', to: 'branch', type: 'father' },
  { from: 'branch', to: 'focus', type: 'father' },
  { from: 'branch', to: 'cousin', type: 'father' },
  { from: 'root', to: 'unrelated', type: 'father' },
]
const period: PeriodDefinition = {
  id: 'umayyad', title: 'Umayyad', description: 'Test period',
  focusId: 'focus', memberIds: ['focus', 'cousin'],
}

test('includes selected collateral branches and their ancestors without importing unrelated descendants', () => {
  const selected = selectPeriodLineage(people, connections, period)
  expect(selected.people.map(({ id }) => id)).toEqual(['root', 'branch', 'focus', 'cousin'])
  expect(selected.connections).toEqual([
    { from: 'root', to: 'branch', type: 'father' },
    { from: 'branch', to: 'focus', type: 'father' },
    { from: 'branch', to: 'cousin', type: 'father' },
  ])
})
