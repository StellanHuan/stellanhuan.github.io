/* Publications Archive JS V8.3 */
(async function(){
  let pubs;
  try{pubs=await(await fetch('../../content/publications/index.json')).json()}catch{return}
  if(!pubs.length){document.getElementById('pubContent').innerHTML='<div style="text-align:center;padding:4rem;color:var(--text-d)">暂无出版记录</div>';return}
  Analytics?.track('publication_view');
  document.getElementById('pubContent').innerHTML=`<div class="pub-grid">${pubs.map((p,i)=>`
    <article class="pub-card" style="animation:fadeUp .5s var(--ease-out) ${i*.1}s both">
      ${p.cover?`<img src="../../images/${p.cover}" alt="${p.title}" loading="lazy">`:''}
      <div class="pub-info">
        <span class="pub-type">${p.type}</span>
        <h3>${p.title}</h3>
        <div class="pub-meta">${p.date} · ${p.publisher}</div>
        <div class="pub-desc">${p.description||''}</div>
        ${p.external_link?`<a class="pub-link" href="${p.external_link}" target="_blank" rel="noopener" onclick="Analytics?.track('external_link_click',{title:'${p.title}'})">阅读原文 →</a>`:''}
      </div>
    </article>`).join('')}</div>`;
})();
