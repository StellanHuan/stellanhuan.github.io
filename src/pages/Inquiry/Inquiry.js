/* Inquiry Page JS V6.3 */
(function(){
  const form=document.getElementById('inquiryForm');
  const error=document.getElementById('formError');
  const btn=document.getElementById('submitBtn');
  const success=document.getElementById('inquirySuccess');

  Analytics?.track('inquiry_start');

  form.addEventListener('submit',function(e){
    e.preventDefault();
    error.style.display='none';

    // Validate
    const name=form.name.value.trim();
    const type=form.project_type.value;
    if(!name){showError('请填写姓名');return}
    if(!type){showError('请选择项目类型');return}

    // Submit via FormSubmit
    btn.disabled=true;
    btn.textContent='提交中...';
    Analytics?.track('inquiry_submit',{project_type:type});

    fetch(form.action,{method:'POST',body:new FormData(form)})
      .then(()=>{
        form.style.display='none';
        success.style.display='block';
        // Save locally as backup
        const data={name:form.name.value,email:form.email.value,project_type:type,budget:form.budget.value,date:form.date.value,location:form.location.value,description:form.description.value,time:Date.now()};
        const existing=JSON.parse(localStorage.getItem('inquiries')||'[]');
        existing.push(data);
        localStorage.setItem('inquiries',JSON.stringify(existing));
      })
      .catch(()=>{
        // FormSubmit fallback: save locally
        const data={name:form.name.value,email:form.email.value,project_type:type,time:Date.now()};
        const existing=JSON.parse(localStorage.getItem('inquiries')||'[]');
        existing.push(data);
        localStorage.setItem('inquiries',JSON.stringify(existing));
        form.style.display='none';
        success.style.display='block';
      });
  });

  function showError(msg){error.textContent=msg;error.style.display='block'}
})();
