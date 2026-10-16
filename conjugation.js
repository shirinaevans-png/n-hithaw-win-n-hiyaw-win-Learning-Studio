(()=>{'use strict';
const records=window.CREE_CONJUGATION_RECORDS||[];
const vocab=(window.IED501_LEARNING_DATA?.words||[]).filter(x=>/^(VAI|VII|VTA|VTI)/i.test(String(x.grammar||'')));
const id=x=>document.getElementById(x), unique=a=>[...new Set(a)], norm=s=>String(s||'').toLocaleLowerCase();
const option=(v,label)=>{const e=document.createElement('option');e.value=v;e.textContent=label;return e};
const set=(el,arr)=>el.replaceChildren(...arr.map(([a,b])=>option(a,b)));
const dialect=id('engineDialect'),cl=id('engineClass'),stem=id('engineStem'),person=id('enginePerson'),search=id('engineSearch');
let choices=[],selectedChoice=null,current=[];
// Database dialect 'uncategorized' means the source's dialect is NOT verified.
function cls(x){let g=String(x.grammar||'');return g.startsWith('VTI')?'VTI':g.startsWith('VTA')?'VTA':g.startsWith('VAI')?'VAI':g.startsWith('VII')?'VII':g}
function scan(){let keep=cl.value;let classes=unique([...vocab.map(cls),...records.filter(x=>x.dialect===dialect.value).map(x=>cls({grammar:x.gramClass}))]).sort();set(cl,classes.map(x=>[x,x]));if(classes.includes(keep))cl.value=keep;else if(classes.includes('VTA'))cl.value='VTA';populate()}
function populate(){let klass=cl.value,q=norm(search.value.trim());let rec=records.filter(r=>r.dialect===dialect.value && cls({grammar:r.gramClass})===klass);
let groups=new Map();rec.forEach(r=>{let key=r.stem;let group=groups.get(key)||[];group.push(r);groups.set(key,group)});
let opts=[...groups].map(([key,group])=>({key:'r:'+key,label:`${key} · ${group.length} recorded forms`,kind:'record',records:group,term:key+' '+group.map(x=>x.gloss).join(' ')}));
const matchesDialect=x=>{const d=norm(x.dialect||'');return d.includes(dialect.value)||d.includes('shared')||d.includes('both')||(dialect.value==='woodland'&&d.includes('th'))||(dialect.value==='plains'&&d.includes(' y '));};
const v=vocab.filter(x=>cls(x)===klass&&matchesDialect(x)).map(x=>({key:'d:'+x.id,label:`${x.cre} — ${x.en} · dictionary`,kind:'dictionary',entry:x,term:x.cre+' '+x.en+' '+x.grammar+' '+x.category}));
opts.push(...v);
choices=opts.filter(x=>!q||norm(x.term).includes(q));
let old=stem.value;set(stem,choices.length?choices.map(x=>[x.key,x.label]):[['','No matching words']]);if(choices.some(x=>x.key===old))stem.value=old;
id('engineCount').textContent=`${choices.length.toLocaleString()} matching entries and verb forms.`;
showStem()}
const PERSON_KEYS=[['1','I / me (first singular)'],['2','you (second singular)'],['3','she/he (third singular)'],['1P','we, excluding you'],['21','we, including you'],['2P','you plural'],['3P','they (third plural)'],["3′","obviative third person"],['1→3','I act on her/him'],['2→3','you act on her/him'],['3→1','she/he acts on me'],['3→2','she/he acts on you'],["3→3′",'proximate acts on obviative'],["3′→3",'obviative acts on proximate'],['1→2','I act on you'],['2→1','you act on me'],['1P→3','we exclusive act on third'],['21→3','we inclusive act on third'],['2P→3','you plural act on third'],["3P→3′",'they act on obviative']];
const extractPerson=r=>{let p=r.person||'';let a=p.match(/(?:Direct|Inverse \/ local|Inverse|local|Person agreement|Possession|Imperative):\s*(.+)/i);return (a?a[1]:p).replace(/\s*plural$/i,'P').trim()};
function renderParadigm(){const table=id('paradigmRows'),filter=id('relationshipFilter'),count=id('paradigmCoverage');if(!table||!filter)return;
const keys=unique(current.map(extractPerson));const catalog=keys.map(k=>[k,(PERSON_KEYS.find(p=>p[0]===k)||[k,k])[1]]);let previous=filter.value;
set(filter,catalog.length?catalog.map(([k,label])=>[k,`${k} · ${label}`]):[['','Choose a verb form']]);if(catalog.some(x=>x[0]===previous))filter.value=previous;else if(current.length)filter.value=extractPerson(current[0]);
table.replaceChildren(...catalog.map(([key,label])=>{let tr=document.createElement('tr'),v=current.filter(r=>extractPerson(r)===key),th=document.createElement('th'),td=document.createElement('td'),status=document.createElement('td');th.textContent=`${key} · ${label}`;td.textContent=v.map(r=>r.output).join(' / ');status.textContent='Recorded form';tr.append(th,td,status);return tr}));count.textContent=current.length?`${current.length} available forms for the selected stem.`:'Choose a word to explore its forms.';
}
function jumpPerson(){let key=id('relationshipFilter').value;let index=current.findIndex(r=>extractPerson(r)===key);if(index>=0){person.value=String(index);showRecord();id('paradigmCoverage').textContent=`Showing recorded form for ${key}.`; }else{id('paradigmCoverage').textContent='Choose an available conjugation above.';}}
id('relationshipFilter').addEventListener('change',jumpPerson);
function showStem(){selectedChoice=choices.find(x=>x.key===stem.value);if(!selectedChoice){blank();return}if(selectedChoice.kind==='record'){current=selectedChoice.records;set(person,current.map((x,i)=>[String(i),`${x.person} · ${x.gloss}`]));person.disabled=false;showRecord()}else{current=[];set(person,[['','Not yet conjugated — source paradigm needed']]);person.disabled=true;showDictionary()}}
function blank(){renderParadigm();id('engineWord').textContent='No matching entry';id('engineGloss').textContent='Try another search or class.';id('engineParts').replaceChildren();id('engineSource').textContent='';id('engineStatus').textContent='';}
function parts(a){id('engineParts').replaceChildren(...a.map(([name,val])=>{let e=document.createElement('div'),s=document.createElement('small'),b=document.createElement('strong');s.textContent=name;b.textContent=val||'∅';e.append(s,b);return e}))}
function partsSelect(r){updateSentence()}
function showRecord(){renderParadigm();let r=current[Number(person.value)]||current[0];if(!r)return;id('engineKind').textContent='CONJUGATED WORD';id('engineWord').textContent=r.output;id('engineGloss').textContent=r.gloss;id('engineSource').textContent='';id('engineStatus').textContent='';parts([['Prefix',r.prefix],['Stem',r.stem],['Ending',r.suffix]]);partsSelect(r)}
function showDictionary(){renderParadigm();const x=selectedChoice.entry;id('engineKind').textContent='DICTIONARY';id('engineWord').textContent=x.cre;id('engineGloss').textContent=x.en;id('engineSource').textContent=`${x.grammar||''} · ${x.category||''}`;id('engineStatus').textContent='';parts([['Word',x.cre],['Class',x.grammar||'—']]);updateSentence()}
function updateSentence(){let r=current[Number(person.value)]||current[0];let central=r?r.output:(selectedChoice?.entry?.cre||'');id('sentenceResult').textContent=[id('sentenceBefore').value.trim(),central,id('sentenceAfter').value.trim()].filter(Boolean).join(' ');id('sentenceFeedback').textContent=''}
dialect.addEventListener('change',scan);cl.addEventListener('change',populate);search.addEventListener('input',populate);stem.addEventListener('change',showStem);person.addEventListener('change',showRecord);
['sentenceBefore','sentenceAfter'].forEach(x=>id(x).addEventListener('input',updateSentence));
scan();
})();