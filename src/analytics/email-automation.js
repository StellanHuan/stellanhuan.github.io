/* ═══════════════════════════════════
   Email Automation — V8.4
   模板渲染 + 事件追踪 + 重试机制
   ═══════════════════════════════════ */

const EmailAutomation = {
  templates: null,
  retryDelay: 5000,
  maxRetries: 3,

  async init() {
    try {
      const res = await fetch('../../content/email_templates/index.json');
      this.templates = await res.json();
    } catch (e) {
      console.warn('[Email] Templates not loaded');
    }
  },

  /* ── Template Rendering ── */
  render(templateName, data) {
    const tpl = this.templates?.[templateName];
    if (!tpl) return null;
    let subject = tpl.subject;
    let body = tpl.body;
    for (const [k, v] of Object.entries(data)) {
      subject = subject.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), v || '');
      body = body.replace(new RegExp(`\\{\\{${k}\\}\\}`, 'g'), v || '');
    }
    return { subject, body };
  },

  /* ── Send (FormSubmit.co) ── */
  async send(templateName, data, retries = 0) {
    const rendered = this.render(templateName, data);
    if (!rendered) return false;

    try {
      const formData = new FormData();
      formData.append('_subject', rendered.subject);
      formData.append('message', rendered.body);
      formData.append('_template', 'table');
      formData.append('name', data.name || '');
      formData.append('email', data.email || '');

      const res = await fetch('https://formsubmit.co/965946974@qq.com', {
        method: 'POST', body: formData
      });

      if (res.ok) {
        Analytics?.track('email_sent', { template: templateName });
        return true;
      }
      throw new Error('Send failed');
    } catch (e) {
      if (retries < this.maxRetries) {
        await new Promise(r => setTimeout(r, this.retryDelay));
        return this.send(templateName, data, retries + 1);
      }
      this._saveFailed(templateName, data);
      return false;
    }
  },

  /* ── Customer Confirmation (display on page) ── */
  showConfirmation(templateName, data, containerId) {
    const rendered = this.render(templateName, data);
    if (!rendered || !containerId) return;
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = `
      <div style="text-align:center;padding:2rem">
        <h3 style="color:var(--gold-l);margin-bottom:1rem">✓ 提交成功</h3>
        <p style="color:var(--text-d);font-size:.8rem;margin-bottom:1rem">确认邮件预览：</p>
        <div style="background:var(--card);border:1px solid var(--border);border-radius:4px;padding:1rem;text-align:left;font-size:.7rem;color:var(--text);white-space:pre-wrap;max-width:400px;margin:0 auto">${rendered.body}</div>
        <p style="color:var(--text-d);font-size:.65rem;margin-top:1rem">24小时内通过微信联系</p>
      </div>`;
    Analytics?.track('auto_reply_sent', { template: templateName });
  },

  /* ── Failed queue ── */
  _saveFailed(templateName, data) {
    try {
      const q = JSON.parse(localStorage.getItem('email_queue') || '[]');
      q.push({ template: templateName, data, time: Date.now() });
      localStorage.setItem('email_queue', JSON.stringify(q));
    } catch(e) {}
  },

  retryFailed() {
    const q = JSON.parse(localStorage.getItem('email_queue') || '[]');
    if (!q.length) return;
    q.forEach(async (item) => {
      const ok = await this.send(item.template, item.data);
      if (ok) {
        const q2 = JSON.parse(localStorage.getItem('email_queue') || '[]');
        localStorage.setItem('email_queue', JSON.stringify(q2.filter(x => x.time !== item.time)));
      }
    });
  }
};

EmailAutomation.init();
