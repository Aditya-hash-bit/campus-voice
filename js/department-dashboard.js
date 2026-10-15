/* Department dashboard (frontend demo). Storage = localStorage, per browser only. */
(() => {
  if (!Dash.guard('department')) return;
  const $ = s => document.querySelector(s);
  const today = new Date().toISOString().slice(0, 10);

  $('#fDept').innerHTML = CV.DEPTS.map(d => `<option value="${d.id}">${d.name}</option>`).join('');
  $('#fCat').innerHTML = CV.CATS.map(c => `<option>${c}</option>`).join('');

  function resetForm() { $('#annForm').reset(); $('#fPub').value = today; $('#fDept').value = 'CSE'; document.querySelectorAll('.err').forEach(e => e.textContent = ''); document.querySelectorAll('.bad').forEach(e => e.classList.remove('bad')); }

  function row(a, withDelete) {
    const sample = !a.mine;
    return `<tr><td><b>${CV.esc(a.title)}</b></td><td>${CV.esc(a.dept)}</td><td>${CV.esc(a.cat)}</td><td>${CV.fmt(a.date)}</td>
      <td><span class="status ${sample ? 'st-sample' : a.status === 'draft' ? 'st-draft' : 'st-published'}">${sample ? 'Sample' : a.status === 'draft' ? 'Draft' : 'Published'}</span></td>
      <td><button class="link-btn" data-open="${CV.esc(a.id)}">View</button>${withDelete && !sample ? ` <button class="danger" data-del="${CV.esc(a.id)}">Delete</button>` : ''}</td></tr>`;
  }
  const table = rows => rows.length ? `<table><thead><tr><th>Title</th><th>Dept</th><th>Category</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead><tbody>${rows}</tbody></table>` : CV.empty('Nothing here yet. Publish your first announcement.');

  function render() {
    const mine = CV.store.mine().map(a => ({ ...a, mine: true }));
    const sample = CV.store.all().filter(a => !mine.some(m => m.id === a.id) && !/^u/.test(a.id)).map(a => ({ ...a, mine: false }));
    const all = [...mine, ...sample];
    $('#stP').textContent = mine.filter(a => a.status !== 'draft').length;
    $('#stDr').textContent = mine.filter(a => a.status === 'draft').length;
    $('#stEv').textContent = CV.EVENTS.length;
    $('#recentTbl').innerHTML = table(all.slice(0, 5).map(a => row(a, false)).join(''));
    $('#manageTbl').innerHTML = table(all.map(a => row(a, true)).join(''));
    $('#evGrid').innerHTML = CV.EVENTS.map(CV.eventCard).join('');
    $('#notifStatus').innerHTML = mine.length ? mine.map(a => `<div class="mini"><div class="ico-box">${CV.icon(a.status === 'draft' ? 'file' : 'check', 18)}</div><div><b>${CV.esc(a.title)}</b><small>${a.status === 'draft' ? 'Draft. Not sent to students' : 'Marked as published (demo, no real notification sent)'}</small></div></div>`).join('') : CV.empty('No notifications yet.');
  }

  function validate() {
    let ok = true; const set = (i, e, m) => { $(i).classList.toggle('bad', !!m); $(e).textContent = m || ''; if (m) ok = false; };
    set('#fTitle', '#eTitle', $('#fTitle').value.trim() ? '' : 'Please enter a title.');
    set('#fDesc', '#eDesc', $('#fDesc').value.trim().length >= 10 ? '' : 'Description must be at least 10 characters.');
    set('#fPub', '#ePub', $('#fPub').value ? '' : 'Choose a publication date.');
    set('#fExp', '#eExp', $('#fExp').value && $('#fExp').value < $('#fPub').value ? 'Expiry must be after the publication date.' : '');
    if (!ok) document.querySelector('.bad').focus();
    return ok;
  }
  function save(status) {
    if (status === 'published' && !validate()) return;
    if (status === 'draft' && !$('#fTitle').value.trim()) { $('#fTitle').classList.add('bad'); $('#eTitle').textContent = 'A draft needs at least a title.'; $('#fTitle').focus(); return; }
    const desc = $('#fDesc').value.trim();
    CV.store.add({ id: 'u' + Date.now(), title: $('#fTitle').value.trim(), desc: desc.slice(0, 140) + (desc.length > 140 ? '…' : ''), body: desc,
      dept: $('#fDept').value, cat: $('#fCat').value, audience: $('#fAud').value, date: $('#fPub').value || today, expiry: $('#fExp').value, status });
    Dash.toast(status === 'draft' ? 'Draft saved in this browser' : 'Announcement published (demo, this browser only)');
    resetForm(); render(); location.hash = 'manage';
  }
  $('#annForm').addEventListener('submit', e => { e.preventDefault(); save('published'); });
  $('#saveDraft').addEventListener('click', () => save('draft'));
  $('#cancel').addEventListener('click', () => { resetForm(); location.hash = 'overview'; });
  $('#manageTbl').addEventListener('click', e => {
    const d = e.target.closest('[data-del]'); if (!d || !confirm('Delete this announcement?')) return;
    CV.store.remove(d.dataset.del); render(); Dash.toast('Announcement deleted');
  });

  Dash.init(['overview', 'publish', 'manage', 'events', 'notifications', 'profile']);
  resetForm(); render();
})();
