# Cree Learning Studio — Plains Cree HFST service

This separate Docker service runs the **actual** GiellaLT Plains Cree finite-state generator, using `crk-strict-generator.hfstol` from the `fst-v2021.7.8` release.

## Included
- `server.py`: minimal HTTP API; `GET /health` and `POST /generate`
- `model/crk-strict-generator.hfstol`: GiellaLT binary generator
- `model/crk-strict-analyzer.hfstol`: reference analyzer (not yet exposed as endpoint)
- `Dockerfile`: builds the service with HFST and includes the model files
- `render.yaml`: Render service configuration
- `GIELLALT_LICENSE.txt`: upstream license notice (AGPLv3 with additional terms and underlying lexicon restrictions)
- `GIELLALT_RELEASE_README.md`: upstream release documentation

## On Render
Keep the website on GitHub Pages. Host this Docker service on Render. If files are in `service/`, set **Root Directory** to `service`; otherwise keep it blank. Verify Dockerfile path and build context against where files actually live. Configure health check `/health`. Once deployed, inspect `https://YOUR-SERVICE.onrender.com/health` and confirm `ready: true`. Update the website's `giellalt-config.js` only after that confirmation.

## IMPORTANT
This is a **2021 experimental Plains Cree** model. Test sample analyses and inflections before public use. The API accepts GiellaLT lexical analyses (e.g. lemma plus morphological tags), not English person selections; do not claim it conjugates all vocabulary until tag mappings are added and tested. It does not check sentence syntax and is not a Woodland Cree generator. Review AGPLv3 obligations and original lexicon copyright restrictions before deploying a public derivative service. No model output has been linguistically validated in this package.
