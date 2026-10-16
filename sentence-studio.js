"use strict";
(()=>{
 const $=id=>document.getElementById(id);
 const vocabulary=(window.IED501_LEARNING_DATA?.words||window.IED501_LEARNING_DATA?.vocabulary||[]).map((r,i)=>({id:i,word:String(r.cre||r.cree_sro||r.cree||''),meaning:String(r.en||r.english||''),grammar:String(r.grammar||''),dialect:String(r.dialect||''),source:String(r.source_pages||r.source||'')})).filter(r=>r.word);
 const models=window.CREE_BUILDER_DATA||{};
 const forms=[...Object.entries(models).flatMap(([dialect,arr])=>(arr||[]).filter(x=>x[6]).map(x=>({dialect,word:x[6],meaning:x[7]||'',grammar:x[0]||'',source:x[8]||''}))),...(window.CREE_CONJUGATION_RECORDS||[]).filter(r=>r.output).map(r=>({dialect:r.dialect,word:r.output,meaning:r.gloss||'',grammar:r.gramClass||'',source:r.source||'',person:r.person||''}))];
 const conjugations=(window.CREE_CONJUGATION_RECORDS||[]).filter(r=>r.output);
 const tokens=[];let results=[];
 const norm=x=>String(x||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
 const dialectOK=(d,selected)=>{if(selected==='all')return true;const val=norm(d);return !val||val.includes('shared')||val.includes('both')||(selected==='woodland'&&(val.includes('wood')||val.includes('th')||val.includes('la ronge')))||(selected==='plains'&&(val.includes('plain')||val.includes(' y ')));};
 function options(){const gr=$('sentenceGrammar'),keep=gr.value;const choices=[...new Set(vocabulary.map(r=>r.grammar).filter(Boolean))].sort();gr.replaceChildren(new Option('All grammatical classes',''),...choices.map(c=>new Option(c,c)));if(choices.includes(keep))gr.value=keep;}
 function search(){const q=norm($('sentenceSearch').value.trim()),dialect=$('sentenceDialect').value,grammar=$('sentenceGrammar').value;results=vocabulary.filter(r=>dialectOK(r.dialect,dialect)&&(!grammar||r.grammar===grammar)&&(!q||norm(r.word+' '+r.meaning+' '+r.grammar).includes(q)));
 const menu=$('sentenceResults');menu.replaceChildren(...results.slice(0,200).map((r,i)=>new Option(r.word+' — '+r.meaning.slice(0,68),String(i))));$('sentenceMatchCount').textContent=results.length.toLocaleString()+' matching entries'+(results.length>200?' · first 200 displayed; type to narrow':'');}
 function updateForms(){const d=$('sentenceDialect').value;const found=forms.filter(f=>d==='all'||f.dialect===d);$('sentenceRecorded').replaceChildren(...found.map((f,i)=>new Option(f.word+' — '+f.meaning+' ('+f.dialect+')',String(i))));$('sentenceRecorded')._records=found;}
 function draw(){const area=$('sentenceTokens');area.replaceChildren();tokens.forEach((t,i)=>{const group=document.createElement('span');group.className='sentence-token';const name=document.createElement('span');name.textContent=t.word;group.append(name);for(const [symbol,action,title] of [['←',()=>shift(i,-1),'Move word left'],['→',()=>shift(i,1),'Move word right'],['×',()=>{tokens.splice(i,1);draw()},'Remove word']]){const b=document.createElement('button');b.type='button';b.textContent=symbol;b.title=title;b.setAttribute('aria-label',title+': '+t.word);b.addEventListener('click',action);group.append(b)}area.append(group)});$('sentenceOutput').textContent=tokens.map(t=>t.word).join(' ')||'Select words to begin';$('sentenceTranslation').textContent=tokens.map(t=>t.word+' — '+t.meaning).join(' · ');}
 function shift(i,n){const j=i+n;if(j<0||j>=tokens.length)return;[tokens[i],tokens[j]]=[tokens[j],tokens[i]];draw()}
 function add(r){if(!r)return;tokens.push(r);draw();$('sentenceAnalysis').replaceChildren();$('sentenceStatus').textContent='Added '+r.word+'.';}
 function checkSentence(){
  const area=$('sentenceAnalysis');area.replaceChildren();
  const line=(text,heading=false)=>{const p=document.createElement('p');p.textContent=text;if(heading)p.style.fontWeight='650';area.append(p)};
  if(!tokens.length){line('Choose words to inspect their dictionary entries and recorded inflections.');return}
  const selectedDialect=$('sentenceDialect').value;
  let found=0,unmatched=0,verbCount=0,inflected=0,ambiguous=0;
  const dialects=new Set();
  tokens.forEach((t,i)=>{
   const records=conjugations.filter(r=>norm(r.output)===norm(t.word));
   const entries=vocabulary.filter(r=>norm(r.word)===norm(t.word));
   const classes=[...new Set([...records.map(r=>r.gramClass),...entries.map(r=>r.grammar)].filter(Boolean))];
   const verb=classes.some(c=>/^(VAI|VII|VTI|VTA)/i.test(c));
   const isInflected=records.length>0;
   const match=records.length||entries.length;
   if(match)found++;else unmatched++;
   if(verb)verbCount++;
   if(isInflected)inflected++;
   if(classes.length>1)ambiguous++;
   const ds=[...records,...entries].map(r=>norm(r.dialect));
   ds.forEach(d=>{if(d.includes('wood')||d.includes('th'))dialects.add('Woodland');if(d.includes('plain'))dialects.add('Plains')});
   const selectedOK=selectedDialect==='all'||[...records,...entries].some(r=>dialectOK(r.dialect,selectedDialect));
   let analysis=records.length?`Recorded inflected form (${records.map(r=>[r.gramClass,r.person].filter(Boolean).join(', ')).join(' / ')})`:entries.length?`Dictionary headword (${classes.join(' / ')||'class unlabelled'})`:'No match in the stored vocabulary';
   line(`${i+1}. ${t.word}: ${analysis}.`);
   if(!selectedOK&&match)line(`    Review dialect: no matching entry has the selected ${selectedDialect} label.`);
   if(verb&&!isInflected)line(`    This verb is a dictionary headword. Its subject/object agreement and verb order have not been established by this entry.`);
   if(classes.length>1)line(`    Multiple grammatical analyses are possible. The surrounding words may disambiguate them.`);
  });
  line('Sentence overview',true);
  line(`${found}/${tokens.length} words matched stored vocabulary or forms; ${inflected} matched recorded conjugations; ${verbCount} matched verb entries; ${unmatched} unmatched.`);
  if(!verbCount)line('No recorded verb class was identified in the selected words. This is not proof that the sentence is incorrect; Cree utterances need not always contain an overt verb.');
  if(dialects.size>1)line('Both Plains and Woodland labels occur among possible matches. Check the intended dialect for each selected word.');
  if(verbCount>1)line('Multiple verb entries occur. Check whether the intended clause structure requires one or more verbs.');
  if(ambiguous)line('At least one form has more than one possible grammatical classification; the checker cannot resolve it from word order alone.');
  line('This is a vocabulary and morphology review, not a syntactic grammaticality judgment. It cannot verify Cree word order, obviation, argument agreement, or meaning in context.');
 }
 $('sentenceCheck').addEventListener('click',checkSentence);
 $('sentenceSearch').addEventListener('input',search);$('sentenceGrammar').addEventListener('change',search);$('sentenceDialect').addEventListener('change',()=>{search();updateForms()});$('sentenceResults').addEventListener('dblclick',()=>add(results[Number($('sentenceResults').value)]));$('sentenceAdd').addEventListener('click',()=>add(results[Number($('sentenceResults').value)]));$('sentenceAddVerb').addEventListener('click',()=>add(($('sentenceRecorded')._records||[])[Number($('sentenceRecorded').value)]));
 $('sentenceUndo').addEventListener('click',()=>{tokens.pop();draw()});$('sentenceClear').addEventListener('click',()=>{tokens.length=0;draw();$('sentenceStatus').textContent=''});
 $('sentenceCopy').addEventListener('click',async()=>{const str=tokens.map(t=>t.word).join(' ');if(!str)return;try{await navigator.clipboard.writeText(str);$('sentenceStatus').textContent='Sentence copied.'}catch(e){$('sentenceStatus').textContent='Select and copy the sentence above.'}});
 options();search();updateForms();draw();
})();
