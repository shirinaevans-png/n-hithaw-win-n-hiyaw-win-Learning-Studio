"use strict";
(()=>{
 const $=id=>document.getElementById(id);
 const records=(window.IED501_LEARNING_DATA?.words||window.IED501_LEARNING_DATA?.vocabulary||[]).map(r=>({id:r.id||r.word_id||'',word:r.cre||r.cree_sro||r.cree||'',en:r.en||r.english||'',grammar:r.grammar||'',dialect:r.dialect||'',source:r.source_pages||r.source||''})).filter(r=>r.word);
 const models=window.CREE_BUILDER_DATA||{};let chosen=null;
 const norm=s=>(s||'').normalize('NFC').toLocaleLowerCase();
 const add=(parent,tag,txt,klass)=>{const n=document.createElement(tag);n.textContent=txt;if(klass)n.className=klass;parent.append(n);return n};
 const opts=(id,values)=>{const e=$(id);e.replaceChildren(...values.map(([v,t])=>new Option(t,v)));};
 function matches(word){return Object.entries(models).flatMap(([dialect,rows])=>(rows||[]).filter(r=>norm(r[6])===norm(word)).map(r=>({dialect,r})));}
 function tokens(parts,target){const e=$(target);e.replaceChildren();parts.filter(x=>x!==undefined).forEach(x=>add(e,'span',x||'∅','morph-token'));}
 function selected(word){const w=records.find(r=>norm(r.word)===norm(word));if(!w)return;chosen=w;$('morphSelected').textContent=w.word+' · '+w.en;const a=matches(w.word);$('morphManual').value='';$('morphManualParts').replaceChildren(); if(a.length){let v=a[0];tokens([v.r[3],v.r[4],v.r[5]],'morphSegments');$('morphAssessment').textContent='Documented construction match: '+v.dialect+' · '+v.r[0]+' · '+v.r[1]+' · '+v.r[8]+'; segment labels are derived from the stored construction record.';}else{tokens([w.word],'morphSegments');$('morphAssessment').textContent='Dictionary-attested spelling, but no matching construction paradigm in this app. No morphological segmentation is asserted.';}$('morphStemQuery').value=w.word;related();}
 function related(){const q=norm($('morphStemQuery').value.trim()),area=$('morphRelated');area.replaceChildren();if(!q){add(area,'p','Select a word or enter a spelling fragment.');return}let hits=records.filter(r=>norm(r.word).includes(q)).slice(0,35);add(area,'p',hits.length+' displayed match(es)'+(hits.length===35?' (first 35)':'')+'.','small');hits.forEach(r=>{const b=add(area,'button',r.word+' · '+r.en+' ['+r.grammar+']','morph-choice');b.type='button';b.addEventListener('click',()=>{selected(r.word);const d=$('dictSearch');if(d){d.value=r.word;d.dispatchEvent(new Event('input'));}})});}
 $('morphStemQuery').addEventListener('input',related);
 $('morphSplit').addEventListener('click',()=>{const p=$('morphManual').value.split('-').map(x=>x.trim()).filter(Boolean);tokens(p,'morphManualParts');if(!chosen)return; const valid=norm(p.join(''))===norm(chosen.word);$('morphAssessment').textContent=(valid?'Parts recombine to the selected spelling. ':'Parts do not recombine to the selected spelling. ')+'This does NOT verify their grammatical boundaries or meanings.';});
 $('morphRestore').addEventListener('click',()=>{if(chosen)selected(chosen.word)});
 const dictSelect=$('dictResults');if(dictSelect)dictSelect.addEventListener('change',()=>{const val=dictSelect.value;const d=records.find(r=>r.id===val||r.word===val);if(d)selected(d.word);});
 // Existing explorer changes selected word on click; observe its displayed word in a simple event-driven way.
 for(const id of ['dictApply','dictPattern'])$(id)?.addEventListener('click',()=>{const word=$('dictWord')?.textContent||'';selected(word)});
 if(records.length)selected(records[0].word);
})();
