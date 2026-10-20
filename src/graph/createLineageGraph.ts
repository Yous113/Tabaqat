import dagre from '@dagrejs/dagre'
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
  const nodeWidth = 240
  const nodeHeight = 96
  const layout = new dagre.graphlib.Graph()
    .setDefaultEdgeLabel(() => ({}))
    .setGraph({ rankdir: 'TB', ranksep: 56, nodesep: 40 })

  for (const person of people) {
    layout.setNode(person.id, { width: nodeWidth, height: nodeHeight })
  }
  for (const connection of connections) {
    layout.setEdge(connection.from, connection.to)
  }
  dagre.layout(layout)

  return {
    nodes: people.map((person) => ({
      id: person.id,
      type: 'person',
      // Dagre measures from the center; React Flow measures from the top left.
      position: {
        x: layout.node(person.id).x - nodeWidth / 2,
        y: layout.node(person.id).y - nodeHeight / 2,
      },
      style: { width: nodeWidth, height: nodeHeight },
      data: { person },
    })),
    edges: connections.map((connection) => ({
      id: `father:${connection.from}:${connection.to}`,
      source: connection.from,
      target: connection.to,
      type: 'smoothstep',
    })),
  }
}
