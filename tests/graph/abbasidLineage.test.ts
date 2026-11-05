import { expect, test } from 'vitest'
import baseline from '../../src/data/people.json'
import { abbasidData } from '../../src/data/periods/abbasid'
import type { FatherConnection, Person } from '../../src/data/types'
import { createLineageGraph } from '../../src/graph/createLineageGraph'
import { selectPeriodLineage } from '../../src/graph/selectPeriodLineage'

const people: Person[] = [...baseline.people, ...abbasidData.people]
const connections: FatherConnection[] = [
  ...baseline.connections.map(({ from, to }): FatherConnection => ({ from, to, type: 'father' })),
  ...abbasidData.connections,
]

test('shows Abbasid sibling and collateral branches with real father edges, not succession edges', () => {
  const selected = selectPeriodLineage(people, connections, abbasidData.period)
  const graph = createLineageGraph(selected.people, selected.connections)
  const visible = new Set(graph.nodes.map(({ id }) => id))
  for (const id of [
    'adnan', 'abbas-ibn-abd-al-muttalib',
    'abu-al-abbas-ibn-muhammad', 'abu-jafar-ibn-muhammad',
    'muhammad-ibn-muhammad-ibn-harun', 'ahmad-ibn-muhammad',
    'talhah-ibn-jafar', 'ishaq-ibn-jafar',
    'muhammad-ibn-abdullah-ibn-ahmad', 'abdullah-ibn-mansur',
  ]) expect(visible.has(id)).toBe(true)
  expect(graph.edges).toContainEqual(expect.objectContaining({
    source: 'muhammad-ibn-muhammad-ibn-harun', target: 'ahmad-ibn-muhammad',
  }))
  expect(graph.edges).toContainEqual(expect.objectContaining({
    source: 'muhammad-ibn-ali-ibn-abdullah', target: 'abu-jafar-ibn-muhammad',
  }))
  expect(graph.edges).not.toContainEqual(expect.objectContaining({
    source: 'abu-al-abbas-ibn-muhammad', target: 'abu-jafar-ibn-muhammad',
  }))
  expect(graph.edges.every(({ source, target }) => visible.has(source) && visible.has(target))).toBe(true)
})

test('excludes unrelated branches and later relatives rather than expanding descendants of shared ancestors', () => {
  const selected = selectPeriodLineage([
    ...people,
    { id: 'future-relative', name: 'A later relative outside the approved membership' },
  ], [
    ...connections,
    { from: 'abbas-ibn-abd-al-muttalib', to: 'future-relative', type: 'father' },
  ], abbasidData.period)
  const visible = new Set(selected.people.map(({ id }) => id))
  expect(visible.has(abbasidData.period.focusId)).toBe(true)
  expect(visible.has('future-relative')).toBe(false)
  expect(visible.has('muawiyah-ibn-sakhr')).toBe(false)
  expect(visible.has('marwan-ibn-hakam')).toBe(false)
  expect(visible.has('muhammad-ibn-abdullah')).toBe(false)
  for (const { personId } of abbasidData.tenures) expect(visible.has(personId)).toBe(true)
})
