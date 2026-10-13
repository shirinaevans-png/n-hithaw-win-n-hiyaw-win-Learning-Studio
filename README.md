# nîhithawîwin | nêhiyawêwin Learning Studio

**IED 501: Linguistics for Language Revitalization**  
**Final Project**

An interactive learning resource for exploring Woodland Cree (TH dialect) and Plains Cree (Y dialect) using vocabulary, a Woodland syllabics character chart, flashcards, multiple-choice quizzes, matching activities, and locally saved learning progress.

## Publish on GitHub Pages

1. Create a **public** repository at https://github.com/new, for example `cree-language-learning`.
2. Upload **all extracted files**, including `index.html`, `style.css`, `app.js`, **`data.js`**, and `README.md` to the repository root. Keep the `data` folder too, as an editable copy of the vocabulary database.
3. In **Settings → Pages**, choose **Deploy from a branch**, set **main** and **/(root)**, and save.
4. Wait for GitHub Pages to publish, then visit `https://YOUR-USERNAME.github.io/cree-language-learning/`.

To update a live site, overwrite the existing `index.html`, `style.css`, `app.js`, **`data.js`**, and `data/words.json`, then commit the changes. Changes can take a few minutes to appear.

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

The vocabulary list can be expanded in `data/words.json` once additions have been checked for linguistic accuracy and permission to republish. After editing JSON, also regenerate `data.js` (or ask for an updated package), since `data.js` contains the vocabulary loaded by the site. Use the same fields as the existing entries: `id`, `cre`, `en`, `category`, `dialect`, `source`, `grammar`, `syllabics`, `syllabics_status`.

All progress is stored in browser localStorage, not transmitted to a server. Progress is lost if browser storage is cleared.

## Local preview

Double-click `index.html` to open it directly in a browser. No local server is needed. The vocabulary lives in the bundled `data.js` file. To publish on GitHub Pages, upload all extracted website files to the repository root.

**Important:** If the site still shows an older error after updating GitHub Pages, wait for deployment and hard-refresh the webpage with Ctrl+Shift+R.


## Morphology / word-formation addition
Open `linguistics.html` through the Morphology & word builder link on the homepage. Includes verb-class recognition (VAI/VII/VTI/VTA), segmented attested `wîki` forms, a simple word-building activity, and conjugation practice. Example forms are attributed to Solomon Ratt, *Beginning Woods Cree* (2026), printed pp. 4–5, 13, and 15. This introductory module is not a complete morphophonological analyzer or generative conjugator.


## VTA direct/inverse lab: both dialects
Open `vta.html` from the navigation links on the home page or linguistics page. `vta.js` includes separate Woodland (TH) and Plains (Y) curated form data, tables, an interactive morpheme-based builder, and a relation quiz. This is an introductory VTA module rather than a full automatic conjugator. Both sets display source references. The Plains rule examples were taken from the earlier user-provided grammar workbook; Woodland examples are cited to Solomon Ratt’s Beginning Woods Cree, Chapter 8.

Files: `vta.html`, `vta.css`, and `vta.js` must all be uploaded alongside the rest of the project.
