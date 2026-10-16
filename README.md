# Cree Learning Studio: Rule laboratory add-on

This is an additive prototype, not a complete Cree morphological transducer. It DOES NOT incorporate or depend on Gramble.

## Installation
Upload the three files here into the ROOT of the existing GitHub Pages repository, alongside `conjugation-data.js`. Do not replace any existing site files. Visit `https://shirinaevans-png.github.io/n-hithaw-win-n-hiyaw-win-Learning-Studio/rule-lab.html`.

To add it to the main navigation, insert a link to `rule-lab.html` in your existing HTML menu.

## What it does
- Reads the EXISTING `window.CREE_CONJUGATION_RECORDS` array.
- Keeps dialect and grammatical class separate.
- Displays recorded forms exactly where the source database contains the requested stem/person pairing.
- Provides prefix-stem-suffix analogy for a new entered stem using an explicitly selected documented model.
- Marks analogies UNVERIFIED and refuses unsupported relationships rather than silently inventing forms.
- Shows morpheme segmentation and the model reference.

## What it does NOT do
It does not infer conjugation class membership from spelling, solve Cree allomorphy, distinguish all orders/tenses, generate a certified full VTA paradigm, or claim that a grammatical analogy is valid. The existing 64-record database is too small to justify those claims.

## Next engineering phase
Build separate speaker-validated dialect/verb-class rule packs with explicit stem subclasses, input lexeme IDs, person/number, order, tense, direct/inverse, obviation, and regression tests against independently documented paradigms. Only after this should novel forms be labeled validated.
