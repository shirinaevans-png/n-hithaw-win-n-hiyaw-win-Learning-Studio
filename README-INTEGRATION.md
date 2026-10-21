# Cree Learning Studio: research add-on

This is a safe, non-destructive addition, **not the complete GitHub site**.

## Files
- `research-dictionary.html`: searchable page with 43 curated Woods Cree source entries.
- `research-dictionary.js`: the selected entries with source attribution.
- `research-dictionary.json` and `.csv`: structured vocabulary data for future deduplication and integration.
- `linguistic-models.json`: research-informed data schema and constraints, **not** a tested conjugator.
- `research-sources.csv`: source index.

## Safe deployment
1. Unzip your current repository to a working folder and back it up.
2. Copy these files into the *root* of that folder, not into an empty GitHub repository.
3. To expose the page in the existing navigation, add a link to `research-dictionary.html` in `index.html` or your resources page.
4. Merge entries with the existing dictionary only after inspecting the actual dictionary schema and deduplicating by lemma, dialect and part of speech.
5. Do **not** replace `data.js`, `builder-data.js`, `conjugation-data.js`, or existing pages with these new files.
6. Validate Woods Cree forms with speakers/community resources before enabling generated forms.

### Copyright and source limits
Only a curated subset of selected words is included, with bibliographic attribution and source pages. This package does not reproduce Ratt's full text or glossary. The models summarize grammatical categories and must not be presented as fully verified paradigms.

### To produce a complete ZIP
Supply the full latest repository ZIP or connect GitHub. Then the original files can be reviewed and this add-on merged directly with tests for existing site functionality.
