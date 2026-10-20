import { expect, test } from 'vitest'
import type { FatherConnection, Person } from '../../src/data/types'
import { createLineageGraph } from '../../src/graph/createLineageGraph'

test('represents every person and preserves names, aliases, and honorifics', () => {
  const people: Person[] = [
    {
      id: 'person-a',
      name: 'Person A',
      aliases: ['Another name'],
      honorific: 'An honorific',
    },
    { id: 'person-b', name: 'Person B' },
  ]

  const graph = createLineageGraph(people, [])

  expect(graph.nodes).toEqual([
    expect.objectContaining({
      id: 'person-a',
      type: 'person',
      data: {
        person: {
          id: 'person-a',
          name: 'Person A',
          aliases: ['Another name'],
          honorific: 'An honorific',
        },
      },
    }),
    expect.objectContaining({
      id: 'person-b',
      type: 'person',
      data: { person: { id: 'person-b', name: 'Person B' } },
    }),
  ])
})

test('represents every father-to-child connection in the correct direction', () => {
  const people: Person[] = [
    { id: 'person-a', name: 'Person A' },
    { id: 'person-b', name: 'Person B' },
    { id: 'person-c', name: 'Person C' },
  ]
  const connections: FatherConnection[] = [
    { from: 'person-a', to: 'person-b', type: 'father' },
    { from: 'person-a', to: 'person-c', type: 'father' },
  ]

  const graph = createLineageGraph(people, connections)

  expect(graph.edges).toEqual([
    expect.objectContaining({
      id: expect.any(String),
      source: 'person-a',
      target: 'person-b',
    }),
    expect.objectContaining({
      id: expect.any(String),
      source: 'person-a',
      target: 'person-c',
    }),
  ])
  expect(new Set(graph.edges.map((edge) => edge.id)).size).toBe(2)
})
