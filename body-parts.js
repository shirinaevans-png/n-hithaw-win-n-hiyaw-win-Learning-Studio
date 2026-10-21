use strict';
const PARTS = [
  {id:'hair', en:'Hair', cr:'mêstakaya', x:50, y:11},
  {id:'head', en:'Head', cr:'mistikwân', x:50, y:21},
  {id:'eye', en:'Eye', cr:'miskîsik', x:45, y:25},
  {id:'nose', en:'Nose', cr:'mikot', x:50, y:28},
  {id:'ear', en:'Ear', cr:'mihtawakay', x:61, y:25},
  {id:'mouth', en:'Mouth', cr:'mitôn', x:50, y:32},
  {id:'shoulder', en:'Shoulder', cr:'mitihtimon', x:34, y:43},
  {id:'arm', en:'Arm', cr:'mispiton', x:67, y:45},
  {id:'hand', en:'Hand', cr:'micihciy', x:65, y:57},
  {id:'stomach', en:'Stomach', cr:'matay', x:50, y:54},
  {id:'leg', en:'Leg', cr:'miskât', x:42, y:80},
  {id:'foot', en:'Foot', cr:'misit', x:62, y:96}
];

const $ = id => document.getElementById(id);
let matched = new Set();
let selectedId = null;
let wordOrder = [];

function shuffle(arr){
  const copy = [...arr];
  for(let i = copy.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function partById(id){
  return PARTS.find(p => p.id === id);
}

function renderWords(){
  const list = $('wordList');
  list.replaceChildren();
  wordOrder.forEach(id => {
    const p = partById(id);
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'word-btn';
    if(matched.has(id)) btn.classList.add('done');
    if(selectedId === id) btn.classList.add('selected');
    btn.disabled = matched.has(id);
    btn.innerHTML = `<strong>${p.cr}</strong>${matched.has(id) ? '<span>Matched</span>' : '<span>Click, then choose on the picture</span>'}`;
    btn.addEventListener('click', () => {
      selectedId = id;
      $('currentWord').textContent = `${p.cr}`;
      $('feedback').textContent = 'Now click the matching body part on the picture.';
      renderWords();
      renderHotspots();
    });
    list.append(btn);
  });
}

function renderHotspots(){
  const wrap = $('hotspots');
  wrap.replaceChildren();
  PARTS.forEach(p => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'hotspot';
    btn.style.left = p.x + '%';
    btn.style.top = p.y + '%';
    btn.setAttribute('aria-label', p.en);
    if(matched.has(p.id)) btn.classList.add('matched');
    if(selectedId === p.id) btn.classList.add('targeting');
    btn.addEventListener('click', () => handleHotspotClick(p.id, btn));
    wrap.append(btn);
  });
}

function updateProgress(){
  const count = matched.size;
  const total = PARTS.length;
  const percent = Math.round((count / total) * 100);
  $('progressText').textContent = `${count} / ${total} matched`;
  $('progressPercent').textContent = `${percent}%`;
  $('progressFill').style.width = `${percent}%`;
  if(count === total){
    $('currentWord').textContent = 'All done!';
    $('feedback').textContent = 'Excellent — you matched all of the body-part words.';
    selectedId = null;
  }
}

function chooseNextWord(){
  const remaining = wordOrder.filter(id => !matched.has(id));
  selectedId = remaining.length ? remaining[0] : null;
  if(selectedId){
    $('currentWord').textContent = partById(selectedId).cr;
  }
}

function handleHotspotClick(clickedId, el){
  if(matched.size === PARTS.length){
    $('feedback').textContent = 'You already finished the activity. Use Reset activity to play again.';
    return;
  }
  if(!selectedId){
    $('feedback').textContent = 'Choose a Cree word first.';
    return;
  }
  if(clickedId === selectedId){
    matched.add(clickedId);
    const p = partById(clickedId);
    $('feedback').textContent = `Correct! ${p.cr} = ${p.en}.`;
    chooseNextWord();
    if(selectedId){
      $('currentWord').textContent = partById(selectedId).cr;
    }
    renderWords();
    renderHotspots();
    updateProgress();
  } else {
    $('feedback').textContent = 'Not quite. Try another circle.';
    el.classList.add('wrong');
    setTimeout(() => el.classList.remove('wrong'), 420);
  }
}

function renderStudy(){
  const grid = $('studyGrid');
  grid.replaceChildren();
  PARTS.forEach(p => {
    const card = document.createElement('article');
    card.className = 'study-item';
    card.innerHTML = `<p class="study-cree">${p.cr}</p><p class="study-en">${p.en}</p>`;
    grid.append(card);
  });
}

function resetActivity(shuffleWords = false){
  matched = new Set();
  if(shuffleWords || !wordOrder.length) wordOrder = shuffle(PARTS.map(p => p.id));
  selectedId = null;
  $('currentWord').textContent = 'Choose a word to begin.';
  $('feedback').textContent = 'Ready when you are.';
  renderWords();
  renderHotspots();
  updateProgress();
}

function switchPanel(which){
  const match = which === 'match';
  $('matchPanel').hidden = !match;
  $('studyPanel').hidden = match;
  $('matchTab').classList.toggle('active', match);
  $('studyTab').classList.toggle('active', !match);
  $('matchTab').setAttribute('aria-selected', String(match));
  $('studyTab').setAttribute('aria-selected', String(!match));
}

$('resetBtn').addEventListener('click', () => resetActivity(false));
$('shuffleBtn').addEventListener('click', () => resetActivity(true));
$('matchTab').addEventListener('click', () => switchPanel('match'));
$('studyTab').addEventListener('click', () => switchPanel('study'));

renderStudy();
resetActivity(true);
