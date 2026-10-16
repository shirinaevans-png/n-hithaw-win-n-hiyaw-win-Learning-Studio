# Cree Learning Studio — GiellaLT Plains Cree service

This service calls a **compiled GiellaLT Plains Cree HFST generator**. It does not create forms without an installed model. The accompanying GitHub Pages site connects via an HTTPS endpoint configured in `giellalt-config.js`.

## Model prerequisite — required before deployment can generate forms

Get a licensed **generator** (`.hfstol`, not `.zhfst` speller and not analyzer) built from the GitHub [giellalt/lang-crk](https://github.com/giellalt/lang-crk) sources. Verify the generator's lookup-side tags and filenames using the GiellaLT docs and inspect its LICENSE. GiellaLT warns that nightly builds are not linguistically quality-tested. The binary model is NOT included here.

Place your generator at `service/model/generator-gt-norm.hfstol` (create `model` as required) and add this Dockerfile instruction after `COPY server.py` and before `USER cree`:

    COPY model/generator-gt-norm.hfstol /app/model/generator-gt-norm.hfstol

Alternatively use a trusted build pipeline that retrieves and verifies that exact model, but do not use a guessed download URL or a speller binary. Without this step the health endpoint responds `ready:false`, and generation responds HTTP 503.

## Deploy on Render

1. Create a new GitHub repository for the SERVICE ONLY; upload this folder's contents (including `render.yaml`, `Dockerfile` and `server.py`). Do not put the Python service inside the public Pages repository expecting it to run.
2. Visit https://dashboard.render.com/ and select **New → Blueprint**, then connect that service repository, review cost/plan and approve the deployment.
3. Visit `https://<your-service>.onrender.com/health`. It must show `"ready": true` with the model in place before enabling generation.
4. In your website repository, edit `giellalt-config.js` so `endpoint` is the service's HTTPS root, e.g. `https://<your-service>.onrender.com`.
5. Test a documented Plains Cree lexical analysis string (lemma+tags), validate the output with cited paradigms and Cree language expertise, then publish the website update.

### Important limitations

- The service expects correctly formatted **GiellaLT lexical analysis and tags**, not arbitrary English grammar labels.
- A generator validates/generates **word forms**, not whole-sentence syntax.
- Woodland Cree (TH) and Lac La Ronge-specific forms MUST NOT be sent to this Plains Cree generator.
- This publicly accessible service has basic input and payload limits but not production-grade rate limiting. Deploy behind appropriate traffic controls, review hosting costs and logs, and ensure CORS only permits your site.
- If the chosen model's license requires attribution or source distribution, satisfy those terms before publication.
