import { expect, test } from 'vitest'
import { abbasidData } from '../../src/data/periods/abbasid'

const regularIds = [
  'abu-al-abbas-ibn-muhammad', 'abu-jafar-ibn-muhammad',
  'muhammad-ibn-abdullah-ibn-muhammad', 'musa-ibn-muhammad',
  'harun-ibn-muhammad', 'muhammad-ibn-harun', 'abdullah-ibn-harun',
  'muhammad-ibn-harun-ibn-muhammad', 'harun-ibn-muhammad-ibn-harun',
  'jafar-ibn-muhammad', 'muhammad-ibn-jafar', 'ahmad-ibn-muhammad',
  'muhammad-ibn-jafar-ibn-muhammad',
  'muhammad-ibn-harun-ibn-muhammad-ibn-harun', 'ahmad-ibn-jafar',
  'ahmad-ibn-talhah', 'ali-ibn-ahmad', 'jafar-ibn-ahmad',
  'muhammad-ibn-ahmad', 'ahmad-ibn-jafar-ibn-ahmad', 'ibrahim-ibn-jafar',
  'abdullah-ibn-ali', 'fadl-ibn-jafar', 'abd-al-karim-ibn-fadl',
  'ahmad-ibn-ishaq', 'abdullah-ibn-ahmad', 'abdullah-ibn-muhammad',
  'ahmad-ibn-abdullah', 'fadl-ibn-ahmad', 'mansur-ibn-fadl',
  'muhammad-ibn-ahmad-ibn-abdullah', 'yusuf-ibn-muhammad', 'hasan-ibn-yusuf',
  'ahmad-ibn-hasan', 'muhammad-ibn-ahmad-ibn-hasan', 'mansur-ibn-muhammad',
  'abdullah-ibn-mansur',
]

test('includes every approved ordinary Baghdad caliph exactly once', () => {
  const regular = abbasidData.tenures.filter(({ status }) => status === 'caliph')
  expect(regular.map(({ personId }) => personId)).toEqual(regularIds)
  expect(abbasidData.period.focusId).toBe('abu-al-abbas-ibn-muhammad')
})

test('keeps the two approved rival claims separate from ordinary caliph offices', () => {
  expect(abbasidData.tenures.filter(({ status }) => status === 'claimant')).toEqual([
    expect.objectContaining({ personId: 'ibrahim-ibn-muhammad', reigns: [
      { ah: { start: 201, end: 203 }, ce: { start: 817, end: 819 } },
    ] }),
    expect.objectContaining({ personId: 'abdullah-ibn-muhammad-ibn-jafar', reigns: [
      { ah: { start: 296, end: 296 }, ce: { start: 908, end: 908 } },
    ] }),
  ])
})

test('adds the four necessary non-caliph connectors without inventing an office for them', () => {
  const connectors = [
    ['muhammad-ibn-muhammad-ibn-harun', 'muhammad-ibn-harun-ibn-muhammad'],
    ['talhah-ibn-jafar', 'jafar-ibn-muhammad'],
    ['ishaq-ibn-jafar', 'jafar-ibn-ahmad'],
    ['muhammad-ibn-abdullah-ibn-ahmad', 'abdullah-ibn-ahmad'],
  ]
  for (const [personId, fatherId] of connectors) {
    expect(abbasidData.people.find(({ id }) => id === personId)).toBeDefined()
    expect(abbasidData.connections).toContainEqual({ from: fatherId, to: personId, type: 'father' })
    expect(abbasidData.tenures.some((tenure) => tenure.personId === personId)).toBe(false)
    expect(abbasidData.period.memberIds).toContain(personId)
  }
  expect(abbasidData.people).toHaveLength(41)
  expect(abbasidData.connections).toHaveLength(41)
})

test('retains interrupted reigns with a qualified first al-Qahir tenure', () => {
  expect(abbasidData.tenures.find(({ personId }) => personId === 'jafar-ibn-ahmad')?.reigns).toEqual([
    { ah: { start: 295, end: 296 }, ce: { start: 908, end: 908 } },
    { ah: { start: 296, end: 317 }, ce: { start: 908, end: 929 } },
    { ah: { start: 317, end: 320 }, ce: { start: 929, end: 932 } },
  ])
  expect(abbasidData.tenures.find(({ personId }) => personId === 'muhammad-ibn-ahmad')?.reigns).toEqual([
    { ah: { start: 317, end: 317 }, ce: { start: 929, end: 929 }, note: 'Brief coup tenure.' },
    { ah: { start: 320, end: 322 }, ce: { start: 932, end: 934 } },
  ])
})

test('keeps the corrected al-Mustain lineage and al-Radi name variant traceable to the approved evidence', () => {
  expect(abbasidData.connections).toContainEqual({
    from: 'muhammad-ibn-muhammad-ibn-harun', to: 'ahmad-ibn-muhammad', type: 'father',
  })
  const mustain = abbasidData.people.find(({ id }) => id === 'ahmad-ibn-muhammad')
  expect(mustain?.sources).toContainEqual(expect.objectContaining({
    url: 'https://islamansiklopedisi.org.tr/mustain-billah',
  }))
  expect(abbasidData.people.find(({ id }) => id === 'ahmad-ibn-jafar-ibn-ahmad')?.aliases).toContain('Muḥammad')
  expect(abbasidData.tenures.find(({ personId }) => personId === 'abdullah-ibn-harun')?.note).toMatch(/198 AH/)
})
