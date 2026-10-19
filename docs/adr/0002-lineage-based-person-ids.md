# Person ids are built from name and father, and never change

Each person's id is `<name>-ibn-<father's name>`, for example `hashim-ibn-abd-manaf`. Both parts are lowercase ASCII with diacritics removed and a leading "al-" dropped (`malik-ibn-nadr`, `abbas-ibn-abd-al-muttalib`); the father's part uses his short name. The root of a lineage, which has no father in the data, keeps a bare id (`adnan`). Bare names were rejected because they collide as the data grows (many Muḥammads, several Māliks and Kaʿbs), and numeric ids were rejected because readable ids make the data easy to edit and the shareable links meaningful.

Once an id is published it is never changed, even if a name's spelling or a lineage is later corrected: links and references depend on it. If two people would get the same id, extend it with the grandfather's name (`<name>-ibn-<father>-ibn-<grandfather>`).
