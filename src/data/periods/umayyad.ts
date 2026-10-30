import type { CaliphTenure, EvidenceReference, PeriodData } from '../types'

// Approved R1 chronology: docs/research/caliph-data-proposal.md.
// AH and CE labels are independently sourced year intervals, not conversions.
const roster: {
  personId: string
  title: string
  ah: [number, number]
  ce: [number, number]
  note?: string
  additionalSources?: EvidenceReference[]
}[] = [
  { personId: 'muawiyah-ibn-sakhr', title: 'Muʿāwiyah I', ah: [41, 60], ce: [661, 680] },
  { personId: 'yazid-ibn-muawiyah', title: 'Yazīd I', ah: [60, 64], ce: [680, 683] },
  {
    personId: 'muawiyah-ibn-yazid', title: 'Muʿāwiyah II', ah: [64, 64], ce: [683, 684],
    note: 'Short tenure; year labels do not imply a full year in office.',
    additionalSources: [{
      label: 'Mehmet Ali Kapar, TDV İslâm Ansiklopedisi (2020)',
      url: 'https://islamansiklopedisi.org.tr/muaviye-b-yezid',
      locator: 'Muâviye b. Yezîd: heading and accession/death paragraphs.',
    }],
  },
  { personId: 'marwan-ibn-hakam', title: 'Marwān I', ah: [64, 65], ce: [684, 685] },
  { personId: 'abd-al-malik-ibn-marwan', title: 'ʿAbd al-Malik', ah: [65, 86], ce: [685, 705] },
  { personId: 'walid-ibn-abd-al-malik', title: 'al-Walīd I', ah: [86, 96], ce: [705, 715] },
  { personId: 'sulayman-ibn-abd-al-malik', title: 'Sulaymān', ah: [96, 99], ce: [715, 717] },
  { personId: 'omar-ibn-abd-al-aziz', title: 'ʿUmar II', ah: [99, 101], ce: [717, 720] },
  { personId: 'yazid-ibn-abd-al-malik', title: 'Yazīd II', ah: [101, 105], ce: [720, 724] },
  { personId: 'hisham-ibn-abd-al-malik', title: 'Hishām', ah: [105, 125], ce: [724, 743] },
  { personId: 'walid-ibn-yazid', title: 'al-Walīd II', ah: [125, 126], ce: [743, 744] },
  { personId: 'yazid-ibn-walid', title: 'Yazīd III', ah: [126, 126], ce: [744, 744] },
  {
    personId: 'ibrahim-ibn-walid', title: 'Ibrāhīm', ah: [126, 127], ce: [744, 744],
    note: 'Limited recognition. His brief tenure ends at the 127 AH / 744 CE transition to Marwān II.',
    additionalSources: [{
      label: 'İbrahim Sarıçam, TDV İslâm Ansiklopedisi (2000)',
      url: 'https://islamansiklopedisi.org.tr/ibrahim-b-velid',
      locator: 'İbrâhim b. Velîd: accession and Aynülcer battle paragraphs.',
    }],
  },
  {
    personId: 'marwan-ibn-muhammad', title: 'Marwān II', ah: [127, 132], ce: [744, 750],
    additionalSources: [{
      label: 'Hasan Kurt, TDV İslâm Ansiklopedisi (2004)',
      url: 'https://islamansiklopedisi.org.tr/mervan-ii',
      locator: 'Mervân II: proclamation paragraph, 127 AH / 744 CE.',
    }],
  },
]

const tenures: CaliphTenure[] = roster.map(({ personId, title, ah, ce, note, additionalSources }) => ({
  personId,
  periodId: 'umayyad',
  title,
  status: 'caliph',
  reigns: [{ ah: { start: ah[0], end: ah[1] }, ce: { start: ce[0], end: ce[1] } }],
  ...(note ? { note } : {}),
  sources: [{
    label: 'Bosworth, The New Islamic Dynasties (1996)',
    url: 'https://pdfcoffee.com/bosworth-clifford-edmund-the-arabs-byzantium-and-iran-studies-in-early-islamic-history-and-culture-pdf-free.html',
    locator: `Section 2, Umayyad Caliphs: ${title}. Unofficial transcription; see approved research proposal for source limitations.`,
  }, ...(additionalSources ?? [])],
}))

export const umayyadData: PeriodData = {
  period: {
    id: 'umayyad',
    title: 'Umayyad',
    description: 'The Damascus caliphate, with the Muʿāwiyah and Marwān family branches.',
    focusId: 'muawiyah-ibn-sakhr',
    // Frozen descendants of Umayyah in approved R1 baseline aaf4351.
    // Additional descendants must be reviewed rather than silently added later.
    memberIds: [
      'umayyah-ibn-abd-shams',
      'abu-al-as-ibn-umayyah',
      'affan-ibn-abu-al-as',
      'uthman-ibn-affan',
      'hakam-ibn-abu-al-as',
      'marwan-ibn-hakam',
      'muhammad-ibn-marwan',
      'marwan-ibn-muhammad',
      'abd-al-aziz-ibn-marwan',
      'omar-ibn-abd-al-aziz',
      'abd-al-malik-ibn-marwan',
      'walid-ibn-abd-al-malik',
      'yazid-ibn-walid',
      'ibrahim-ibn-walid',
      'sulayman-ibn-abd-al-malik',
      'yazid-ibn-abd-al-malik',
      'walid-ibn-yazid',
      'hisham-ibn-abd-al-malik',
      'muawiyah-ibn-hisham',
      'abd-al-rahman-ibn-muawiyah',
      'harb-ibn-umayyah',
      'sakhr-ibn-harb',
      'muawiyah-ibn-sakhr',
      'yazid-ibn-muawiyah',
      'muawiyah-ibn-yazid',
    ],
  },
  people: [],
  connections: [],
  tenures,
}
