"use strict";
const W={
 label:'Woodland Cree (TH) · nîhithawîwin',source:'Woodland Cree examples: Solomon Ratt, Beginning Woods Cree (2026), pp. 260, 267, 280–281 (printed).',
 note:'Curated indicative and imperative examples and morphology drawn from Ratt, Chapter 8. Plural object and obviation require additional forms.',
 examples:[
 {id:'wd1',dir:'direct',rel:'I → fish (animate noun)',form:'nimowâw',gloss:'I eat fish (singular object)',pre:'ni',stem:'mow',suf:'âw',origin:'p. 267'},
 {id:'wd2',dir:'direct',rel:'you → fish (animate noun)',form:'kimowâw',gloss:'You eat fish (singular object)',pre:'ki',stem:'mow',suf:'âw',origin:'p. 267'},
 {id:'wd3',dir:'direct',rel:'I → fish (plural object)',form:'nimowâwak',gloss:'I eat fish (plural object)',pre:'ni',stem:'mow',suf:'âwak',origin:'p. 267'},
 {id:'wd4',dir:'direct',rel:'he/she → fish',form:'mowîw',gloss:'He/she eats fish (obviative object)',pre:'',stem:'mow',suf:'îw',origin:'p. 267'},
 {id:'wi1',dir:'inverse',rel:'you → me',form:'kitasamin',gloss:'You feed me',pre:'kit',stem:'asam',suf:'in',origin:'p. 280'},
 {id:'wi2',dir:'inverse',rel:'I → you',form:'kitasamitin',gloss:'I feed you',pre:'kit',stem:'asam',suf:'itin',origin:'p. 281'},
 {id:'wi3',dir:'imperative',rel:'you → me',form:'asamin',gloss:'Feed me!',pre:'',stem:'asam',suf:'in',origin:'p. 280'}
 ]},
 P={
 label:'Plains Cree (Y) · nêhiyawêwin',source:'Plains Cree examples: user-provided Cree Vocabulary Grammar Reference with Builders, Verb Rule Matrix (Ratt Plains Cree source references).',
 note:'Plains Cree worksheet patterns are instructional models from the previously supplied Verb Rule Matrix. Specific stems and additional moods require source review.',
 examples:[
 {id:'pd1',dir:'direct',rel:'I → him/her',form:'niwâpamâw',gloss:'I see him/her',pre:'ni',stem:'wâpam',suf:'âw',origin:'Verb Rule Matrix'},
 {id:'pd2',dir:'direct',rel:'you → him/her',form:'kiwâpamâw',gloss:'You see him/her',pre:'ki',stem:'wâpam',suf:'âw',origin:'Verb Rule Matrix'},
 {id:'pd3',dir:'direct',rel:'he/she → another third person',form:'wâpamêw',gloss:'He/she sees another third person',pre:'',stem:'wâpam',suf:'êw',origin:'Verb Rule Matrix'},
 {id:'pd4',dir:'direct',rel:'we (exclusive) → him/her',form:'niwâpamânân',gloss:'We (exclusive) see him/her',pre:'ni',stem:'wâpam',suf:'ânân',origin:'Verb Rule Matrix'},
 {id:'pi1',dir:'inverse',rel:'he/she → me',form:'niwâpamik',gloss:'He/she sees me',pre:'ni',stem:'wâpam',suf:'ik',origin:'Verb Rule Matrix'},
 {id:'pi2',dir:'inverse',rel:'he/she → you',form:'kiwâpamik',gloss:'He/she sees you',pre:'ki',stem:'wâpam',suf:'ik',origin:'Verb Rule Matrix'},
 {id:'pi3',dir:'inverse',rel:'another third person → he/she',form:'wâpamikow',gloss:'Another third person sees him/her',pre:'',stem:'wâpam',suf:'ikow',origin:'Verb Rule Matrix'}
 ]};
