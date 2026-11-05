import type { CaliphTenure, EvidenceReference, PeriodData, ReignInterval } from '../types'

// Historical scope and source decisions: docs/research/caliph-data-proposal.md, R1.
interface ConnectorRecord {
  id: string
  name: string
  fatherId: string
  sources: EvidenceReference[]
}

interface CaliphRecord {
  id: string
  name: string
  fatherId: string
  years: [number, number, number, number][]
  locator: string
  status?: 'claimant'
  note?: string
}

const bosworthUrl = 'https://pdfcoffee.com/bosworth-clifford-edmund-the-arabs-byzantium-and-iran-studies-in-early-islamic-history-and-culture-pdf-free.html'
const suyutiUrl = 'https://archive.org/details/cu31924023164654'

const regularCaliphs: CaliphRecord[] = [
  {
    id: 'abu-al-abbas-ibn-muhammad',
    name: 'al-Saffāḥ (ʿAbd Allāh)',
    fatherId: 'muhammad-ibn-ali-ibn-abdullah',
    years: [[132, 136, 749, 754]],
    locator: 'p. 261, al-Saffah biography',
  },
  {
    id: 'abu-jafar-ibn-muhammad',
    name: 'al-Manṣūr (ʿAbd Allāh)',
    fatherId: 'muhammad-ibn-ali-ibn-abdullah',
    years: [[136, 158, 754, 775]],
    locator: 'p. 264, al-Mansur biography',
  },
  {
    id: 'muhammad-ibn-abdullah-ibn-muhammad',
    name: 'al-Mahdī (Muḥammad)',
    fatherId: 'abu-jafar-ibn-muhammad',
    years: [[158, 169, 775, 785]],
    locator: 'p. 278, al-Mahdi biography',
  },
  {
    id: 'musa-ibn-muhammad',
    name: 'al-Hādī (Mūsā)',
    fatherId: 'muhammad-ibn-abdullah-ibn-muhammad',
    years: [[169, 170, 785, 786]],
    locator: 'Printed p. 286',
  },
  {
    id: 'harun-ibn-muhammad',
    name: 'al-Rashīd (Hārūn)',
    fatherId: 'muhammad-ibn-abdullah-ibn-muhammad',
    years: [[170, 193, 786, 809]],
    locator: 'pp. 290–291, al-Rashid biography',
  },
  {
    id: 'muhammad-ibn-harun',
    name: 'al-Amīn (Muḥammad)',
    fatherId: 'harun-ibn-muhammad',
    years: [[193, 198, 809, 813]],
    locator: 'p. 306, al-Amin biography',
  },
  {
    id: 'abdullah-ibn-harun',
    note: 'Sole succession begins in 198 AH / 813 CE. The unofficial Bosworth transcription’s 189 AH numeral is not used; earlier proclamation by supporters is not a separate reign here.',
    name: 'al-Maʾmūn (ʿAbd Allāh)',
    fatherId: 'harun-ibn-muhammad',
    years: [[198, 218, 813, 833]],
    locator: 'Printed p. 318',
  },
  {
    id: 'muhammad-ibn-harun-ibn-muhammad',
    name: 'al-Muʿtaṣim (Muḥammad)',
    fatherId: 'harun-ibn-muhammad',
    years: [[218, 227, 833, 842]],
    locator: 'Printed p. 348',
  },
  {
    id: 'harun-ibn-muhammad-ibn-harun',
    name: 'al-Wāthiq (Hārūn)',
    fatherId: 'muhammad-ibn-harun-ibn-muhammad',
    years: [[227, 232, 842, 847]],
    locator: 'Printed p. 354',
  },
  {
    id: 'jafar-ibn-muhammad',
    name: 'al-Mutawakkil (Jaʿfar)',
    fatherId: 'muhammad-ibn-harun-ibn-muhammad',
    years: [[232, 247, 847, 861]],
    locator: 'Printed p. 360',
  },
  {
    id: 'muhammad-ibn-jafar',
    name: 'al-Muntaṣir (Muḥammad)',
    fatherId: 'jafar-ibn-muhammad',
    years: [[247, 248, 861, 862]],
    locator: 'pp. 372–373, al-Muntasir biography',
  },
  {
    id: 'ahmad-ibn-muhammad',
    note: 'Parentage follows TDV’s intervening Muhammad, correcting the shorter filiation in the older Jarrett translation. Reign endpoints use year precision.',
    name: 'al-Mustaʿīn (Aḥmad)',
    fatherId: 'muhammad-ibn-muhammad-ibn-harun',
    years: [[248, 252, 862, 866]],
    locator: '',
  },
  {
    id: 'muhammad-ibn-jafar-ibn-muhammad',
    name: 'al-Muʿtazz (Muḥammad)',
    fatherId: 'jafar-ibn-muhammad',
    years: [[252, 255, 866, 869]],
    locator: 'Printed p. 374',
  },
  {
    id: 'muhammad-ibn-harun-ibn-muhammad-ibn-harun',
    name: 'al-Muhtadī (Muḥammad)',
    fatherId: 'harun-ibn-muhammad-ibn-harun',
    years: [[255, 256, 869, 870]],
    locator: 'Printed p. 376',
  },
  {
    id: 'ahmad-ibn-jafar',
    name: 'al-Muʿtamid (Aḥmad)',
    fatherId: 'jafar-ibn-muhammad',
    years: [[256, 279, 870, 892]],
    locator: 'Printed p. 380',
  },
  {
    id: 'ahmad-ibn-talhah',
    name: 'al-Muʿtaḍid (Aḥmad)',
    fatherId: 'talhah-ibn-jafar',
    years: [[279, 289, 892, 902]],
    locator: 'Printed pp. 385–386',
  },
  {
    id: 'ali-ibn-ahmad',
    name: 'al-Muktafī (ʿAlī)',
    fatherId: 'ahmad-ibn-talhah',
    years: [[289, 295, 902, 908]],
    locator: 'Printed p. 393',
  },
  {
    id: 'jafar-ibn-ahmad',
    note: 'Three reign intervals: interrupted by Ibn al-Muʿtazz’s brief claim and later by al-Qāhir’s coup. Year-only endpoints do not indicate the duration of those interruptions.',
    name: 'al-Muqtadir (Jaʿfar)',
    fatherId: 'ahmad-ibn-talhah',
    years: [[295, 296, 908, 908], [296, 317, 908, 929], [317, 320, 929, 932]],
    locator: 'Printed pp. 395–403',
  },
  {
    id: 'muhammad-ibn-ahmad',
    note: 'The first interval is a brief coup tenure; the second is the later ordinary reign.',
    name: 'al-Qāhir (Muḥammad)',
    fatherId: 'ahmad-ibn-talhah',
    years: [[317, 317, 929, 929], [320, 322, 932, 934]],
    locator: 'Printed pp. 404–408',
  },
  {
    id: 'ahmad-ibn-jafar-ibn-ahmad',
    note: 'Ahmad is the canonical personal name here; Muhammad is a source-attested name variant, not another person.',
    name: 'al-Rāḍī (Aḥmad)',
    fatherId: 'jafar-ibn-ahmad',
    years: [[322, 329, 934, 940]],
    locator: 'Printed p. 408',
  },
  {
    id: 'ibrahim-ibn-jafar',
    name: 'al-Muttaqī (Ibrāhīm)',
    fatherId: 'jafar-ibn-ahmad',
    years: [[329, 333, 940, 944]],
    locator: 'Printed p. 413',
  },
  {
    id: 'abdullah-ibn-ali',
    name: 'al-Mustakfī (ʿAbd Allāh)',
    fatherId: 'ali-ibn-ahmad',
    years: [[333, 334, 944, 946]],
    locator: 'Printed p. 416',
  },
  {
    id: 'fadl-ibn-jafar',
    name: 'al-Muṭīʿ (al-Faḍl)',
    fatherId: 'jafar-ibn-ahmad',
    years: [[334, 363, 946, 974]],
    locator: 'p. 417, al-Muti biography',
  },
  {
    id: 'abd-al-karim-ibn-fadl',
    name: 'al-Ṭāʾiʿ (ʿAbd al-Karīm)',
    fatherId: 'fadl-ibn-jafar',
    years: [[363, 381, 974, 991]],
    locator: 'p. 425, al-Tai biography',
  },
  {
    id: 'ahmad-ibn-ishaq',
    name: 'al-Qādir (Aḥmad)',
    fatherId: 'ishaq-ibn-jafar',
    years: [[381, 422, 991, 1031]],
    locator: 'Printed p. 431',
  },
  {
    id: 'abdullah-ibn-ahmad',
    note: 'Retains the overall caliphate interval, with an occupation interruption under al-Basasiri; no separately recognized Abbasid successor is inserted.',
    name: 'al-Qāʾim (ʿAbd Allāh)',
    fatherId: 'ahmad-ibn-ishaq',
    years: [[422, 467, 1031, 1075]],
    locator: 'Printed p. 437',
  },
  {
    id: 'abdullah-ibn-muhammad',
    name: 'al-Muqtadī (ʿAbd Allāh)',
    fatherId: 'muhammad-ibn-abdullah-ibn-ahmad',
    years: [[467, 487, 1075, 1094]],
    locator: 'Printed pp. 443–444',
  },
  {
    id: 'ahmad-ibn-abdullah',
    name: 'al-Mustaẓhir (Aḥmad)',
    fatherId: 'abdullah-ibn-muhammad',
    years: [[487, 512, 1094, 1118]],
    locator: 'Printed p. 447',
  },
  {
    id: 'fadl-ibn-ahmad',
    name: 'al-Mustarshid (al-Faḍl)',
    fatherId: 'ahmad-ibn-abdullah',
    years: [[512, 529, 1118, 1135]],
    locator: 'Printed p. 453',
  },
  {
    id: 'mansur-ibn-fadl',
    name: 'al-Rāshid (al-Manṣūr)',
    fatherId: 'fadl-ibn-ahmad',
    years: [[529, 530, 1135, 1136]],
    locator: 'p. 458, al-Rashid (later) biography',
  },
  {
    id: 'muhammad-ibn-ahmad-ibn-abdullah',
    name: 'al-Muqtafī (Muḥammad)',
    fatherId: 'ahmad-ibn-abdullah',
    years: [[530, 555, 1136, 1160]],
    locator: 'Printed p. 459',
  },
  {
    id: 'yusuf-ibn-muhammad',
    name: 'al-Mustanjid (Yūsuf)',
    fatherId: 'muhammad-ibn-ahmad-ibn-abdullah',
    years: [[555, 566, 1160, 1170]],
    locator: 'Printed p. 465',
  },
  {
    id: 'hasan-ibn-yusuf',
    note: 'The 575 AH / 1180 CE endpoint follows Bosworth and is independently supported by TDV’s al-Nasir accession account.',
    name: 'al-Mustaḍīʾ (al-Ḥasan)',
    fatherId: 'yusuf-ibn-muhammad',
    years: [[566, 575, 1170, 1180]],
    locator: 'p. 468, al-Mustadi biography',
  },
  {
    id: 'ahmad-ibn-hasan',
    note: 'The 575 AH / 1180 CE accession follows Bosworth and is independently supported by TDV.',
    name: 'al-Nāṣir (Aḥmad)',
    fatherId: 'hasan-ibn-yusuf',
    years: [[575, 622, 1180, 1225]],
    locator: 'Printed p. 472',
  },
  {
    id: 'muhammad-ibn-ahmad-ibn-hasan',
    name: 'al-Ẓāhir (Muḥammad)',
    fatherId: 'ahmad-ibn-hasan',
    years: [[622, 623, 1225, 1226]],
    locator: 'Printed p. 484',
  },
  {
    id: 'mansur-ibn-muhammad',
    name: 'al-Mustanṣir (al-Manṣūr)',
    fatherId: 'muhammad-ibn-ahmad-ibn-hasan',
    years: [[623, 640, 1226, 1242]],
    locator: 'Printed p. 486',
  },
  {
    id: 'abdullah-ibn-mansur',
    name: 'al-Mustaʿṣim (ʿAbd Allāh)',
    fatherId: 'mansur-ibn-muhammad',
    years: [[640, 656, 1242, 1258]],
    locator: 'p. 490, al-Mustasim biography',
  },
]

