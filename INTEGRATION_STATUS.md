# Linguistic engine status

The Word Builder and Sentence Studio check against locally stored headwords and recorded forms; they do not certify sentence grammaticality.

GiellaLT `lang-crk` is referenced as a Plains Cree morphological technology resource, but its generator is **not** embedded in this site. Its language sources require an HFST/Foma/XFST toolchain and a deployed execution runtime. GitHub Pages serves static assets and does not run an HFST server. Before any integration, review the repository LICENSE; build or obtain a validated generator; map its morphological tags to the UI; test with speakers and published paradigms; and implement a static browser runtime or deploy a secured backend.

Do not use Plains Cree generator rules as Woodland Cree (TH) paradigms. Full grammatical sentence validation additionally requires a tested syntactic grammar and context-sensitive analysis.

Changes in this package: expanded individual-word morphology reports in Sentence Studio, dialect filtering of dictionary verb entries on the Conjugation page, and preserved 5,816 dictionary entries.
