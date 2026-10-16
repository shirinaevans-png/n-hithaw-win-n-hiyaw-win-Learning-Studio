(()=>{'use strict';const $=id=>document.getElementById(id), E=window.CREE_RULE_ENGINE;
const options=(node,arr)=>{node.replaceChildren(...arr.map(([value,label])=>{const e=document.createElement('option');e.value=value;e.textContent=label;return e;}));};
function refresh(){const models=E.catalog($('dialect').value,$('klass').value), previous=$('model').value;
options($('model'),models.length?models.map(m=>[m.stem,`${m.stem} (${m.records.length} records)`]):[['','No source model for this selection']]);
if(models.some(m=>m.stem===previous))$('model').value=previous;loadModel();}
function loadModel(){let m=E.catalog($('dialect').value,$('klass').value).find(m=>m.stem===$('model').value);const p=$('person').value;
options($('person'),m?[...new Set(m.records.map(E.personOf))].map(x=>[x,x]):[['','No recorded relationships']]);
if(m&&m.records.some(r=>E.personOf(r)===p))$('person').value=p;
if(m)$('stem').value=m.stem;render();}
function render(){const r=E.generate({dialect:$('dialect').value,gramClass:$('klass').value,stem:$('stem').value,modelStem:$('model').value,person:$('person').value});
$('status').textContent=r.status==='attested'?'Recorded in source data':r.status==='hypothesis'?'UNVERIFIED analogy: not a confirmed Cree word':'No supported rule';
$('form').textContent=r.form||'—';$('reason').textContent=r.reason||'';$('source').textContent=r.source?'Model source: '+r.source:'';
$('parts').replaceChildren();if(r.parts)for(const [k,v] of Object.entries(r.parts)){let el=document.createElement('span');el.textContent=`${k}: ${v||'∅'}`;$('parts').appendChild(el);}}
for(const k of ['dialect','klass'])$(k).addEventListener('change',refresh);$('model').addEventListener('change',loadModel);
$('person').addEventListener('change',render);$('stem').addEventListener('input',render);$('run').addEventListener('click',render);refresh();})();