function sourcesFor(record: CaliphRecord): EvidenceReference[] {
  const sources: EvidenceReference[] = [{
    label: 'Bosworth, The New Islamic Dynasties (1996)',
    url: bosworthUrl,
    locator: `Section 3.1, caliphs in Iraq and Baghdad: ${record.name}. Unofficial transcription; year precision.`,
  }]
  if (record.locator) sources.push({
    label: 'al-Suyūṭī, History of the Caliphs, tr. Jarrett (1881)',
    url: suyutiUrl,
    locator: record.locator,
  })
  const supplementary: Partial<Record<string, EvidenceReference>> = {
    'ahmad-ibn-muhammad': {
      label: 'Özaydın, Müstaîn-Billâh, TDV (2006)',
      url: 'https://islamansiklopedisi.org.tr/mustain-billah',
      locator: 'Heading, first paragraph and abdication paragraph: Ahmad ibn Muhammad ibn al-Mutasim, 248–252 AH / 862–866 CE.',
    },
    'abdullah-ibn-harun': {
      label: 'Bozkurt, Me’mûn, TDV (2004)',
      url: 'https://islamansiklopedisi.org.tr/memun',
      locator: 'Paragraph on al-Amin’s death and sole succession in 198 AH / 813 CE.',
    },
    'ahmad-ibn-jafar-ibn-ahmad': {
      label: 'Özaydın, Râzî-Billâh, TDV (2007)',
      url: 'https://islamansiklopedisi.org.tr/razi-billah',
      locator: 'Heading: Ahmad (Muhammad), son of Jafar al-Muqtadir.',
    },
    'hasan-ibn-yusuf': {
      label: 'Hartmann, Nâsır-Lidînillâh, TDV (2006)',
      url: 'https://islamansiklopedisi.org.tr/nasir-lidinillah',
      locator: 'First paragraph: father’s death and al-Nasir’s succession in 575 AH / 1180 CE.',
    },
    'ahmad-ibn-hasan': {
      label: 'Hartmann, Nâsır-Lidînillâh, TDV (2006)',
      url: 'https://islamansiklopedisi.org.tr/nasir-lidinillah',
      locator: 'First paragraph: succession in 575 AH / 1180 CE.',
    },
  }
  const additionalSource = supplementary[record.id]
  if (additionalSource) sources.push(additionalSource)
  return sources
}

