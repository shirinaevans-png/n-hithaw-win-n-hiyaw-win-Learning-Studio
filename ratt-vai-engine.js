(()=>{'use strict';
const $=id=>document.getElementById(id);
const PERSON={"1":"I","2":"you","3":"she/he","3obv":"obviative third person","1P":"we exclusive","21":"we inclusive","2P":"you plural","3P":"they"};
const suffixI={"1":"n","2":"n","3":"w","3obv":"yiwa","1P":"nân","21":"naw","2P":"nâwâw","3P":"wak"};
const suffixC={"1":"yân","2":"yan","3":"t","3obv":"yit","1P":"yâhk","21":"yahk","2P":"yêk","3P":"cik"};
function generate(stem,person,order,tense){
 if(order==='conjunct'&&tense==='future')return {error:'This model has no validated definite-future conjunct rule.'};
 let base=stem==='nipa'?'nipâ':'atoskê', sg=['1','2','1P','21','2P'].includes(person),pre='',ending='',core=base,tenseMark='';
 if(order==='independent'){
  if(stem==='atoske'&&sg) core='atoskâ';
  pre=sg?(person==='1'||person==='1P'?'ni':'ki')+(stem==='atoske'&&tense==='present'?'t':''):'';
  ending=suffixI[person];
  if(tense==='past')tenseMark='kî-';
  if(tense==='prospective')tenseMark='wî-';
  if(tense==='future')tenseMark=sg?'ka-':'ta-';
  if(tense!=='present')pre=sg?(person==='1'||person==='1P'?'ni':'ki'):'';
 }else{pre='ê-'; if(tense==='past')tenseMark='kî-';if(tense==='prospective')tenseMark='wî-';ending=suffixC[person];}
 return {form:pre+tenseMark+core+ending,pre,tenseMark,core,ending};
}
function render(){const st=$('rvStem').value,p=$('rvPerson').value,o=$('rvOrder').value,t=$('rvTense').value,r=generate(st,p,o,t);$('rvOutput').textContent=r.error||r.form; $('rvStatus').textContent=r.error||`Grammatical relationship: ${PERSON[p]}; ${o}; ${t}. Source-verified stem model: ${st==='nipa'?'nipâ':'atoskê'}.`; $('rvParts').replaceChildren();if(!r.error){for(const [name,value] of [['Person marker',r.pre],['Tense/aspect preverb',r.tenseMark],['Stem allomorph',r.core],['Person ending',r.ending]]){const d=document.createElement('div'),s=document.createElement('small'),b=document.createElement('strong');s.textContent=name;b.textContent=value||'∅';d.append(s,b);$('rvParts').append(d)}}$('rvFeedback').textContent='';return r}
for(const name of ['rvStem','rvPerson','rvOrder','rvTense'])$(name).addEventListener('change',()=>{render();$('rvInput').value=''});
$('rvCheck').addEventListener('click',()=>{const r=render(),input=$('rvInput').value.trim().normalize('NFC');$('rvFeedback').textContent=r.error?r.error:!input?'Enter a form to check.':input===r.form?'Correct for this selected model and grammatical features.':'Does not match the selected source-based model. Check person, tense, stem alternation, and ending; this does not prove the form is invalid in another context.'});
$('rvShow').addEventListener('click',()=>{const r=render();if(!r.error)$('rvInput').value=r.form});
window.RATT_VAI_GENERATE=generate;
render();
})();