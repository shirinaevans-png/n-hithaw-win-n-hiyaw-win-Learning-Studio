# nîhithawîwin | nêhiyawêwin Learning Studio

**IED 501: Linguistics for Language Revitalization**  
**Final Project**

An interactive learning resource for exploring Woodland Cree (TH dialect) and Plains Cree (Y dialect) using vocabulary, a Woodland syllabics character chart, flashcards, multiple-choice quizzes, matching activities, and locally saved learning progress.

## Publish on GitHub Pages

1. Create a **public** repository at https://github.com/new, for example `cree-language-learning`.
2. Upload **all files and the `data` folder** from this unzipped package to the repository root, keeping `data/words.json` inside `data`.
3. In **Settings → Pages**, choose **Deploy from a branch**, set **main** and **/(root)**, and save.
4. Wait for GitHub Pages to publish, then visit `https://YOUR-USERNAME.github.io/cree-language-learning/`.

To update a live site, overwrite the existing `index.html`, `style.css`, `app.js`, and `data/words.json`, then commit the changes. Changes can take a few minutes to appear.

## Included functionality

- Separate Woodland Cree and Plains Cree vocabulary displays
- Search and filter by topic
- Interactive Unicode Woodland Cree syllabics chart
- Flip flashcards and track practised words
- Randomized multiple-choice quizzes with saved best score
- Matching game with saved completed-round count
- Mobile and keyboard-friendly design
- Runs on static GitHub Pages, without accounts or a database

## Content scope and source integrity

This is a publishable **working first edition**, not a reproduction of the complete research spreadsheet. The spreadsheet contains source-derived material that was flagged for permission review. Therefore this public package contains a selective group of basic study entries, not the entire 1,905-entry database, the textbook's illustrated pages, the exercises, or the full textbook vocabulary index.

Selected Woodland entries are documented to Solomon Ratt, *mâci-nîhithawîwin: Beginning Woods Cree* (2026), with page references shown where available. The Plains Cree words are a preliminary commonplace teaching selection requiring review against the community's preferred Y-dialect materials. The Woodland syllabics chart is based on https://www.creedictionary.com/syllabics/woodland.php . It shows characters, not word-level transliterations. No speaker audio is bundled.

The vocabulary list can be expanded in `data/words.json` once additions have been checked for linguistic accuracy and permission to republish. Use the same fields as the existing entries: `id`, `cre`, `en`, `category`, `dialect`, `source`, `grammar`, `syllabics`, `syllabics_status`.

All progress is stored in browser localStorage, not transmitted to a server. Progress is lost if browser storage is cleared.

## Local preview

Because the app loads JSON with `fetch()`, double-clicking `index.html` directly may fail in some browsers. In a terminal opened in the project folder, run `python -m http.server 8000` then open http://localhost:8000/ . GitHub Pages needs no special configuration.
