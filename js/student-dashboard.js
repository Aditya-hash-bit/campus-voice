/* Student dashboard (frontend demo) */
(() => {
  if (!Dash.guard('student')) return;
  const $ = s => document.querySelector(s);
  const MY_DEPT = 'CSE';
  const state = { q: '', cat: 'All', dept: 'All' };
  const notifs = [
    { t: 'Internal Assessment 2 timetable published', d: 'Examinations · 2 days ago', unread: true, icon: 'file' },
    { t: 'Placement registration is open', d: 'Placements · 3 days ago', unread: true, icon: 'briefcase' },
    { t: 'Hackathon registrations start next week', d: 'Events · 4 days ago', unread: true, icon: 'calendar' },
    { t: 'Library timings updated', d: 'General Notices · 6 days ago', unread: false, icon: 'book' }
  ];

  function renderAnn() {
    const list = CV.filter(CV.store.all(), state);
    $('#aGrid').innerHTML = list.length ? list.map(CV.card).join('') : CV.empty();
  }
  function renderNotifs() {
    const n = notifs.filter(x => x.unread).length;
    $('#notifList').innerHTML = notifs.map(x => `<div class="mini${x.unread ? ' unread' : ''}"><div class="ico-box">${CV.icon(x.icon, 18)}</div><div><b>${x.t}</b><small>${x.d}</small></div></div>`).join('');
    $('#stN').textContent = n; $('#sideCount').textContent = n; $('#sideCount').hidden = !n; $('#bellDot').hidden = !n;
  }
  function renderHome() {
    const all = CV.store.all();
    $('#stA').textContent = all.length; $('#stE').textContent = CV.EVENTS.length; $('#stD').textContent = all.filter(a => a.dept === MY_DEPT).length;
    $('#latest').innerHTML = all.slice(0, 3).map(CV.card).join('');
    $('#upEvents').innerHTML = CV.EVENTS.slice(0, 2).map(CV.eventCard).join('');
    $('#recent').innerHTML = all.slice(3, 7).map(a => `<div class="mini"><div class="ico-box">${CV.icon('file', 18)}</div><div><b>${CV.esc(a.title)}</b><small>${CV.esc(a.dept)} · ${CV.fmt(a.date)}</small></div></div>`).join('');
    const mine = all.filter(a => a.dept === MY_DEPT);
    $('#deptUpd').innerHTML = mine.length ? mine.slice(0, 2).map(CV.card).join('') : CV.empty('No department updates yet.');
    $('#myDept').innerHTML = mine.length ? mine.map(CV.card).join('') : CV.empty('No department updates yet.');
    $('#allEvents').innerHTML = CV.EVENTS.map(CV.eventCard).join('');
  }

  $('#chips').innerHTML = ['All', ...CV.CATS].map(c => `<button class="chip${c === 'All' ? ' active' : ''}" data-cat="${c}" aria-pressed="${c === 'All'}">${c}</button>`).join('');
  $('#deptSel').insertAdjacentHTML('beforeend', CV.DEPTS.map(d => `<option value="${d.id}">${d.name}</option>`).join(''));
  $('#chips').addEventListener('click', e => {
    const c = e.target.closest('.chip'); if (!c) return; state.cat = c.dataset.cat;
    document.querySelectorAll('.chip').forEach(x => { x.classList.toggle('active', x === c); x.setAttribute('aria-pressed', x === c); });
    renderAnn();
  });
  $('#deptSel').addEventListener('change', e => { state.dept = e.target.value; renderAnn(); });

  const nav = Dash.init(['dashboard', 'announcements', 'department', 'events', 'notifications', 'profile'], v => { if (v === 'announcements') renderAnn(); });
  $('#topQ').addEventListener('input', e => {
    state.q = e.target.value;
    if (!location.hash.includes('announcements')) location.hash = 'announcements'; else renderAnn();
  });
  $('#bellBtn').addEventListener('click', () => { location.hash = 'notifications'; });
  $('#markRead').addEventListener('click', () => { notifs.forEach(n => n.unread = false); renderNotifs(); Dash.toast('All notifications marked as read'); });

  renderHome(); renderNotifs(); renderAnn();
})();
