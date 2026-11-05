import { expect, test } from 'vitest'
import { connections, people } from '../../src/data/lineage'
import { umayyadData } from '../../src/data/periods/umayyad'
import { createLineageGraph } from '../../src/graph/createLineageGraph'
import { selectPeriodLineage } from '../../src/graph/selectPeriodLineage'

test('the Muawiyah-focused view preserves both ruling branches and their connecting ancestors', () => {
  const selected = selectPeriodLineage(people, connections, umayyadData.period)
  const ids = selected.people.map(({ id }) => id)

  expect(ids).toEqual(expect.arrayContaining([
    'adnan',
    'abd-manaf-ibn-qusayy',
    'abd-shams-ibn-abd-manaf',
    'umayyah-ibn-abd-shams',
    'harb-ibn-umayyah',
    'sakhr-ibn-harb',
    'muawiyah-ibn-sakhr',
    'muawiyah-ibn-yazid',
    'hakam-ibn-abu-al-as',
    'marwan-ibn-hakam',
    'abd-al-malik-ibn-marwan',
    'omar-ibn-abd-al-aziz',
    'marwan-ibn-muhammad',
  ]))
  expect(ids).toContain(umayyadData.period.focusId)
  expect(umayyadData.tenures.every(({ personId }) => ids.includes(personId))).toBe(true)
  expect(ids).not.toContain('abu-al-abbas-ibn-muhammad')
  expect(ids).not.toContain('khalid-ibn-walid')
  expect(ids).not.toContain('zubayr-ibn-awwam')
  expect(ids).not.toContain('muhammad-ibn-abdullah')
})

test('family context keeps its own roles and renders father edges rather than succession edges', () => {
  const selected = selectPeriodLineage(people, connections, umayyadData.period)
  const { nodes, edges } = createLineageGraph(selected.people, selected.connections)
  const uthman = nodes.find(({ id }) => id === 'uthman-ibn-affan')

  expect(uthman?.data.person.roles).toContain('rashidun-caliph')
  expect(umayyadData.tenures.some(({ personId }) => personId === uthman?.id)).toBe(false)
  expect(nodes.map(({ id }) => id)).toContain('abd-al-rahman-ibn-muawiyah')
  expect(edges).toEqual(expect.arrayContaining([
    expect.objectContaining({ source: 'marwan-ibn-hakam', target: 'abd-al-malik-ibn-marwan' }),
    expect.objectContaining({ source: 'muhammad-ibn-marwan', target: 'marwan-ibn-muhammad' }),
    expect.objectContaining({ source: 'muawiyah-ibn-sakhr', target: 'yazid-ibn-muawiyah' }),
  ]))
  expect(edges.some(({ source, target }) =>
    source === 'muawiyah-ibn-yazid' && target === 'marwan-ibn-hakam',
  )).toBe(false)
  expect(edges.some(({ source, target }) =>
    source === 'ibrahim-ibn-walid' && target === 'marwan-ibn-muhammad',
  )).toBe(false)
  const visible = new Set(nodes.map(({ id }) => id))
  expect(edges.every(({ source, target }) => visible.has(source) && visible.has(target))).toBe(true)
  expect(nodes.every(({ position }) => Number.isFinite(position.x) && Number.isFinite(position.y))).toBe(true)
})
