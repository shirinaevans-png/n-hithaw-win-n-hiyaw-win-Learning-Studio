(()=>{'use strict';
const forms={plains:[
{p:'direct',r:'1 → 3',w:'niwāpamāw',m:'I see him/her',b:'—'},
{p:'direct',r:'2 → 3',w:'kiwāpamāw',m:'You see him/her',b:'—'},
{p:'direct',r:'3 → 3′',w:'wāpamēw',m:'He/she sees another (obviative) person',b:'—'},
{p:'inverse',r:'3 → 1',w:'niwāpamik',m:'He/she sees me',b:'—'},
{p:'inverse',r:'3 → 2',w:'kiwāpamik',m:'He/she sees you',b:'—'},
{p:'inverse',r:'3′ → 3',w:'wāpamikow',m:'An obviative person sees the proximate person',b:'—'}
],woodland:[]};
const $=x=>document.getElementById(x);
const dialect=$('dialect'),pattern=$('pattern'),relation=$('relation'),tbody=$('examples'),msg=$('message'),comparison=$('comparison');
function td(value){const n=document.createElement('td');n.textContent=value;return n;}
function updateRelations(){const previous=relation.value;const seen=[...new Set(forms[dialect.value].map(x=>x.r))];relation.replaceChildren();for(const r of ['all',...seen]){const o=document.createElement('option');o.value=r;o.textContent=r==='all'?'All relationships':r;relation.append(o);}if(seen.includes(previous))relation.value=previous;}
function render(){const all=forms[dialect.value];const filtered=all.filter(x=>(pattern.value==='all'||x.p===pattern.value)&&(relation.value==='all'||x.r===relation.value));tbody.replaceChildren();for(const x of filtered){const tr=document.createElement('tr');tr.append(td(x.p),td(x.r),td(x.w),td(x.m),td(x.b));tbody.append(tr);}
msg.textContent=dialect.value==='woodland'?'TH dialect: no additional paradigms have been added without source verification. Use the existing VTA lab for its curated Woodland Cree examples.':`${filtered.length} Plains Cree examples. These are examples, not a complete VTA paradigm.`;
if(!filtered.length){const tr=document.createElement('tr');const t=td('No verified additional examples for this selection.');t.colSpan=5;tr.append(t);tbody.append(tr);}
comparison.replaceChildren();const pairs=[['I see him/her','niwāpamāw','He/she sees me','niwāpamik'],['You see him/her','kiwāpamāw','He/she sees you','kiwāpamik']];if(dialect.value==='plains'){for(const [a,b,c,d] of pairs){const e=document.createElement('div');e.className='pair';const first=document.createElement('article'),second=document.createElement('article');first.innerHTML='<small>DIRECT</small>';second.innerHTML='<small>INVERSE</small>';for(const [el,word,meaning] of [[first,b,a],[second,d,c]]){const h=document.createElement('h3');h.textContent=word;const p=document.createElement('p');p.textContent=meaning;el.append(h,p);}e.append(first,second);comparison.append(e);}}else{comparison.textContent='Only dialect-specific, verified forms should appear here.';}}
dialect.addEventListener('change',()=>{updateRelations();render()});pattern.addEventListener('change',render);relation.addEventListener('change',render);updateRelations();render();})();
