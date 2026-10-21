"use strict";
// Vocabulary transcribed from the user's body-parts reference image.
// Order here corresponds to the numbered targets, not the shuffled word cards.
const parts=[
 {en:"Hair",cr:"mêstakaya",x:49,y:11},
 {en:"Head",cr:"mistikwân",x:53,y:19},
 {en:"Nose",cr:"mikot",x:51,y:28},
 {en:"Eye",cr:"miskîsik",x:43,y:26},
 {en:"Ear",cr:"mihtawakay",x:64,y:26},
 {en:"Mouth",cr:"mitôn",x:52,y:32},
 {en:"Shoulder",cr:"mitihtimon",x:33,y:43},
 {en:"Arm",cr:"mispiton",x:68,y:48},
 {en:"Hand",cr:"micihciy",x:66,y:56},
 {en:"Stomach",cr:"matay",x:51,y:52},
 {en:"Leg",cr:"miskât",x:44,y:76},
 {en:"Foot",cr:"misit",x:63,y:92}
];
const $=id=>document.getElementById(id);
const randomize=arr=>{let a=[...arr];for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
let order=[],chosen=null,done=new Set();
function status(message){$('feedback').textContent=message;}
function update(){let n=done.size;$('count').textContent=`${n} of ${parts.length} matched`;$('percent').textContent=Math.round(100*n/parts.length)+'%';$('fill').style.width=(100*n/parts.length)+'%';}
function renderWords(){let list=$('wordList');list.replaceChildren();order.forEach(i=>{let p=parts[i],b=document.createElement('button');b.type='button';b.className='word'+(chosen===i?' selected':'')+(done.has(i)?' correct':'');b.disabled=done.has(i);b.setAttribute('aria-pressed',String(chosen===i));let t=document.createElement('strong');t.textContent=p.cr;b.append(t);if(done.has(i)){let tick=document.createElement('span');tick.className='hint';tick.textContent='✓ '+p.en;b.append(tick)}b.addEventListener('click',()=>{chosen=i;renderWords();status('Now click the matching numbered circle.');});list.append(b);});}
function renderTargets(){let box=$('numbers');box.replaceChildren();parts.forEach((p,i)=>{let b=document.createElement('button');b.type='button';b.className='number'+(done.has(i)?' correct':'');b.style.left=p.x+'%';b.style.top=p.y+'%';b.textContent=i+1;b.setAttribute('aria-label','Number '+(i+1));b.disabled=done.has(i);b.addEventListener('click',()=>{if(chosen===null){status('Choose a Cree word first.');return;}if(chosen===i){done.add(i);chosen=null;status('Correct! '+p.cr+' means '+p.en+'.');renderTargets();renderWords();update();if(done.size===parts.length)status('All 12 matched. Great work! You can reset to play again.');}else{status('Not quite. Try another number.');b.classList.remove('wrong');void b.offsetWidth;b.classList.add('wrong');}});box.append(b);});}
function start(newOrder){if(newOrder||order.length===0)order=randomize(parts.map((_,i)=>i));done=new Set();chosen=null;renderWords();renderTargets();update();status('Choose a word to begin.');}
function studyInit(){let box=$('studyGrid');parts.forEach(p=>{let div=document.createElement('div');div.className='study-card';let cr=document.createElement('strong');cr.textContent=p.cr;let en=document.createElement('span');en.textContent=p.en;div.append(cr,en);box.append(div);});}
$('restart').addEventListener('click',()=>start(false));$('shuffle').addEventListener('click',()=>start(true));$('studyToggle').addEventListener('click',()=>{let st=$('study');st.hidden=!st.hidden;$('studyToggle').textContent=st.hidden?'Study word list':'Hide word list';if(!st.hidden)st.scrollIntoView({behavior:'smooth',block:'nearest'});});
studyInit();start(true);
