(()=>{'use strict';
const get=id=>document.getElementById(id);
const button=get('giellaGenerate'), result=get('giellaResult'), status=get('giellaStatus');
if(!button||!result||!status)return;
const config=window.CREE_GIELLALT_CONFIG||{};
if(!config.endpoint){status.textContent='External GiellaLT generator is not connected. The recorded forms elsewhere on this page remain available.';button.disabled=true;return;}
button.addEventListener('click',async()=>{
 const analysis=get('giellaAnalysis').value.trim();
 if(!analysis||analysis.length>180){status.textContent='Enter a Plains Cree lemma and grammatical tags.';return;}
 status.textContent='Requesting Plains Cree forms…';result.replaceChildren();button.disabled=true;
 try{
  const res=await fetch(config.endpoint.replace(/\/$/,'')+'/generate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({analysis,dialect:'plains'})});
  const data=await res.json();if(!res.ok)throw Error(data.error||'Generator unavailable');
  status.textContent=data.forms?.length?'Experimental GiellaLT forms. Check against a published paradigm or Cree speaker.':'No form returned for those grammatical tags; this does not mean the form is ungrammatical.';
  for(const form of data.forms||[]){let item=document.createElement('li');item.textContent=form;result.append(item)}
 }catch(e){status.textContent='Generator unavailable: '+e.message}
 finally{button.disabled=false}
});
})();
