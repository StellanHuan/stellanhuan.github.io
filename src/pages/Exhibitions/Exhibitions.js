/* Exhibition Archive JS V8.2 */
(async function(){
  let exhs;
  try{exhs=await(await fetch('../../content/exhibitions/index.json')).json()}catch{return}
  if(!exhs.length){document.getElementById('exhContent').innerHTML='<div style="text-align:center;padding:4rem;color:var(--text-d)">暂无展览</div>';return}
  Analytics?.track('exhibition_view');
  
  exhs.sort((a,b)=>b.year-a.year);
  document.getElementById('exhContent').innerHTML=`<div class="exh-list">${exhs.map((e,i)=>`
    <article class="exh-card" style="animation:fadeUp .5s var(--ease-out) ${i*.15}s both">
      <div class="exh-year">${e.year}</div>
      <div class="exh-body">
        <h2>${e.title}</h2>
        <div class="exh-meta"><span>${e.venue}</span><span>${e.location}</span></div>
        <div class="exh-desc">${e.description||''}</div>
        ${e.cover?`<img class="exh-cover" src="../../images/${e.cover}" alt="${e.title}" loading="lazy" onclick="Lightbox.open([{file:'../../images/${e.cover}',title:'${e.title}'}])">`:''}
      </div>
    </article>`).join('')}</div>`;
})();
