# Caliph data proposal — Step 1

Approval status: **R1 APPROVED FOR IMPLEMENTATION (provisional, 2026-10-30).** Research revision **R1 (2026-10-30)**, baseline commit `421705a428979813243a2f643dc33664d83d8c1f`. This document is a proposal only. Preserve all current names, aliases, roles, profiles, IDs and father edges unless an explicitly listed correction is separately approved.

## Approval record

The user stated “I will approve for now and we will look at it later” and requested implementation of the plan with three leads. This accepts R1's roster, year-precision chronology and membership, the two qualified rival claimants, al-Mustaʿīn's connecting ancestor, the longer al-Muhtadī ID, and the separate Abū Bakr identity correction preserving both published IDs. No rows were rejected and no additional chronology exceptions were requested. Source caveats remain; approval authorizes implementation and does not independently verify historical truth. The user also explicitly approved all three test seams in the plan.

The proposal text below is retained as the original review ledger: its **PENDING** labels and conditional correction language describe the pre-approval state. This approval record supersedes that status for implementation.

## Evidence and precision

- **S**: al-Suyūṭī, *History of the Caliphs*, translated H. S. Jarrett, Calcutta, Asiatic Society, 1881, [digitized original](https://archive.org/details/cu31924023164654), [PDF](https://archive.org/download/cu31924023164654/cu31924023164654.pdf), [searchable OCR](https://archive.org/download/cu31924023164654/cu31924023164654_djvu.txt). A late medieval primary historical compilation, not a contemporary witness to every reign. Printed page numbers below, not PDF page indices. Its theological judgments are not proposed facts.
- **B1/B2/B3**: C. E. Bosworth, *The New Islamic Dynasties: A Chronological and Genealogical Manual*, Edinburgh University Press, 1996 (digital printing 2012), sections **1 Rightly-Guided Caliphs**, **2 Umayyad Caliphs**, **3 Abbasid Caliphs, subsection 1, caliphs in Iraq and Baghdad**. [Accessible transcription](https://pdfcoffee.com/bosworth-clifford-edmund-the-arabs-byzantium-and-iran-studies-in-early-islamic-history-and-culture-pdf-free.html). The host title is wrong: the internal title page identifies Bosworth's *New Islamic Dynasties*. These section/table locators are used because the HTML loses printed pagination. This is a scholarly reference, hosted on an unofficial mirror; verify against a library copy before treating typographical anomalies as authoritative.

All proposed reign endpoints below are **year precision**, with AH and CE independently transcribed from the scholarly chronology, not calculated conversions. An interval is accession year through termination year, not January-to-December occupation of every year. B tables normally give accession years; the following accession supplies the previous endpoint, except where interruptions or competing claims require separate intervals. Death years after deposition must not replace reign endpoints. S supplies the named biographies and connecting parentage; B supplies a cross-check of office, filiation and year chronology. Each row's S locator identifies the biographical section (opening filiation and accession narrative); B1–B3 identify the specific named chronological entry. Existing father edges are user-approved and preserved, not re-researched ancient genealogy.

Material limitations: MarkItDown successfully extracted the existing JSON (reused `/tmp/tabaqat-step1-people.md`) and the downloaded B HTML. Conversion of the 600-page S PDF succeeded; while it ran, the archive's existing plain-text OCR was used for textual verification. The durable archive links above allow rechecking without depending on temporary local files. OCR contains damaged diacritics, headings and numerals. The supplied JPG previously yielded no text with MarkItDown; it was inspected visually here. Small reign annotations are not reliable enough to serve as date evidence. No facts are accepted solely from that image. No Wikipedia list is used as authority. During parent review, direct downloads of additional TDV pages returned HTTP 403; their published text was accessible through web retrieval and was used as a supplementary source. This did not prevent checking the cited claims.

## Inventory and proposed actions

Baseline: 99 people, 97 father edges, two roots (`adnan`, `abu-bakr`), five Rashidun roles and one prophet role, no reigns/period metadata. All 14 Damascus Umayyads exist; only the first two of the 37 conventional Baghdad Abbasids exist. The tables are the per-person change ledger. Every row is **PENDING**. `M` = add period/office/reign metadata to an existing person; `N` = add person, father edge and metadata; `C` = add connector person and father edge, with no caliph office. Parent IDs in new rows are proposed edges; each is evidenced by the row's S filiation and/or B nasab. Stable IDs use the personal name and father's personal name, extending through grandfather where collisions require it. Al-Muhtadi requires one further generation because both he and al-Mutasim are Muhammad ibn Harun ibn Muhammad; this four-generation collision extension needs explicit approval as an ADR-0002 clarification before implementation. Existing kunyah-based IDs remain unchanged.

## Rashidun roster

All five retain their existing Rashidun role. Names below are identification labels, not permission to overwrite existing display names. Hasan is included by the agreed project convention even though B1's numbered table has four entries.

| Canonical identification | Stable ID | Father ID | AH reign | CE reign | Evidence/action |
|---|---|---|---|---|---|
| Abū Bakr (ʿAbd Allāh ibn ʿUthmān) | abu-bakr | unassigned; correction choice below | 11–13 | 632–634 | S, Abu Bakr biography, pp. 25–27 and succession/death narrative; B1; M |
| ʿUmar ibn al-Khaṭṭāb | omar-ibn-khattab | khattab-ibn-nufayl | 13–23 | 634–644 | B1; existing father preserved; M |
| ʿUthmān ibn ʿAffān | uthman-ibn-affan | affan-ibn-abu-al-as | 23–35 | 644–656 | B1; existing father preserved; M |
| ʿAlī ibn Abī Ṭālib | ali-ibn-abu-talib | abu-talib-ibn-abd-al-muttalib | 35–40 | 656–661 | B1; existing father preserved; M |
| al-Ḥasan ibn ʿAlī | hasan-ibn-ali | ali-ibn-abu-talib | 40–41 | 661–661 | S pp. 191–194, al-Hasan biography and abdication narrative; B1 prose; existing father preserved; M |

Dating caution: the B1 transcription prints the Umayyad transition as 40/661, while B2 starts Muawiyah at 41/661. Retain Hasan's 40–41 AH interval and explain the abdication boundary; do not force the two tables into a conversion. Umar's 23 AH succession crosses 643/644 in modern descriptions; this proposal follows B1's 644 CE accession for Uthman, and uses year precision rather than claiming an exact day.

## Damascus Umayyad roster

All rows: role `umayyad-caliph`, period `umayyad`, action M; father edges already exist and are preserved. Evidence B2, named entry, supports each office and year boundary. Both Sufyanid and Marwanid branches are mandatory.

| Canonical identification | Stable ID | Father ID | AH reign | CE reign | Evidence/action |
|---|---|---|---|---|---|
| Muʿāwiyah I | `muawiyah-ibn-sakhr` | `sakhr-ibn-harb` | 41–60 | 661–680 | B2; M; PENDING |
| Yazīd I | `yazid-ibn-muawiyah` | `muawiyah-ibn-sakhr` | 60–64 | 680–683 | B2; M; PENDING |
| Muʿāwiyah II | `muawiyah-ibn-yazid` | `yazid-ibn-muawiyah` | 64–64 | 683–684 | B2; M; PENDING |
| Marwān I | `marwan-ibn-hakam` | `hakam-ibn-abu-al-as` | 64–65 | 684–685 | B2; M; PENDING |
| ʿAbd al-Malik | `abd-al-malik-ibn-marwan` | `marwan-ibn-hakam` | 65–86 | 685–705 | B2; M; PENDING |
| al-Walīd I | `walid-ibn-abd-al-malik` | `abd-al-malik-ibn-marwan` | 86–96 | 705–715 | B2; M; PENDING |
| Sulaymān | `sulayman-ibn-abd-al-malik` | `abd-al-malik-ibn-marwan` | 96–99 | 715–717 | B2; M; PENDING |
| ʿUmar II | `omar-ibn-abd-al-aziz` | `abd-al-aziz-ibn-marwan` | 99–101 | 717–720 | B2; M; PENDING |
| Yazīd II | `yazid-ibn-abd-al-malik` | `abd-al-malik-ibn-marwan` | 101–105 | 720–724 | B2; M; PENDING |
| Hishām | `hisham-ibn-abd-al-malik` | `abd-al-malik-ibn-marwan` | 105–125 | 724–743 | B2; M; PENDING |
| al-Walīd II | `walid-ibn-yazid` | `yazid-ibn-abd-al-malik` | 125–126 | 743–744 | B2; M; PENDING |
| Yazīd III | `yazid-ibn-walid` | `walid-ibn-abd-al-malik` | 126–126 | 744–744 | B2; M; PENDING |
| Ibrāhīm | `ibrahim-ibn-walid` | `walid-ibn-abd-al-malik` | 126–127 | 744–744 | B2; M; PENDING |
| Marwān II | `marwan-ibn-muhammad` | `muhammad-ibn-marwan` | 127–132 | 744–750 | B2; M; PENDING |

Muawiyah II receives a short-tenure note; Ibrāhīm receives a limited-recognition note. The scholarly TDV entries corroborate Muawiyah II's 683–684 tenure and the Ibrāhīm/Marwān II transition in **127 AH / 744 CE**. Retain 126–127 AH for Ibrāhīm and 127–132 AH for Marwān II; no unresolved 126/127 choice is required for this proposal. See the supplementary source locators below. Ibn al-Zubayr's competing caliphate is contextual history, not a Damascus Umayyad office; the already recorded person is not given an Umayyad badge.

## Baghdad Abbasid roster and connecting lineage

Period `abbasid`; role `abbasid-caliph` for ordinary rows. Rival rows require explicit `claimant` qualification, not an undisputed caliph badge. B3 includes Ibrāhīm and Ibn al-Muʿtazz separately; the conventional count is 37 regular caliphs plus these two rival claimants. Baghdad here is the dynasty's Iraq caliphate, including its pre-Baghdad and Samarra seats, not a residence filter. Exclude Aleppo/Harran and Cairo restorations after 1258.

Each S page is the named biography's opening filiation unless noted. B3 named entries support personal name, office and chronology. Fathers represented by caliphal titles in S/B are resolved here to the same canonical person ID, never to a succession edge.

| # | Canonical identification | Stable ID | Father ID | AH reign(s) | CE reign(s) | Sources/action; all PENDING |
|---|---|---|---|---|---|---|
| 1 | al-Saffāḥ (ʿAbd Allāh) | `abu-al-abbas-ibn-muhammad` | `muhammad-ibn-ali-ibn-abdullah` | 132–136 | 749–754 | B3; S p. 261, al-Saffah biography; M |
| 2 | al-Manṣūr (ʿAbd Allāh) | `abu-jafar-ibn-muhammad` | `muhammad-ibn-ali-ibn-abdullah` | 136–158 | 754–775 | B3; S p. 264, al-Mansur biography; M |
| 3 | al-Mahdī (Muḥammad) | `muhammad-ibn-abdullah-ibn-muhammad` | `abu-jafar-ibn-muhammad` | 158–169 | 775–785 | B3; S p. 278, al-Mahdi biography; N |
| 4 | al-Hādī (Mūsā) | `musa-ibn-muhammad` | `muhammad-ibn-abdullah-ibn-muhammad` | 169–170 | 785–786 | B3; S 286; N |
| 5 | al-Rashīd (Hārūn) | `harun-ibn-muhammad` | `muhammad-ibn-abdullah-ibn-muhammad` | 170–193 | 786–809 | B3; S pp. 290–291, al-Rashid biography; N |
| 6 | al-Amīn (Muḥammad) | `muhammad-ibn-harun` | `harun-ibn-muhammad` | 193–198 | 809–813 | B3; S p. 306, al-Amin biography; N |
| 7 | al-Maʾmūn (ʿAbd Allāh) | `abdullah-ibn-harun` | `harun-ibn-muhammad` | 198–218 | 813–833 | B3; S 318; see dating note; N |
| 8 | al-Muʿtaṣim (Muḥammad) | `muhammad-ibn-harun-ibn-muhammad` | `harun-ibn-muhammad` | 218–227 | 833–842 | B3; S 348; N |
| 9 | al-Wāthiq (Hārūn) | `harun-ibn-muhammad-ibn-harun` | `muhammad-ibn-harun-ibn-muhammad` | 227–232 | 842–847 | B3; S 354; N |
| 10 | al-Mutawakkil (Jaʿfar) | `jafar-ibn-muhammad` | `muhammad-ibn-harun-ibn-muhammad` | 232–247 | 847–861 | B3; S 360; N |
| 11 | al-Muntaṣir (Muḥammad) | `muhammad-ibn-jafar` | `jafar-ibn-muhammad` | 247–248 | 861–862 | B3; S pp. 372–373, al-Muntasir biography; N |
| 12 | al-Mustaʿīn (Aḥmad) | `ahmad-ibn-muhammad` | `muhammad-ibn-muhammad-ibn-harun` | 248–252 | 862–866 | TDV first paragraph and abdication paragraph; B3 year cross-check; N |
| 13 | al-Muʿtazz (Muḥammad) | `muhammad-ibn-jafar-ibn-muhammad` | `jafar-ibn-muhammad` | 252–255 | 866–869 | B3; S 374; N |
| 14 | al-Muhtadī (Muḥammad) | `muhammad-ibn-harun-ibn-muhammad-ibn-harun` | `harun-ibn-muhammad-ibn-harun` | 255–256 | 869–870 | B3; S 376; N |
| 15 | al-Muʿtamid (Aḥmad) | `ahmad-ibn-jafar` | `jafar-ibn-muhammad` | 256–279 | 870–892 | B3; S 380; N |
| 16 | al-Muʿtaḍid (Aḥmad) | `ahmad-ibn-talhah` | `talhah-ibn-jafar` | 279–289 | 892–902 | B3; S 385–386; N |
| 17 | al-Muktafī (ʿAlī) | `ali-ibn-ahmad` | `ahmad-ibn-talhah` | 289–295 | 902–908 | B3; S 393; N |
| 18 | al-Muqtadir (Jaʿfar) | `jafar-ibn-ahmad` | `ahmad-ibn-talhah` | 295–296; 296–317; 317–320 | 908–908; 908–929; 929–932 | B3; S 395–403; N |
| 19 | al-Qāhir (Muḥammad) | `muhammad-ibn-ahmad` | `ahmad-ibn-talhah` | 317–317; 320–322 | 929–929; 932–934 | B3; S 404–408; N |
| 20 | al-Rāḍī (Aḥmad) | `ahmad-ibn-jafar-ibn-ahmad` | `jafar-ibn-ahmad` | 322–329 | 934–940 | B3; S 408; TDV Râzî-Billâh (name variant below); N |
| 21 | al-Muttaqī (Ibrāhīm) | `ibrahim-ibn-jafar` | `jafar-ibn-ahmad` | 329–333 | 940–944 | B3; S 413; N |
| 22 | al-Mustakfī (ʿAbd Allāh) | `abdullah-ibn-ali` | `ali-ibn-ahmad` | 333–334 | 944–946 | B3; S 416; N |
| 23 | al-Muṭīʿ (al-Faḍl) | `fadl-ibn-jafar` | `jafar-ibn-ahmad` | 334–363 | 946–974 | B3; S p. 417, al-Muti biography; N |
| 24 | al-Ṭāʾiʿ (ʿAbd al-Karīm) | `abd-al-karim-ibn-fadl` | `fadl-ibn-jafar` | 363–381 | 974–991 | B3; S p. 425, al-Tai biography; N |
| 25 | al-Qādir (Aḥmad) | `ahmad-ibn-ishaq` | `ishaq-ibn-jafar` | 381–422 | 991–1031 | B3; S 431; N |
| 26 | al-Qāʾim (ʿAbd Allāh) | `abdullah-ibn-ahmad` | `ahmad-ibn-ishaq` | 422–467 | 1031–1075 | B3; S 437; N |
| 27 | al-Muqtadī (ʿAbd Allāh) | `abdullah-ibn-muhammad` | `muhammad-ibn-abdullah-ibn-ahmad` | 467–487 | 1075–1094 | B3; S 443–444; N |
| 28 | al-Mustaẓhir (Aḥmad) | `ahmad-ibn-abdullah` | `abdullah-ibn-muhammad` | 487–512 | 1094–1118 | B3; S 447; N |
| 29 | al-Mustarshid (al-Faḍl) | `fadl-ibn-ahmad` | `ahmad-ibn-abdullah` | 512–529 | 1118–1135 | B3; S 453; N |
| 30 | al-Rāshid (al-Manṣūr) | `mansur-ibn-fadl` | `fadl-ibn-ahmad` | 529–530 | 1135–1136 | B3; S p. 458, al-Rashid (later) biography; N |
| 31 | al-Muqtafī (Muḥammad) | `muhammad-ibn-ahmad-ibn-abdullah` | `ahmad-ibn-abdullah` | 530–555 | 1136–1160 | B3; S 459; N |
| 32 | al-Mustanjid (Yūsuf) | `yusuf-ibn-muhammad` | `muhammad-ibn-ahmad-ibn-abdullah` | 555–566 | 1160–1170 | B3; S 465; N |
| 33 | al-Mustaḍīʾ (al-Ḥasan) | `hasan-ibn-yusuf` | `yusuf-ibn-muhammad` | 566–575 | 1170–1180 | B3; S p. 468, al-Mustadi biography; TDV Nâsır-Lidînillâh for endpoint; N |
| 34 | al-Nāṣir (Aḥmad) | `ahmad-ibn-hasan` | `hasan-ibn-yusuf` | 575–622 | 1180–1225 | B3; S 472; TDV Nâsır-Lidînillâh for accession; N |
| 35 | al-Ẓāhir (Muḥammad) | `muhammad-ibn-ahmad-ibn-hasan` | `ahmad-ibn-hasan` | 622–623 | 1225–1226 | B3; S 484; N |
| 36 | al-Mustanṣir (al-Manṣūr) | `mansur-ibn-muhammad` | `muhammad-ibn-ahmad-ibn-hasan` | 623–640 | 1226–1242 | B3; S 486; N |
| 37 | al-Mustaʿṣim (ʿAbd Allāh) | `abdullah-ibn-mansur` | `mansur-ibn-muhammad` | 640–656 | 1242–1258 | B3; S p. 490, al-Mustasim biography; N |

### Required non-caliph connectors

| Canonical name | Proposed ID | Father ID | Evidence/action |
|---|---|---|---|
| Muḥammad ibn al-Muʿtaṣim | `muhammad-ibn-muhammad-ibn-harun` | `muhammad-ibn-harun-ibn-muhammad` | TDV, Müstaîn-Billâh, heading and first paragraph (see source discrepancy below); C; PENDING |
| Ṭalḥah al-Muwaffaq | `talhah-ibn-jafar` | `jafar-ibn-muhammad` | S pp. 385–386, al-Mutadid filiation explicitly names Talhah; C; PENDING |
| Isḥāq ibn al-Muqtadir | `ishaq-ibn-jafar` | `jafar-ibn-ahmad` | S p. 431, al-Qadir filiation; C; PENDING |
| Muḥammad ibn al-Qāʾim | `muhammad-ibn-abdullah-ibn-ahmad` | `abdullah-ibn-ahmad` | S pp. 443–444, al-Muqtadi filiation and father dying before grandfather; C; PENDING |

### Rival claimants — separate approval items

| Canonical name | Proposed ID | Father ID | AH tenure | CE tenure | Evidence/action |
|---|---|---|---|---|---|
| Ibrāhīm ibn al-Mahdī | `ibrahim-ibn-muhammad` | `muhammad-ibn-abdullah-ibn-muhammad` | 201–203 | 817–819 | B3 explicitly “in Baghdad”; S al-Mamun narrative, p. 318 onward; N, claimant; PENDING |
| ʿAbd Allāh ibn al-Muʿtazz | `abdullah-ibn-muhammad-ibn-jafar` | `muhammad-ibn-jafar-ibn-muhammad` | 296–296 | 908–908 | B3 “Ibn al-Mutazz … in Baghdad”; S pp. 395–403, al-Muqtadir narrative; N, claimant; PENDING |

Ibn al-Mutazz is the brief rival installed during the 296 AH coup, conventionally called the one-day caliph. Include the person and qualified claim; do not count him as a 38th undisputed regular Abbasid. Al-Muqtadir has **three** intervals, interrupted first by Ibn al-Mutazz and later by al-Qahir in 317 AH. Al-Qahir has two, with the brief first explicitly qualified as a coup tenure. Year-only dates intentionally cannot communicate duration; display “brief coup tenure” alongside them. Ibrahim's claim overlaps al-Mamun's reign; do not truncate al-Mamun to create artificial exclusive succession.

B3's HTML has “189/813” for al-Mamun: these are incompatible year labels and the AH digit is a transcription/printing anomaly. Proposed 198 AH follows S's al-Mamun accession narrative and TDV Me’mûn's paragraph about al-Amin's death and the succession; TDV independently confirms 198 AH / 813 CE. The mirror's anomalous AH numeral is not imported. Al-Mamun was proclaimed by supporters before the death of al-Amin; the ordinary interval starts at sole succession. B3's 575 AH / 1180 CE accession for al-Nasir is independently supported by TDV Nâsır-Lidînillâh's accession paragraph. Use **1180** as the year boundary for al-Mustadi/al-Nasir, without inventing day precision. S marginal CE labels sometimes label the start of the AH year rather than the event and must not be copied as event conversions. The siege/occupation interruption under al-Basasiri during al-Qaim's reign is not a separately recognized Abbasid successor in B3; retain the overall tenure with an interruption note, not a fabricated new reign endpoint.

## Abu Bakr identity: separate correction decision

S pp. 25–27 names Abu Bakr as Abdullah ibn Uthman; the opening genealogy and name discussion identify his Taym descent and Abu Quhafa. Its genealogy matches the existing Taym branch and supports the proposed identity equivalence between `abu-bakr` / `abdullah-ibn-uthman`, but the existing database carries no identity assertion between them. S p. 25 provides the complete Abdullah → Uthman → Amir → Amr → Kab → Sad → Taym sequence; the existing branch agrees with that sequence. **No merge is authorized.**

- Default pending approval: preserve both IDs and all facts; focus remains `abu-bakr`, visibly disconnected. Do not silently attach him beside the apparent duplicate.
- Recommended separate correction if approved: keep published `abu-bakr` as the canonical caliph ID and `abdullah-ibn-uthman` as a durable redirect/reference alias to it; retain both published identifiers in resolution. Move its existing father edge from `uthman-ibn-amir` to `abu-bakr`, and move its existing son edge to originate at `abu-bakr`. Combine existing display-name/alias facts only after user review. This changes identity/edges and requires explicit approval separate from new reign metadata. Do not delete a published identifier or add two canonical person nodes for one approved identity.
- A database lacking redirect support must defer this correction, not rename either ID. The new father assertion is supported by S pp. 25–27; the existing upstream Taym chain remains user-approved. Rewiring the son preserves the existing approved relationship under the proposed identity equivalence; it adds no independently researched child.

## Deterministic view membership specification

Freeze `E0` as the 99-person, 97-edge baseline in this proposal; descendant expansion below runs **only over E0**, not over future data. `desc0(x)` includes x and its existing descendants. `anc(x)` follows approved canonical father edges to a recorded root, including x; it never invents an edge. If the Abu Bakr correction is approved, normalize the frozen baseline IDs through its approved canonical-ID mapping before selection. For each view take the union described below, then its ancestor closure; render exactly existing/approved father edges with both endpoints in that set. No shared-ancestor descendant expansion is permitted. Explicit seeds are the stable IDs in the corresponding roster tables, including approved qualified claimant rows for Abbasid. Focus does not restrict membership.

| View | Focus ID | Caliph seeds | Existing context branches included before ancestor closure |
|---|---|---|---|
| Rashidun | `abu-bakr` | exactly the five Rashidun table IDs | `desc0(taym-ibn-murrah)`, `desc0(adi-ibn-kab)`, `desc0(affan-ibn-abu-al-as)`, `desc0(abu-talib-ibn-abd-al-muttalib)`, plus `muhammad-ibn-abdullah` |
| Umayyad | `muawiyah-ibn-sakhr` | exactly the 14 Umayyad table IDs | `desc0(umayyah-ibn-abd-shams)` |
| Abbasid | `abu-al-abbas-ibn-muhammad` | all 37 regular table IDs plus the two qualified rival IDs if approved | `desc0(abbas-ibn-abd-al-muttalib)` plus the four new connectors |

Rashidun thus retains Talhah's Taym collateral branch, Umar's son/grandson, Hasan's siblings and the Prophet context. It excludes the Makhzum and Zubayr branches and all other descendants of shared ancestors unless independently seeded above. Umayyad includes both Harb/Sakhr/Muawiyah and Abu al-As/Hakam/Marwan branches, with Uthman and his father as context. **Uthman receives only his Rashidun office**, even in the Umayyad view. Existing `muawiyah-ibn-hisham` and `abd-al-rahman-ibn-muawiyah` remain context; no Spanish ruler is granted a Damascus office and no new Cordoba caliphs/descendants are imported. Abd al-Rahman I was an emir, not a Cordoba caliph. Abbasid includes both first-caliph sibling branches through their existing father, and all collateral lines needed for al-Mustain, al-Mutadid, al-Qadir and al-Muqtadi. Exclude Cairo and post-1258 additions regardless of kinship.

Ancestor closure includes the current approved path up to `adnan` where present. Abu Bakr remains a second root until the separate identity correction is approved. Muhammad's existing prophet role is preserved wherever he is visible. Office is determined exclusively by approved tenure records, never by ancestry, view membership, title-like aliases or color.

## Approval choices and remaining verification

All 56 ordinary office holders (5 + 14 + 37), two qualified rival claimants, 35 missing regular Abbasid people, four connectors and their father edges are proposed for review. Adding both rivals yields **41 new people and 41 new father edges** before the independent Abu Bakr correction. There are **21 existing office holders** requiring new tenure/period metadata (5 + 14 + 2). Proposed caliphal titles in the identification column may be added as supported aliases/details labels; preserve existing display names, aliases, and honorifics. New rows propose the identification label as the display name, with its personal name recorded in the details; connectors use their canonical-name column. No additional birth/death dates or biographies are proposed. No other historical relatives are proposed.

Approval must record revision/date, accepted rows, rejected rows and chronology exceptions. No approval is inferred from this research request. Separate approval choices are: include both rival claimant rows with qualified badges; accept the independently evidenced al-Mustain connector despite S's conflicting genealogy; approve the collision-safe four-generation ID extension; and accept or defer the independent Abu Bakr identity correction. Parent review resolved the previously flagged al-Nasir and Ibrāhīm/Marwān II year boundaries using TDV, and corrected the al-Mahdi page locator. Remaining evidence limitations are the unofficial B transcription and S's occasional errors; no unverified exact dates or unreadable image annotations are proposed. No exact day/month dates are proposed. This is a complete roster proposal at year precision, with the stated chronology/source-fidelity gaps; it is not an approved dataset.

### Verified source disagreement: al-Mustain's father

Jarrett/S p. 373 calls al-Mustain a son of al-Mutasim and brother of al-Mutawakkil. That does **not** support the proposed connector; it is contradicted by B3's Ahmad ibn Muhammad and the scholarly [TDV entry by Abdülkerim Özaydın, “Müstaîn-Billâh,” vol. 32 (2006), pp. 447–448](https://islamansiklopedisi.org.tr/mustain-billah). Its heading gives Ahmad ibn Muhammad ibn Muhammad al-Mutasim; its opening paragraph explicitly identifies his father Muhammad as al-Mutasim's son. This is the evidence for **both** new father edges through the connector. The downloaded HTML was converted with MarkItDown before reading. TDV supplies explicit accession and abdication dates that support the proposed **248–252 AH / 862–866 CE** year intervals; this proposal intentionally retains year precision. Death in Shawwal 252 is not treated as a separate reign endpoint. This illustrates why S cannot be mechanically accepted for every filiation.

### Supplementary source checks

These are scholarly secondary entries used to check particular errors or ambiguities in S/B, not substitutes for the primary compilation across the whole roster. Each locator is the named article's heading or the specified event paragraph; consulted 2026-10-30.

- [Angelika Hartmann, “Nâsır-Lidînillâh,” TDV (2006)](https://islamansiklopedisi.org.tr/nasir-lidinillah), first paragraph: accession following his father's death in 575 AH / 1180 CE. Supports the al-Mustadi endpoint and al-Nasir start.
- [İbrahim Sarıçam, “İbrâhim b. Velîd,” TDV (2000)](https://islamansiklopedisi.org.tr/ibrahim-b-velid), accession and Aynülcer battle paragraphs; [Hasan Kurt, “Mervân II,” TDV (2004)](https://islamansiklopedisi.org.tr/mervan-ii), proclamation paragraph: Ibrāhīm succeeds in 126 AH / 744 CE, then Marwān is proclaimed in 127 AH / 744 CE. These are not mutually inconsistent year labels.
- [Nahide Bozkurt, “Me’mûn,” TDV (2004)](https://islamansiklopedisi.org.tr/memun), paragraph on al-Amin's death: supports 198 AH / 813 CE for sole succession.
- [Mehmet Ali Kapar, “Muâviye b. Yezîd,” TDV (2020)](https://islamansiklopedisi.org.tr/muaviye-b-yezid), heading and accession/death paragraphs: supports 64 AH / 683–684 CE and the short tenure. No broad theological judgment or disputed-legitimacy designation is inferred from its duration.
- [Abdülkerim Özaydın, “Râzî-Billâh,” TDV (2007)](https://islamansiklopedisi.org.tr/razi-billah), heading: **Ahmad (Muhammad)**, son of Jaʿfar al-Muqtadir. B3 uses Ahmad; S p. 408 uses Muhammad. Propose Ahmad as the canonical personal name and Muhammad as an explicitly sourced name variant, not a second person. Parentage is consistent.

The al-Mustain disagreement was checked against the actual image of S printed p. 373 (PDF page 403), confirming that the incorrect shortened filiation is present in print, rather than merely introduced by OCR. S page locators were checked against the PDF's printed page numbers; its printed p. 1 is PDF page 31. The Abbasid table's year intervals remain a scholarly-chronology synthesis, not a claim that S and B agree on every exact date.

### Validation record

Research-only validation: reconciled the baseline JSON Markdown against all 5 Rashidun and 14 Umayyad IDs; enumerated 37 conventional Abbasids plus 2 rivals; checked every proposed parent resolves through a caliph or one of the 4 connectors; checked proposed ID collisions against the baseline and new roster. One four-generation ID extension is explicitly pending approval. Reviewed Markdown tables and relative project scope. The research agent did not run software checks; parent validation and review results are recorded in the implementation handoff. Historical verification is limited by the source disagreements and image/OCR cautions above; this proposal must not be described as fully verified or approved before those decisions are reviewed.
