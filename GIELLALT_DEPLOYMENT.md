# GiellaLT Plains Cree generator — deployment

The *website side* is wired to a real HFST-backed generator API, but **no compiled GiellaLT model or server is included or deployed**. It will not generate new forms until these prerequisites are supplied. GitHub Pages cannot execute Python or the HFST command line.

1. Obtain/compile the Plains Cree (`lang-crk`) **generator** from https://github.com/giellalt/lang-crk using GiellaLT's documented HFST toolchain. Follow the source's LICENSE terms, and review the model's quality warning. Do not substitute the analyser for the generator.
2. On a separate Linux server, install `hfst-lookup` and deploy `giellalt-service.py` behind an HTTPS reverse proxy with abuse protection/rate limits. Example local invocation:

   `CRK_GENERATOR=/absolute/path/generator-gt-desc.hfstol CREE_SITE_ORIGIN=https://shirinaevans-png.github.io python3 giellalt-service.py`

   `GET /health` reports `ready:true` only when its generator file exists; `POST /generate` accepts JSON `{ "dialect": "plains", "analysis": "lemma+valid+GiellaLT+tags" }`.
3. Set `window.CREE_GIELLALT_CONFIG.endpoint` in `giellalt-config.js` to the HTTPS URL of the hosted service. Publish updated files in the existing GitHub Pages repo.
4. Verify person, order, direct/inverse, and verb class against the GitHub project's documented tags, then test outputs against primary Cree grammar references and speakers. Not all lexical headwords in the site's own dictionary will necessarily be recognized by GiellaLT.

No Woodland Cree (TH) or Lac La Ronge form is sent to the Plains Cree model. The separate Sentence Studio does not have complete sentence grammar validation. This integration does **not** make an unverified output a linguistically verified one.
