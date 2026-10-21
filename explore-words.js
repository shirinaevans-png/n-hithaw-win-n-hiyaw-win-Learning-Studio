(()=>{'use strict';
const $=id=>document.getElementById(id);
const ui={words:$('words'),count:$('wordCount'),search:$('search'),dialect:$('dialect'),category:$('category'),display:$('display'),more:$('loadMore')};
if(Object.values(ui).some(x=>!x))return;
const norm=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
const escapeHTML=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const data=window.IED501_LEARNING_DATA;
if(!data||!Array.isArray(data.words)||!data.words.length){ui.count.textContent='Vocabulary data is unavailable. Make sure data.js is in the same folder as this page.';ui.words.innerHTML='<p class="empty">Could not load vocabulary. Check that <code>data.js</code> has been uploaded.</p>';return;}
const all=data.words.filter(w=>w&&w.cre&&w.en);
const categoryMap=new Map();all.forEach(w=>{if(w.category)categoryMap.set(w.category,(categoryMap.get(w.category)||0)+1)});
[...categoryMap.keys()].sort((a,b)=>a.localeCompare(b)).forEach(x=>{const o=document.createElement('option');o.value=x;o.textContent=x+' ('+categoryMap.get(x)+')';ui.category.append(o)});
let shown=100,filtered=[];
function isPronoun(w){return /pronoun|person words/i.test((w.category||'')+' '+(w.tags||''))||/^(PR|PR-AN|PR-IN)$/i.test(w.grammar||'')}
function matchesDialect(w,choice){const d=String(w.dialect||'').toLowerCase();if(choice==='all')return true;if(choice==='plains')return d.includes('plains');if(choice==='woodland')return d.includes('woodland')||d.includes('woods');return !d||d.includes('uncategorized')||d.includes('not assigned')}
function render(reset=true){if(reset)shown=100;let q=norm(ui.search.value.trim()),dial=ui.dialect.value,cat=ui.category.value;
filtered=all.filter(w=>matchesDialect(w,dial)&&(cat==='all'||(cat==='__pronouns'?isPronoun(w):w.category===cat))&&(!q||norm([w.cre,w.en,w.grammar,w.category,w.tags,w.source].join(' ')).includes(q)));
const subset=filtered.slice(0,shown);ui.words.innerHTML=subset.map(w=>{let syll=(ui.display.value==='both'&&(w.syllabics||w.syl))?'<div class="vocab-note">'+escapeHTML(w.syllabics||w.syl)+'</div>':'';
return '<article class="vocab-card" role="listitem"><div class="vocab-cree">'+escapeHTML(w.cre)+'</div>'+syll+'<div class="vocab-en">'+escapeHTML(w.en)+'</div><div class="vocab-meta"><span>'+escapeHTML(w.grammar||'Grammar not marked')+'</span><span>'+escapeHTML(w.dialect||'Dialect not assigned')+'</span></div><div class="vocab-note">'+escapeHTML(w.category||'')+'</div></article>'}).join('')||'<p class="empty">No matching words. Try another search, dialect or topic.</p>';
ui.count.textContent=filtered.length.toLocaleString()+' words found · showing '+subset.length.toLocaleString()+' of '+all.length.toLocaleString()+' entries in the collection';ui.more.hidden=subset.length>=filtered.length;}
for(const el of [ui.search,ui.dialect,ui.category,ui.display])el.addEventListener(el===ui.search?'input':'change',()=>render(true));ui.more.addEventListener('click',()=>{shown+=100;render(false)});render();
})();
