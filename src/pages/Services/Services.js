/* Services Page JS V6.2 */
(async function(){
  let data;
  try{data=await(await fetch('../../content/services/index.json')).json()}catch{return}
  
  document.getElementById('svcTitle').textContent=data.title.zh+' / '+data.title.en;
  document.getElementById('svcDesc').textContent=data.description.zh;
  Analytics?.track('service_view');
  
  document.getElementById('svcCards').innerHTML=data.categories.map((c,i)=>`
    <div class="svc-card" style="animation:fadeUp .5s var(--ease-out) ${i*.15}s both">
      <div class="icon">${c.icon}</div>
      <h2>${c.name.zh} / ${c.name.en}</h2>
      <div class="price">${c.price}</div>
      <div class="desc">${c.description.zh}</div>
      <ul class="features">${(c.features.zh||c.features.en).map(f=>`<li>${f}</li>`).join('')}</ul>
    </div>`).join('');
  
  document.getElementById('svcProcess').innerHTML=`
    <h3 data-lang="zh">预约流程</h3>
    <div class="process-steps">${data.process.map((s,i)=>`
      <div class="process-item">${i>0?'<div class="process-arrow">→</div>':''}<div class="process-num">${s.step}</div><div class="process-label">${s.zh||s.en}</div></div>
    `).join('')}</div>`;
  
  document.getElementById('svcCta').innerHTML=`
    <p>${data.cta.zh}</p>
    <span class="btn" onclick="navigator.clipboard?.writeText('S0688888860');this.textContent='✓ 已复制';Analytics?.track('wechat_copy')">复制微信号</span>`;
})();
