/* Performance Monitor V9.3 */
(function(){
  const store=JSON.parse(localStorage.getItem('health_events')||'[]');
  const MAX=500;

  function log(type,data={}){
    store.push({type,data,time:Date.now(),url:location.pathname});
    if(store.length>MAX)store.splice(0,store.length-MAX);
    localStorage.setItem('health_events',JSON.stringify(store));
  }

  // JS Errors
  window.addEventListener('error',e=>{log('js_error',{msg:e.message,file:e.filename,line:e.lineno})});
  window.addEventListener('unhandledrejection',e=>{log('promise_error',{msg:e.reason?.message||String(e.reason)})});

  // Image Errors
  document.addEventListener('error',e=>{if(e.target.tagName==='IMG')log('image_error',{src:e.target.src})},true);

  // 404 detection (client-side)
  const origFetch=window.fetch;
  window.fetch=function(...args){
    return origFetch.apply(this,args).then(r=>{if(r.status===404)log('fetch_404',{url:args[0]});return r}).catch(e=>{log('fetch_error',{url:args[0],msg:e.message});throw e});
  };

  // Core Web Vitals
  if(window.PerformanceObserver){
    try{
      new PerformanceObserver(l=>{l.getEntries().forEach(e=>log('lcp',{value:Math.round(e.startTime)}))}).observe({type:'largest-contentful-paint',buffered:true});
    }catch(e){}
    try{
      new PerformanceObserver(l=>{l.getEntries().forEach(e=>{if(!e.hadRecentInput)log('cls',{value:e.value.toFixed(4)})})}).observe({type:'layout-shift',buffered:true});
    }catch(e){}
  }

  // Page load
  window.addEventListener('load',()=>{
    const t=performance?.getEntriesByType?.('navigation')?.[0];
    if(t)log('page_load',{loadTime:Math.round(t.loadEventEnd-t.fetchStart),domReady:Math.round(t.domContentLoadedEventEnd-t.fetchStart)});
  });

  console.log('%c[Health Monitor] %cActive','color:#b8934f','color:#d4cec4');
})();