const $=id=>document.getElementById(id);const pick=()=> $('dialect').value==='woodland'?W:P;
let quizIndex=0,points=0,answered=false;
function opt(value,label){let x=document.createElement('option');x.value=value;x.textContent=label;return x}
function setOptions(id,vals){$(id).replaceChildren(...vals.map(x=>opt(x,x||'(none)')))}
function showTables(){const d=pick();$('dialectSource').textContent=d.source;$('paradigmNote').textContent=d.note;$('introExample').textContent=d.examples[0].form+' · '+d.examples[0].gloss;let rows=d.examples.filter(x=>$('direction').value==='all'||x.dir===$('direction').value);$('paradigmRows').replaceChildren(...rows.map(x=>{let tr=document.createElement('tr');[x.dir,x.rel,x.form,x.gloss,(x.pre||'∅')+' + '+x.stem+' + '+x.suf].forEach((t,i)=>{let c=document.createElement('td');c.textContent=t;if(i===2)c.classList.add('cree-form');tr.append(c)});return tr}));}
function updateTargets(){const ex=pick().examples;$('buildTarget').replaceChildren(...ex.map(e=>opt(e.id,e.rel+' · '+e.gloss)));showTarget()}
function target(){return pick().examples.find(x=>x.id===$('buildTarget').value)||pick().examples[0]}
function showTarget(){const d=pick(),e=target();$('targetPrompt').textContent='Build: '+e.gloss+' ('+e.dir+')';const unique=f=>[...new Set(['',...d.examples.map(x=>x[f])])];setOptions('buildPrefix',unique('pre'));setOptions('buildStem',unique('stem'));setOptions('buildSuffix',unique('suf'));$('buildPrefix').value='';$('buildStem').value=e.stem;$('buildSuffix').value='';$('buildResult').textContent='';$('segmentResult').replaceChildren();showBuild()}
function showBuild(){const f=$('buildPrefix').value+$('buildStem').value+$('buildSuffix').value;$('vtaOutput').textContent=f||'Choose parts';$('buildResult').textContent='';$('segmentResult').replaceChildren()}
function check(){const e=target(),got=$('buildPrefix').value+$('buildStem').value+$('buildSuffix').value,ok=got===e.form;$('buildResult').textContent=ok?'Correct: '+e.form+'. '+e.gloss+' ('+e.origin+').':'Not yet. Check the person prefix and the ending for '+e.rel+'.';if(ok){$('segmentResult').replaceChildren(...[['Prefix',e.pre||'∅'],['Stem',e.stem],['Ending',e.suf]].map(([k,v])=>{let div=document.createElement('div');div.className='part';let strong=document.createElement('strong');strong.textContent=v;let small=document.createElement('small');small.textContent=k;div.append(strong,small);return div}))}}
function quiz(){const d=pick(),ex=d.examples,e=ex[quizIndex%ex.length];answered=false;$('quizCount').textContent='Example '+(quizIndex+1)+' of '+ex.length;$('quizForm').textContent=e.form;$('quizMeaning').textContent='What relationship does this word express?';$('quizFeedback').textContent='';$('quizScore').textContent='Correct '+points+' / '+ex.length;const distractors=ex.filter(x=>x.rel!==e.rel).map(x=>x.rel).slice(0,3);const choices=[e.rel,...distractors].sort((a,b)=>a.localeCompare(b));$('quizChoices').replaceChildren(...choices.map(t=>{let b=document.createElement('button');b.textContent=t;b.onclick=()=>{if(answered)return;answered=true;if(t===e.rel)points++;$('quizFeedback').textContent=t===e.rel?'Correct. '+e.gloss:'The answer is '+e.rel+'. '+e.gloss;[...$('quizChoices').children].forEach(x=>{x.disabled=true;if(x.textContent===e.rel)x.classList.add('correct');else if(x===b)x.classList.add('wrong')});$('quizScore').textContent='Correct '+points+' / '+ex.length};return b}))}
function switchDialect(){showTables();updateTargets();quizIndex=0;points=0;quiz()}
document.querySelectorAll('[data-panel]').forEach(btn=>btn.onclick=()=>{document.querySelectorAll('[data-panel]').forEach(b=>b.setAttribute('aria-current',b===btn?'page':'false'));document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===btn.dataset.panel))});
$('dialect').onchange=switchDialect;$('direction').onchange=showTables;$('buildTarget').onchange=showTarget;['buildPrefix','buildStem','buildSuffix'].forEach(id=>$(id).onchange=showBuild);$('checkVTA').onclick=check;$('quizNext').onclick=()=>{quizIndex=(quizIndex+1)%pick().examples.length;quiz()};$('quizReset').onclick=()=>{quizIndex=0;points=0;quiz()};switchDialect();
