# Verified sentence checking – initial implementation

- The sentence pattern checker matches **complete attested strings**, not individual words in arbitrary combinations.
- One documented Plains Cree interrogative from Athanasopoulou, Goddard & Flynn (2025), p 95, example 2(a), has been added as an initial regression-tested example: `kinisitohtawin cî` (do you understand me?).
- The old dictionary and recorded-form checks are preserved. An unmatched sentence is **not marked incorrect**.
- Form records are source-labelled; their source accuracy and inflectional classifications require independent linguistic review.
- Full syntactic verification is not implemented. A broader set of attested clauses and contextual rules must be compiled and reviewed before adding new 'verified' patterns.
- The GiellaLT Plains Cree FST is NOT embedded or connected. The public repository documents HFST/Foma/XFST build dependencies and nightly downloadable test FSTs, which are not quality-certified. See https://github.com/giellalt/lang-crk . Integrating a compiler-produced finite-state generator requires a supported browser/WASM runtime or server and morphological tag mapping.
- Woodland Cree is not passed through Plains Cree morphological rules.
