/* Cree Learning Studio: experimental, auditable rule engine.
   NOT a comprehensive or linguistically validated Cree transducer.
   Derives templates from the site's documented conjugation records;
   never labels an analogy as an attested form. */
(function(root){'use strict';
  const normalize = x => String(x == null ? '' : x).trim().normalize('NFC');
  const compact = x => normalize(x).toLocaleLowerCase();
  const supportedClasses = ['VAI','VII','VTI','VTA'];
  const personOf = r => normalize(r.person).replace(/^(Direct|Inverse \/ local|Inverse|local|Person agreement|Possession|Imperative):\s*/i, '').replace(/\s*plural$/i,'P');
  function sourceRecords(){ return Array.isArray(root.CREE_CONJUGATION_RECORDS) ? root.CREE_CONJUGATION_RECORDS : []; }
  function classOf(r){let s=normalize(r.gramClass);return supportedClasses.find(c=>s.startsWith(c)) || s;}
  function sourceModels(records=sourceRecords()){
    const map=new Map();
    for(const r of records){
      if(!r || !r.dialect || !r.stem || !r.output || !r.segmentationValid) continue;
      const klass=classOf(r); if(!supportedClasses.includes(klass))continue;
      const key=[r.dialect,klass,r.stem].join('|');
      if(!map.has(key))map.set(key,{key,dialect:r.dialect,gramClass:klass,stem:r.stem,records:[]});
      map.get(key).records.push(r);
    }
    return Array.from(map.values()).sort((a,b)=>a.key.localeCompare(b.key));
  }
  function catalog(dialect,klass){return sourceModels().filter(x=>x.dialect===dialect&&x.gramClass===klass);}
  function compose(prefix, stem, suffix){return normalize(prefix)+normalize(stem)+normalize(suffix);}
  function generate({dialect,gramClass,stem,modelStem,person}){
    dialect=normalize(dialect);gramClass=normalize(gramClass);stem=normalize(stem);modelStem=normalize(modelStem);person=normalize(person);
    if(!supportedClasses.includes(gramClass))return {status:'unsupported',reason:'Unsupported verb class.'};
    if(!['woodland','plains'].includes(dialect))return {status:'unsupported',reason:'Select a named dialect.'};
    if(!stem)return {status:'unsupported',reason:'Provide an explicitly identified verb stem, not an unanalysed dictionary headword.'};
    const matching=sourceRecords().filter(r=>r.dialect===dialect&&classOf(r)===gramClass&&compact(r.stem)===compact(stem)&&personOf(r)===person);
    if(matching.length){return {status:'attested',form:matching[0].output,parts:{prefix:matching[0].prefix,stem:matching[0].stem,suffix:matching[0].suffix},source:matching[0].source||'',alternatives:matching.map(x=>x.output),reason:'Exact recorded form for the selected dialect, stem, class and relationship.'};}
    const models=catalog(dialect,gramClass), model=models.find(m=>compact(m.stem)===compact(modelStem));
    if(!model)return {status:'unsupported',reason:'Choose a documented model from the same dialect and grammatical class.'};
    const rows=model.records.filter(r=>personOf(r)===person);
    if(!rows.length)return {status:'unsupported',reason:'This model has no recorded pattern for that person/relationship. No form generated.'};
    const example=rows[0];
    if(!example.segmentationValid || compact(compose(example.prefix,example.stem,example.suffix))!==compact(example.output))return {status:'unsupported',reason:'The model segmentation does not reconstruct the source spelling. No analogy generated.'};
    if(compact(stem)===compact(model.stem))return {status:'attested',form:example.output,parts:{prefix:example.prefix,stem:example.stem,suffix:example.suffix},source:example.source||'',reason:'Recorded source form.'};
    return {status:'hypothesis',form:compose(example.prefix,stem,example.suffix),parts:{prefix:example.prefix,stem,suffix:example.suffix},source:example.source||'',model:example.stem,reason:'Mechanical prefix + stem + suffix analogy ONLY. The engine has not established stem subclass, allomorphy, phonological alternation, order, tense or dialect validity. Do not teach this as a correct Cree form without speaker or grammatical verification.'};
  }
  root.CREE_RULE_ENGINE=Object.freeze({sourceModels,catalog,generate,personOf});
})(window);
