/* About Page JS V7.2 */
(async function(){
  let d;
  try{d=await(await fetch('../../content/about/index.json')).json()}catch{return}
  Analytics?.track('about_view');
  
  const exp=d.experience||[];
  const gear=d.equipment||[];
  
  document.getElementById('aboutContent').innerHTML=`
    <div class="about-main">
      <div class="about-hero">
        <span class="tag">ABOUT</span>
        <h1>${d.name.zh} / ${d.name.en}</h1>
        <p class="sub">Photographer · Zhengzhou & Tokyo</p>
      </div>
      <div class="statement">${d.statement.zh}</div>
      <div class="bio">${d.bio.zh}</div>
      ${exp.length?`<div class="section-title">经历</div><div class="timeline">${exp.map(e=>`<div class="timeline-item"><span class="year">${e.year}</span><div class="event">${e.zh||e.en}</div></div>`).join('')}</div>`:''}
      ${gear.length?`<div class="section-title">设备</div><div class="gear-grid">${gear.map(g=>`<div class="gear-card"><div class="name">${g.name}</div><div class="desc">${g.desc}</div></div>`).join('')}</div>`:''}
    </div>`;
})();