function reignsFor(record: CaliphRecord): ReignInterval[] {
  return record.years.map(([ahStart, ahEnd, ceStart, ceEnd], index) => ({
    ah: { start: ahStart, end: ahEnd },
    ce: { start: ceStart, end: ceEnd },
    ...(record.id === 'muhammad-ibn-ahmad' && index === 0
      ? { note: 'Brief coup tenure.' } : {}),
  }))
}

const rivalClaimants: CaliphRecord[] = [
  {
    id: 'ibrahim-ibn-muhammad',
    name: 'Ibrāhīm ibn al-Mahdī',
    fatherId: 'muhammad-ibn-abdullah-ibn-muhammad',
    years: [[201, 203, 817, 819]],
    locator: 'al-Mamun narrative, p. 318 onward',
    status: 'claimant',
    note: 'Rival claimant in Baghdad, overlapping al-Maʾmūn’s reign.',
  },
  {
    id: 'abdullah-ibn-muhammad-ibn-jafar',
    name: 'ʿAbd Allāh ibn al-Muʿtazz',
    fatherId: 'muhammad-ibn-jafar-ibn-muhammad',
    years: [[296, 296, 908, 908]],
    locator: 'pp. 395–403, al-Muqtadir narrative',
    status: 'claimant',
    note: 'Brief coup tenure; conventionally called the one-day caliph. Year precision does not indicate duration.',
  },
]

