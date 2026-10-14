(()=>{'use strict';
const refs=[['1','1 · I / me'],['2','2 · you (singular)'],['3','3 · she/he (proximate)'],['1P','1p · we, excluding you'],['21','21 · we, including you'],['2P','2p · you plural'],['3P','3p · they (proximate plural)'],["3′","3′ · obviative person"],["3′P","3′ plural · obviative group"]];
const $=i=>document.getElementById(i);
const all=window.CREE_CONJUGATION_RECORDS||[];
const dialect=$('engineDialect'),klass=$('engineClass');
for(const key of ['featureActor','featureUndergoer']){
 const node=$(key);refs.forEach(([v,t])=>node.add(new Option(t,v)));
}
$('featureUndergoer').value='3';
function norm(s){return String(s||'').normalize('NFC').trim().toLowerCase().replace(/\s+/g,' ')}
function cls(r){return String(r.gramClass||'').replace(/[0-9].*$/,'').toUpperCase()}
function tokens(r){let label=String(r.person||'');let m=label.match(/(\d+P?|21|[123]′?)\s*[→-]\s*(\d+P?|21|[123]′?)/u);if(m)return [m[1],/plural/i.test(label.slice(m.index+m[0].length)) && m[2]==='3'?'3P':m[2]];let m2=label.match(/(?:Person agreement|Possession):\s*(\d+P?|21)/);return m2?[m2[1],'']:null}
function attested(a,b){return all.filter(r=>r.dialect===dialect.value&&cls(r)===klass.value&&tokens(r)?.[0]===a&&tokens(r)?.[1]===b)}
function update(){let a=$('featureActor').value,b=$('featureUndergoer').value,k=klass.value,order=$('featureOrder').value,ref=$('featureReference').value;
 const trans=['VTA','VTI'].includes(k),noun=['NA','NI'].includes(k);
 $('featureUndergoer').disabled=!(trans);
 if(!trans)b='';
 let text=`${a}${trans?' → '+b:''} · ${k} · ${order}${ref==='plain'?'':' · '+ref}`;
 $('featureSummary').textContent=text;
 let answer=$('featureResult'),help=$('featureExplanation');
 if(k==='VII'&&a!=='3'&&a!=='3P') {answer.textContent='This selection conflicts with the basic VII inanimate-participant classification.';help.textContent='Choose an inanimate participant form from a documented VII paradigm; these person controls denote animate discourse participants.';return}
 if(k==='VTA'&&a===b){answer.textContent='A reflexive/reciprocal construction requires its own verified formation; it is not the ordinary two-participant VTA pattern.';help.textContent='Do not attach an ordinary VTA ending to the same actor and undergoer and assume it is correct.';return}
 if(order!=='independent') {answer.textContent='Selection available; source-matched conjunct/imperative analysis is not yet implemented for this complete feature combination.';help.textContent='Conjunct and imperative inflection must not inherit independent-order endings.';return}
 if(ref!=='plain'){answer.textContent='This reference contrast is selectable but requires an obviative-specific paradigm for certification.';help.textContent='Proximate and obviative are discourse-reference statuses, not near/far demonstratives. Do not infer a word form from English alone.';return}
 const hits=attested(a,b);
 if(hits.length){answer.textContent=hits.map(x=>x.output).join(' / ');help.textContent='Matched source records: '+hits.map(x=>x.source+' — '+x.gloss).join('; ')}
 else {answer.textContent='No documented conjugation is currently linked to this feature combination for this dialect and class.';help.textContent='This means insufficient evidence in the website data, not that the grammatical relationship is impossible.'}
}
['featureActor','featureUndergoer','featureOrder','featureReference'].forEach(k=>$(k).addEventListener('change',update));
dialect.addEventListener('change',update);klass.addEventListener('change',update);
function check(){let q=norm($('checkAnyForm').value);if(!q){$('anyFormFeedback').textContent='Enter a Cree form first.';return}
 const within=$('checkScope').value==='all'?all:all.filter(r=>r.dialect===dialect.value&&cls(r)===klass.value);
 const matches=within.filter(r=>norm(r.output)===q);
 $('anyFormFeedback').textContent=matches.length?'Recorded matches ('+matches.length+'): '+matches.map(x=>`${x.output} — ${x.dialect}, ${x.gramClass}, ${x.person}, ${x.gloss}. Source: ${x.source}`).join(' | '):'No exact recorded match. This does not mean the form is ungrammatical; the current corpus and rule paradigms are incomplete.';
}
$('checkAnyButton').addEventListener('click',check);
$('checkAnyForm').addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();check()}});
update();
})();