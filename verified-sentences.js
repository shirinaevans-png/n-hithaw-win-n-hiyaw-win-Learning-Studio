/* Sentence Studio expanded practice library.
   The first ten examples are transcribed from the site's existing cited collection.
   Additional entries are drawn only from the site's stored, source-labelled
   conjugation records. A recorded form is NOT automatically an attested
   multiword sentence or a test of sentence-level grammaticality.
   Woodland (TH) and Plains (Y) are kept distinct.
*/
(function () {
  'use strict';
  const base = [
    ['kinisitohtawin cî','plains','interrogative clause','Do you understand me?','Athanasopoulou, Goddard & Flynn (2025), p 95, ex (2a)','A documented question with cî.'],
    ['mîna iskwêw','plains','phrase','and a woman','Athanasopoulou, Goddard & Flynn (2025), p 95, ex (2b)','Documented phrase; not a complete sentence.'],
    ['ê-itwêyit','plains','inflected verb clause','She/he (obviative) said','Athanasopoulou, Goddard & Flynn (2025), p 95, ex (2c)','An attested inflected predicate.'],
    ['iskwêw ana','plains','noun phrase','that woman','Athanasopoulou, Goddard & Flynn (2025), p 96, ex (4a)','Demonstrative noun phrase, not an independent complete clause.'],
    ['awa mistik','plains','noun phrase','this tree','Athanasopoulou, Goddard & Flynn (2025), p 96, ex (4b)','Demonstrative noun phrase, not an independent complete clause.'],
    ['iyinico-aspapiwinisa ohci','plains','phrase','with a saddle','Athanasopoulou, Goddard & Flynn (2025), p 96, ex (4c)','Attested phrase, not a complete clause.'],
    ['mâyâtisiw','plains','inflected verb clause','She is ugly','Athanasopoulou, Goddard & Flynn (2025), p 97, ex (6a)','Attested independent verb form.'],
    ['apwêsiyiwa','plains','inflected verb clause','She/he (the other) sweats','Athanasopoulou, Goddard & Flynn (2025), p 97, ex (6b)','Attested obviative verb form.'],
    ['nâpêwak','plains','noun phrase','men','Athanasopoulou, Goddard & Flynn (2025), p 98, ex (7b)','Attested noun form; not a complete sentence.'],
    ['kinosêwak','plains','noun phrase','fish (plural)','Athanasopoulou, Goddard & Flynn (2025), p 98, ex (7c)','Attested plural noun form; not a complete sentence.']
  ];
  const library = base.map(([text,dialect,type,translation,source,explanation]) => ({text,dialect,type,translation,source,explanation}));
  const seen = new Set(library.map(e => e.dialect + '|' + e.text.toLowerCase()));
  const recorded = Array.isArray(window.CREE_CONJUGATION_RECORDS) ? window.CREE_CONJUGATION_RECORDS : [];
  recorded.forEach(r => {
    const dialect = String(r.dialect || '').toLowerCase();
    const text = String(r.output || '').trim();
    if (!['plains','woodland'].includes(dialect) || !text || !r.source || !r.gloss) return;
    const key = dialect + '|' + text.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    const isVerb = /^V(AI|II|TI|TA)/i.test(String(r.gramClass || ''));
    library.push({
      text,
      dialect,
      type: (isVerb ? 'recorded inflected-verb practice' : 'recorded word-form practice'),
      translation: String(r.gloss),
      source: String(r.source),
      explanation: 'Recorded ' + String(r.gramClass || 'form') + (r.person ? ' (' + r.person + ')' : '') + '. This is practice with a cited form; it does not demonstrate that arbitrary combinations form grammatical sentences.'
    });
  });
  window.CREE_VERIFIED_SENTENCES = library;
})();