const connectors: ConnectorRecord[] = [
  {
    id: 'muhammad-ibn-muhammad-ibn-harun',
    name: 'Muḥammad ibn al-Muʿtaṣim',
    fatherId: 'muhammad-ibn-harun-ibn-muhammad',
    sources: [{
      label: 'Özaydın, Müstaîn-Billâh, TDV (2006)',
      url: 'https://islamansiklopedisi.org.tr/mustain-billah',
      locator: 'Heading and first paragraph; father Muhammad is the son of al-Mutasim. Corrects S p. 373.',
    }],
  },
  {
    id: 'talhah-ibn-jafar',
    name: 'Ṭalḥah al-Muwaffaq',
    fatherId: 'jafar-ibn-muhammad',
    sources: [{
      label: 'al-Suyūṭī, History of the Caliphs, tr. Jarrett (1881)',
      url: suyutiUrl,
      locator: 'pp. 385–386, al-Mutadid filiation: Talhah ibn al-Mutawakkil.',
    }],
  },
  {
    id: 'ishaq-ibn-jafar',
    name: 'Isḥāq ibn al-Muqtadir',
    fatherId: 'jafar-ibn-ahmad',
    sources: [{
      label: 'al-Suyūṭī, History of the Caliphs, tr. Jarrett (1881)',
      url: suyutiUrl,
      locator: 'p. 431, al-Qadir filiation: Ahmad ibn Ishaq ibn al-Muqtadir.',
    }],
  },
  {
    id: 'muhammad-ibn-abdullah-ibn-ahmad',
    name: 'Muḥammad ibn al-Qāʾim',
    fatherId: 'abdullah-ibn-ahmad',
    sources: [{
      label: 'al-Suyūṭī, History of the Caliphs, tr. Jarrett (1881)',
      url: suyutiUrl,
      locator: 'pp. 443–444, al-Muqtadi filiation; Muhammad died before his father al-Qaim.',
    }],
  },
]

