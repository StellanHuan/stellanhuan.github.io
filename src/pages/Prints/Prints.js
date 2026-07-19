/* Print Store JS V7.3 */
(async function(){
  let prints;
  try{prints=await(await fetch('../../content/prints/index.json')).json()}catch{return}
  prints=prints.filter(p=>p.public);
  if(!prints.length){document.getElementById('printsGrid').innerHTML='<div class="empty" style="text-align:center;padding:4rem;color:var(--text-d)">暂无作品</div>';return}
  
  document.getElementById('printsGrid').innerHTML=prints.map((p,i)=>`
    <div class="print-card" style="animation:fadeUp .5s var(--ease-out) ${i*.1}s both">
      <img src="../../images/${p.photo}" alt="${p.title}" loading="lazy" onclick="Lightbox.open([{file:'../../images/${p.photo}',title:p.title}])">
      <div class="print-info">
        <h3>${p.title}</h3>
        <div class="print-meta"><span>${p.size}</span><span>${p.paperType||''}</span><span>${p.edition||''}</span></div>
        <div class="print-footer">
          <span class="print-price">¥${p.price}</span>
          <a href="purchase.html?id=${encodeURIComponent(p.title)}" class="print-inquire" onclick="Analytics?.track('print_interest',{print:'${p.title}'})">购买咨询 →</a>
        </div>
      </div>
    </div>`).join('');
  
  Analytics?.track('page_view',{page:'/prints'});
})();
