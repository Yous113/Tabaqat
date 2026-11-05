import { expect, test } from 'vitest'
import { validateLineage } from '../../src/data/validateLineage'
import type { LineageData } from '../../src/data/types'

const valid: LineageData = {
  people: [{ id: 'father', name: 'Father' }, { id: 'son', name: 'Son' }],
  connections: [{ from: 'father', to: 'son', type: 'father' }],
  tenures: [], periods: [], redirects: {},
}

test('rejects duplicate canonical identities at the loaded data boundary', () => {
  expect(() => validateLineage({ ...valid, people: [...valid.people, valid.people[0]] })).toThrow(/duplicate person/i)
  expect(() => validateLineage(valid)).not.toThrow()
})

test('rejects office records that cannot be displayed with valid sourced reign intervals', () => {
  const period = { id: 'rashidun', title: 'Rashidun', description: '', focusId: 'son', memberIds: ['son'] } as const
  const tenure = { personId: 'son', periodId: 'rashidun', title: 'Caliph', status: 'caliph', reigns: [{ ah: { start: 11, end: 13 }, ce: { start: 632, end: 634 } }], sources: [{ label: 'Chronology', url: 'https://example.com/history' }] } as const
  const input: LineageData = { ...valid, periods: [{ ...period, memberIds: ['son'] }], tenures: [{ ...tenure, reigns: [...tenure.reigns], sources: [...tenure.sources] }] }
  expect(() => validateLineage(input)).not.toThrow()
  expect(() => validateLineage({ ...input, tenures: [{ ...input.tenures[0], sources: [] }] })).toThrow(/source/i)
  expect(() => validateLineage({ ...input, tenures: [{ ...input.tenures[0], personId: 'missing' }] })).toThrow(/tenure/i)
  expect(() => validateLineage({ ...input, tenures: [{ ...input.tenures[0], reigns: [{ ah: { start: 13, end: 11 }, ce: { start: 632, end: 634 } }] }] })).toThrow(/interval/i)
})

test('rejects unresolved period members and redirects before a view opens', () => {
  expect(() => validateLineage({ ...valid, periods: [{ id: 'rashidun', title: 'Rashidun', description: '', focusId: 'son', memberIds: ['missing'] }] })).toThrow(/period member/i)
  expect(() => validateLineage({ ...valid, redirects: { old: 'missing' } })).toThrow(/redirect/i)
  expect(() => validateLineage({ ...valid, redirects: { son: 'father' } })).toThrow(/redirect/i)
})

test('rejects missing parents, multiple fathers and lineage cycles', () => {
  expect(() => validateLineage({ ...valid, connections: [{ from: 'missing', to: 'son', type: 'father' }] })).toThrow(/unknown person/i)
  expect(() => validateLineage({ ...valid, connections: [...valid.connections, { from: 'son', to: 'son', type: 'father' }] })).toThrow(/multiple fathers/i)
  expect(() => validateLineage({ ...valid, connections: [...valid.connections, { from: 'son', to: 'father', type: 'father' }] })).toThrow(/cycle/i)
})
