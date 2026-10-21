# Cree morphology source integration: research draft (20 October 2026)

**Scope.** This research pack does not modify a GitHub repository. It creates source-linked dictionary candidates and an explicit feature schema for later integration. No automatically generated inflections are represented as verified. The supplied sources contain copyright-protected material; the candidate dictionary is a selective index, not a republication.

## Uploaded sources reviewed and how they contribute

| Source | Core material | Integration |
|---|---|---|
| Kang (2017), *Morphological Variation in Cree Inflection* (uploaded twice) | Western Cree conjunct third-plural and obviative morphemes, morphological dissimilation | Dialect-specific conjunct paradigms and competing suffix restrictions |
| Snoek et al. (2014), *Modeling the Noun Morphology of Plains Cree* | Finite-state nouns; animate/inanimate, possession, diminutives, locative, plural and phonological alternations | Nominal analyzer feature template; Y only until TH checked |
| Volchok (2019), *A Synthesis of Obviation in Algonquian Languages* | Obviation in NPs, single/multiple clauses and discourse | Referential participant state machine |
| Starks (1994), *Planned vs. Unplanned Discourse* | Differences between Woods Cree storytelling and conversation | Genre-aware sentence examples and order selection |
| Starks (1987), *Negation* | Woods Cree assertion/presupposition effects on negative selection | Negator/context model, not a single negative prefix |
| Starks (1992), *Aspects of Woods Cree Syntax* (449 pages) | TH grammar: stem classes, orders, clause types, tense, negation, obviation | Main TH linguistic architecture. Needs systematic paradigm review |
| Dahlstrom (1991), *Plains Cree Morphosyntax* (218 PDF pages) | Y paradigms; direct/inverse, passive, obviation and lexical processes | Main Y linguistic architecture. Do not import wholesale into TH |
| Goddard (1994), *The West-to-East Cline* | Historical comparative phonology | Dialect provenance, historical form tags; no automatic modern vocabulary entries |
| Pentland (1974), *Diminutive Consonant Symbolism* | Diminutive consonant substitutions | Morphophonological exception table, language-specific |
| Mackenzie (1992), *Negative Markers in East Cree and Montagnais* | Cross-dialect negative particle distribution | Comparative constraints; no East Cree vocabulary automatically added |
| Pentland (2003), *The Missinipi Dialect of Cree* | Historical northwestern r-dialect; linguistic comparison around Lac la Ronge | Historical/comparative layer only, not third active website dialect |
| Cote, Ratt & Klokeid (1987), *Conditional Sentences in Cree and Saulteaux* | Realis, irrealis, counterfactual, generic conditionals | Conditional clause builder with source-specific language labels |
| Ratt (2014), *Woods Cree Stories*: introduction, table of contents, four Roman script story excerpts, syllabic excerpt, glossary | Attested Woods Cree vocabulary and written contexts | Curated TH entries and example references; observe rights |

## Implementation design

1. Store lexical entries with stable IDs, dialect, locality, category, gloss, citation and confidence.
2. Distinguish lemmas/stems from fully inflected surface forms. Do not treat the dash around a dictionary stem as an actual letter.
3. Distinguish animate/inanimate noun types and dependent nouns; do not guess independent possessive forms for dependent kinship nouns.
4. Model VAI/VII/VTI/VTA separately. A transitive animate form requires both actor and goal, including person, plurality and obviation.
5. Store order and derivation as orthogonal feature values: independent, conjunct, imperative, delayed imperative, subjunctive; preverbs; tense/aspect; diminutive/reduplication.
6. Track current discourse proximate(s) and obviatives, not just suffix choice in isolated sentences.
7. Separate grammatical constraints from paradigms and from morphophonological rewrite rules.
8. Disable unsupported outputs instead of inventing a TH word from Y; display reason and citation.
9. Link sentences and context to source excerpt/page IDs; allow human corrections and audit history.
10. Keep Swampy, Moose, Missinipi, East Cree and other varieties in research-only metadata, not in public dialect buttons.

## Curated dictionary entry set

`dictionary_candidates.csv` has **43** selected Woods Cree glossary entries with part of speech and printed page numbers 98–100, from Ratt's book. These are source-attested entries, not proof of Lac La Ronge-specific acceptance. A community or linguist review is needed before publishing as authoritative Lac La Ronge forms. Some words may already exist in your live dictionary; deduplicate by dialect + lemma + POS, retaining gloss variants and citation.

## Known cautions

- Starks's South Indian Lake Woods Cree and Ratt's Woods Cree should retain their individual provenance instead of being silently equated with all Lac La Ronge TH.
- The scholarly interpretation of specific agreement/obviation morphemes is not identical in all publications. Record alternative analyses without producing unsupported forms.
- Historic Missinipi r-dialect evidence is not a modern dialect to add to active site buttons.
- The scans of Starks's dissertation contain OCR errors; verify paradigm tables visually before extracting paradigms.
- Published pages, illustrations and full narrative text have rights restrictions. Avoid bulk copying of the book to a public GitHub repository without permission.

## Needed next for an actual GitHub update

Upload the current repository ZIP (or dictionary JSON/JS and relevant HTML files). Then map these candidates into the actual site structure, check duplicates, add citation links, test search and filter behavior, and package an updated deployable ZIP.
