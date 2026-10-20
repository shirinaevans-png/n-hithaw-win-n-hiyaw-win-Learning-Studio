'use strict';
// Reference vocabulary transcribed from the image provided by the user.
// These entries are NOT independently verified for a particular Cree dialect.
const PARTS = [
 {en:'Hair',cr:'mêstakaya',x:52,y:21},
 {en:'Head',cr:'mistikwân',x:57,y:29},
 {en:'Nose',cr:'mikot',x:51,y:35},
 {en:'Eye',cr:'miskîsik',x:46,y:34},
 {en:'Ear',cr:'mihtawakay',x:65,y:34},
 {en:'Mouth',cr:'mitôn',x:55,y:38},
 {en:'Shoulder',cr:'mitihtimon',x:38,y:48},
 {en:'Arm',cr:'mispiton',x:70,y:53},
 {en:'Hand',cr:'micihciy',x:70,y:62},
 {en:'Stomach',cr:'matay',x:50,y:57},
 {en:'Leg',cr:'miskât',x:44,y:76},
 {en:'Foot',cr:'misit',x:63,y:91}
];
const $ = id => document.getElementById(id);
let active=0,round=[],questionIndex=0,score=0,answered=false;
function selectPart(i){active=i;const p=PARTS[i];$('selection').innerHTML='';const a=document.createElement('p');a.className='english';a.textContent=p.en;const b=document.createElement('p');b.className='cree';b.textContent=p.cr;const c=document.createElement('span');c.className='counter';c.textContent=`Word ${i+1} of ${PARTS.length}`;$('selection').append(a,b,c);document.querySelectorAll('.word,.hotspot').forEach(el=>{const isActive=Number(el.dataset.index)===i;el.classList.toggle('active',isActive);if(el.classList.contains('word'))el.setAttribute('aria-pressed',String(isActive));if(el.classList.contains('hotspot'))el.setAttribute('aria-label',`${isActive?'Selected: ':''}${p.en}`=== ''?'':el.dataset.label);});}
function setupExplore(){PARTS.forEach((p,i)=>{const marker=document.createElement('button');marker.className='hotspot';marker.type='button';marker.textContent=String(i+1);marker.title=`${p.en} (${p.cr})`;marker.dataset.label=`${p.en}: ${p.cr}`;marker.setAttribute('aria-label',`${p.en}: ${p.cr}`);marker.dataset.index=i;marker.style.left=p.x+'%';marker.style.top=p.y+'%';marker.addEventListener('click',()=>selectPart(i));$('hotspots').append(marker);const btn=document.createElement('button');btn.type='button';btn.className='word';btn.dataset.index=i;btn.innerHTML=`<strong>${i+1}. ${p.en}</strong><span></span>`;btn.querySelector('span').textContent=p.cr;btn.addEventListener('click',()=>selectPart(i));$('vocabulary').append(btn)});$('vocabCount').textContent=`${PARTS.length} words`;selectPart(0)}
function switchTab(which){const practice=which==='practice';$('explorePanel').hidden=practice;$('practicePanel').hidden=!practice;$('exploreTab').classList.toggle('active',!practice);$('practiceTab').classList.toggle('active',practice);$('exploreTab').setAttribute('aria-selected',String(!practice));$('practiceTab').setAttribute('aria-selected',String(practice));if(practice&&!round.length)restart()}
function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}return b}
function restart(){round=shuffle(PARTS.map((_,i)=>i));questionIndex=0;score=0;renderQuestion()}
function renderQuestion(){answered=false;$('nextBtn').disabled=true;$('feedback').textContent='';const idx=round[questionIndex];if(idx===undefined){$('progress').textContent='Complete';$('question').textContent=`You got ${score} out of ${round.length} correct!`;$('questionHint').textContent='Restart to try again, or switch to Explore to review the vocabulary.';$('answers').replaceChildren();$('nextBtn').disabled=true;return}const p=PARTS[idx];const creeToEnglish=questionIndex%2===0;$('progress').textContent=`Question ${questionIndex+1} of ${round.length} · Score ${score}`;$('question').textContent=creeToEnglish?p.cr:p.en;$('questionHint').textContent=creeToEnglish?'What does this Cree word mean?':'Choose the Cree word for this body part.';const options=shuffle([idx,...shuffle(PARTS.map((_,i)=>i).filter(i=>i!==idx)).slice(0,3)]);$('answers').replaceChildren();options.forEach(i=>{const btn=document.createElement('button');btn.type='button';btn.className='answer';btn.textContent=creeToEnglish?PARTS[i].en:PARTS[i].cr;btn.addEventListener('click',()=>{if(answered)return;answered=true;const good=i===idx;if(good)score++;document.querySelectorAll('.answer').forEach(el=>{el.disabled=true;if(el.textContent===(creeToEnglish?p.en:p.cr))el.classList.add('correct');else if(el===btn&&!good)el.classList.add('incorrect')});$('feedback').textContent=good?'Correct!':`Not quite. ${p.en} = ${p.cr}.`;$('nextBtn').disabled=false;$('nextBtn').textContent=questionIndex===round.length-1?'See results →':'Next question →'});$('answers').append(btn)})}
$('exploreTab').addEventListener('click',()=>switchTab('explore'));
$('practiceTab').addEventListener('click',()=>switchTab('practice'));
$('nextBtn').addEventListener('click',()=>{if(!answered)return;questionIndex++;renderQuestion()});
$('restartBtn').addEventListener('click',restart);
setupExplore();
