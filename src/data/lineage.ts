import data from './people.json'
import { rashidunData } from './periods/rashidun'
import { umayyadData } from './periods/umayyad'
import { abbasidData } from './periods/abbasid'
import { validateLineage } from './validateLineage'
import type { FatherConnection, Person } from './types'

const datasets = [rashidunData, umayyadData, abbasidData]
export const people: Person[] = [...data.people, ...datasets.flatMap(({ people }) => people)]

export const connections: FatherConnection[] = data.connections.map<FatherConnection>(
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
).concat(datasets.flatMap(({ connections }) => connections))

export const tenures = datasets.flatMap(({ tenures }) => tenures)
export const periods = datasets.map(({ period }) => period)
const redirects: Record<string, string> = data.redirects

export function resolvePersonId(id: string): string {
  return redirects[id] ?? id
}

validateLineage({ people, connections, tenures, periods, redirects })
