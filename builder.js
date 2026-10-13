"use strict";
const $=id=>document.getElementById(id);
const raw=window.CREE_BUILDER_DATA||{};
const fields=['class','stemGroup','relation'];
let current=[];
function setOpt(id,items){const el=$(id),old=el.value;el.replaceChildren(...items.map(([value,label])=>{const o=document.createElement('option');o.value=value;o.textContent=label;return o}));if(items.some(x=>x[0]===old))el.value=old}
const unique=items=>[...new Set(items)];
function rows(){return raw[$('dialect').value]||[]}
function syncClasses(){setOpt('class',unique(rows().map(r=>r[0])).map(s=>[s,s]));syncGroups()}
function syncGroups(){const filtered=rows().filter(r=>r[0]===$('class').value);setOpt('stemGroup',unique(filtered.map(r=>r[4])).map(x=>[x,x]));syncRelations()}
function syncRelations(){current=rows().filter(r=>r[0]===$('class').value&&r[4]===$('stemGroup').value);setOpt('relation',current.map((r,i)=>[String(i),r[1]+' · '+r[2]]));render()}
function record(){return current[Number($('relation').value)]||current[0]}
function combo(){return $('prefix').value+$('stem').value+$('suffix').value}
function paint(){const a=$('prefix').value,b=$('stem').value,c=$('suffix').value;$('combined').textContent=combo()||'Choose word parts';$('segPre').textContent=a||'∅';$('segStem').textContent=b||'∅';$('segSuf').textContent=c||'∅';$('feedback').textContent=''}
function render(){const e=record();if(!e)return;$('meaning').textContent=e[7];$('source').textContent=e[8];const pool=rows().filter(r=>r[0]===e[0]);for(const [id,index] of [['prefix',3],['stem',4],['suffix',5]]){setOpt(id,unique(['',...pool.map(r=>r[index])]).map(t=>[t,t||'∅ (none)']))} $('prefix').value='';$('stem').value=e[4];$('suffix').value='';paint()}
$('dialect').addEventListener('change',syncClasses);$('class').addEventListener('change',syncGroups);$('stemGroup').addEventListener('change',syncRelations);$('relation').addEventListener('change',render);for(const id of ['prefix','stem','suffix'])$(id).addEventListener('change',paint);
$('check').addEventListener('click',()=>{const e=record();if(!e)return;const ok=combo()===e[6];$('feedback').textContent=ok?'Correct: '+e[6]+'. '+e[7]:'Not yet. Try selecting the matching person prefix and ending.'});
$('reveal').addEventListener('click',()=>{const e=record();$('prefix').value=e[3];$('stem').value=e[4];$('suffix').value=e[5];paint();$('feedback').textContent='Documented form: '+e[6]+' · '+e[8]});
$('clear').addEventListener('click',render);
$('random').addEventListener('click',()=>{const data=rows(),item=data[(Math.floor(Math.random()*data.length))];$('class').value=item[0];syncGroups();$('stemGroup').value=item[4];syncRelations();const idx=current.findIndex(r=>r[6]===item[6]);$('relation').value=String(idx);render()});
syncClasses();
