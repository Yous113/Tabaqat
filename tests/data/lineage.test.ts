import { expect, test } from 'vitest'
import { connections, people, periods, resolvePersonId, tenures } from '../../src/data/lineage'

test('loads the three approved periods and resolves both published Abu Bakr identities to one connected person', () => {
  expect(periods.map(({ id }) => id)).toEqual(['rashidun', 'umayyad', 'abbasid'])
  expect(tenures.filter(({ periodId }) => periodId === 'rashidun')).toHaveLength(5)
  expect(resolvePersonId('abdullah-ibn-uthman')).toBe('abu-bakr')
  expect(resolvePersonId('abu-bakr')).toBe('abu-bakr')
  expect(people.find(({ id }) => id === 'abu-bakr')?.aliases).toContain('ʿAbd Allāh')
  expect(people.some(({ id }) => id === 'abdullah-ibn-uthman')).toBe(false)
  expect(connections).toContainEqual({ from: 'uthman-ibn-amir', to: 'abu-bakr', type: 'father' })
  expect(connections).toContainEqual({ from: 'abu-bakr', to: 'muhammad-ibn-abdullah-ibn-uthman', type: 'father' })
})
