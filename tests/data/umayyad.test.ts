import { expect, test } from 'vitest'
import { umayyadData } from '../../src/data/periods/umayyad'

test('identifies all fourteen Damascus caliphs without adding duplicate people', () => {
  expect(umayyadData.tenures.map(({ personId }) => personId)).toEqual([
    'muawiyah-ibn-sakhr',
    'yazid-ibn-muawiyah',
    'muawiyah-ibn-yazid',
    'marwan-ibn-hakam',
    'abd-al-malik-ibn-marwan',
    'walid-ibn-abd-al-malik',
    'sulayman-ibn-abd-al-malik',
    'omar-ibn-abd-al-aziz',
    'yazid-ibn-abd-al-malik',
    'hisham-ibn-abd-al-malik',
    'walid-ibn-yazid',
    'yazid-ibn-walid',
    'ibrahim-ibn-walid',
    'marwan-ibn-muhammad',
  ])
  expect(umayyadData.people).toEqual([])
  expect(umayyadData.connections).toEqual([])
  expect(umayyadData.tenures.every(({ periodId, status }) =>
    periodId === 'umayyad' && status === 'caliph',
  )).toBe(true)
})

test('keeps brief tenures qualified and preserves the independently sourced year boundaries', () => {
  expect(umayyadData.tenures.find(({ personId }) => personId === 'muawiyah-ibn-yazid')).toMatchObject({
    reigns: [{ ah: { start: 64, end: 64 }, ce: { start: 683, end: 684 } }],
    note: expect.stringContaining('Short tenure'),
  })
  expect(umayyadData.tenures.find(({ personId }) => personId === 'ibrahim-ibn-walid')).toMatchObject({
    reigns: [{ ah: { start: 126, end: 127 }, ce: { start: 744, end: 744 } }],
    note: expect.stringContaining('Limited recognition'),
  })
  expect(umayyadData.tenures.find(({ personId }) => personId === 'marwan-ibn-muhammad')).toMatchObject({
    reigns: [{ ah: { start: 127, end: 132 }, ce: { start: 744, end: 750 } }],
  })
})

test('retains existing family context without labelling Uthman or Spanish relatives as Damascus caliphs', () => {
  expect(umayyadData.period).toMatchObject({
    id: 'umayyad',
    focusId: 'muawiyah-ibn-sakhr',
    memberIds: expect.arrayContaining([
      'umayyah-ibn-abd-shams',
      'affan-ibn-abu-al-as',
      'uthman-ibn-affan',
      'hakam-ibn-abu-al-as',
      'marwan-ibn-hakam',
      'muawiyah-ibn-hisham',
      'abd-al-rahman-ibn-muawiyah',
    ]),
  })
  expect(umayyadData.period.memberIds).toHaveLength(25)
  expect(umayyadData.tenures.some(({ personId }) => personId === 'uthman-ibn-affan')).toBe(false)
  expect(umayyadData.tenures.some(({ personId }) => personId === 'abd-al-rahman-ibn-muawiyah')).toBe(false)
  expect(umayyadData.tenures.every(({ sources }) => sources.length > 0 && sources.every(({ url, locator }) =>
    url.startsWith('https://') && Boolean(locator),
  ))).toBe(true)
})