const records = [...regularCaliphs, ...rivalClaimants]
const additions = records.filter(({ id }) =>
  id !== 'abu-al-abbas-ibn-muhammad' && id !== 'abu-jafar-ibn-muhammad',
)
const tenures: CaliphTenure[] = records.map((record) => ({
  personId: record.id,
  periodId: 'abbasid',
  title: record.name,
  status: record.status ?? 'caliph',
  reigns: reignsFor(record),
  sources: sourcesFor(record),
  ...(record.note ? { note: record.note } : {}),
}))

export const abbasidData: PeriodData = {
  period: {
    id: 'abbasid',
    title: 'Abbasid',
    description: 'The Iraq and Baghdad caliphate, with its caliphs and connected family branches.',
    focusId: 'abu-al-abbas-ibn-muhammad',
    memberIds: [
      'abbas-ibn-abd-al-muttalib',
      'abdullah-ibn-abbas',
      'ali-ibn-abdullah',
      'muhammad-ibn-ali-ibn-abdullah',
      ...records.map(({ id }) => id),
      ...connectors.map(({ id }) => id),
    ],
  },
  people: [
    ...additions.map((record) => ({
      id: record.id,
      name: record.name,
      ...(record.id === 'ahmad-ibn-jafar-ibn-ahmad' ? { aliases: ['Muḥammad'] } : {}),
      sources: sourcesFor(record),
    })),
    ...connectors.map(({ id, name, sources }) => ({ id, name, sources })),
  ],
  connections: [...additions, ...connectors].map(({ id, fatherId }) => ({
    from: fatherId,
    to: id,
    type: 'father',
  })),
  tenures,
}
