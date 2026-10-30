import type { PeriodData } from '../types'

// Approved R1 year chronology; no exact calendar conversion is inferred.
const roster: [string, string, number, number, number, number][] = [
  ['abu-bakr', 'Abū Bakr', 11, 13, 632, 634],
  ['omar-ibn-khattab', 'ʿOmar', 13, 23, 634, 644],
  ['uthman-ibn-affan', 'ʿUthmān', 23, 35, 644, 656],
  ['ali-ibn-abu-talib', 'ʿAlī', 35, 40, 656, 661],
  ['hasan-ibn-ali', 'Al-Ḥasan', 40, 41, 661, 661],
]

export const rashidunData: PeriodData = {
  period: {
    id: 'rashidun', title: 'Rashidun',
    description: 'The first caliphs and their connected family branches, including al-Ḥasan.',
    focusId: 'abu-bakr',
    memberIds: [
      'muhammad-ibn-abdullah',
      'adi-ibn-kab',
      'razah-ibn-adi',
      'qurt-ibn-razah',
      'abdullah-ibn-qurt',
      'riyah-ibn-abdullah',
      'abd-al-uzzah-ibn-riyah',
      'nufayl-ibn-abd-al-uzzah',
      'khattab-ibn-nufayl',
      'omar-ibn-khattab',
      'abdullah-ibn-omar',
      'salem-ibn-abdullah',
      'taym-ibn-murrah',
      'sad-ibn-taym',
      'kab-ibn-sad',
      'amr-ibn-kab',
      'amir-ibn-amr',
      'uthman-ibn-amir',
      'muhammad-ibn-abdullah-ibn-uthman',
      'qasim-ibn-muhammad',
      'uthman-ibn-amr',
      'ubayd-allah-ibn-uthman',
      'talhah-ibn-ubayd-allah',
      'abu-talib-ibn-abd-al-muttalib',
      'ali-ibn-abu-talib',
      'hasan-ibn-ali',
      'husayn-ibn-ali',
      'muhammad-ibn-ali',
      'affan-ibn-abu-al-as',
      'uthman-ibn-affan',
      'abu-bakr',
    ],
  },
  people: [], connections: [],
  tenures: roster.map((row) => {
    const [personId, title, ahStart, ahEnd, ceStart, ceEnd] = row
    return {
      personId, periodId: 'rashidun', title, status: 'caliph',
      reigns: [{ ah: { start: ahStart, end: ahEnd }, ce: { start: ceStart, end: ceEnd } }],
      sources: [{
        label: 'Bosworth, The New Islamic Dynasties (1996)',
        url: 'https://pdfcoffee.com/bosworth-clifford-edmund-the-arabs-byzantium-and-iran-studies-in-early-islamic-history-and-culture-pdf-free.html',
        locator: 'Section 1, Rightly-Guided Caliphs; named entry or al-Hasan prose. Unofficial transcription; see research proposal.',
      }, {
        label: 'Al-Suyūṭī / Jarrett, History of the Caliphs (1881)',
        url: 'https://archive.org/details/cu31924023164654',
        locator: personId === 'hasan-ibn-ali' ? 'Printed pp. 191–194, al-Hasan biography and abdication.' : 'Named Rashidun biography; Abu Bakr filiation printed pp. 25–27.',
      }],
      ...(personId === 'hasan-ibn-ali' ? { note: 'Included in the Rashidun period by the agreed project convention; abdication in 41 AH. Year precision.' } : {}),
    }
  }),
}
