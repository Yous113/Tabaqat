import type { Edge, Node } from '@xyflow/react'
import type { FatherConnection, Person } from '../data/types'

export type PersonNode = Node<{ person: Person }, 'person'>

export interface LineageGraph {
  nodes: PersonNode[]
  edges: Edge[]
}

export function createLineageGraph(
  people: Person[],
  connections: FatherConnection[],
): LineageGraph {
  return {
    nodes: people.map((person) => ({
      id: person.id,
      type: 'person',
      position: { x: 0, y: 0 },
      data: { person },
    })),
    edges: connections.map((connection) => ({
      id: `father:${connection.from}:${connection.to}`,
      source: connection.from,
      target: connection.to,
    })),
  }
}
