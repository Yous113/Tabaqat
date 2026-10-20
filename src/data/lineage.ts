import data from './people.json'
import type { FatherConnection, Person } from './types'

export const people: Person[] = data.people

export const connections: FatherConnection[] = data.connections.map(
  (connection) => {
    if (connection.type !== 'father') {
      throw new Error(`Unsupported connection type: ${connection.type}`)
    }

    return {
      from: connection.from,
      to: connection.to,
      type: connection.type,
    }
  },
)
