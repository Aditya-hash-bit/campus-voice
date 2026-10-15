/* Homepage behaviour */
(() => {
  const $ = s => document.querySelector(s);
  const state = { q: '', cat: 'All', dept: 'All', all: false };

  // Mobile menu
  const btn = $('#menuBtn'), nav = $('#nav');
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
    btn.innerHTML = CV.icon(open ? 'x' : 'menu');
  });
  nav.addEventListener('click', e => { if (e.target.tagName === 'A') { nav.classList.remove('open'); btn.setAttribute('aria-expanded', false); btn.innerHTML = CV.icon('menu'); } });

  // Filters
  $('#chips').innerHTML = ['All', ...CV.CATS].map(c => `<button class="chip${c === 'All' ? ' active' : ''}" data-cat="${c}" aria-pressed="${c === 'All'}">${c}</button>`).join('');
  $('#deptSel').insertAdjacentHTML('beforeend', CV.DEPTS.map(d => `<option value="${d.id}">${d.name}</option>`).join(''));

  function render() {
    const list = CV.filter(CV.store.all(), state);
    const shown = state.all || state.q || state.cat !== 'All' || state.dept !== 'All' ? list : list.slice(0, 6);
    $('#aGrid').innerHTML = shown.length ? shown.map(CV.card).join('') : CV.empty();
    const vb = $('#viewAll');
    vb.hidden = list.length <= 6 || state.q || state.cat !== 'All' || state.dept !== 'All';
    vb.textContent = state.all ? 'Show Fewer' : 'View All Announcements';
  }
  $('#q').addEventListener('input', e => { state.q = e.target.value; render(); });
  $('#deptSel').addEventListener('change', e => { state.dept = e.target.value; render(); });
  $('#chips').addEventListener('click', e => {
    const c = e.target.closest('.chip'); if (!c) return;
    state.cat = c.dataset.cat;
    document.querySelectorAll('.chip').forEach(x => { x.classList.toggle('active', x === c); x.setAttribute('aria-pressed', x === c); });
    render();
  });
  $('#viewAll').addEventListener('click', () => { state.all = !state.all; render(); });

  // Loading state, then render
  $('#aGrid').innerHTML = CV.skeleton(3);
  setTimeout(render, 350);

  // Departments
  $('#dGrid').innerHTML = CV.DEPTS.map(d => `<div class="d-card"><div class="ico-box">${CV.icon(d.icon, 24)}</div><h3>${d.name}</h3><p>${d.desc}</p>
    <button class="link-btn" data-dept="${d.id}">Explore Updates ${CV.icon('arrow', 16)}</button></div>`).join('');
  $('#dGrid').addEventListener('click', e => {
    const b = e.target.closest('[data-dept]'); if (!b) return;
    state.dept = b.dataset.dept; state.cat = 'All'; state.q = ''; $('#q').value = '';
    $('#deptSel').value = state.dept;
    document.querySelectorAll('.chip').forEach(x => { const on = x.dataset.cat === 'All'; x.classList.toggle('active', on); x.setAttribute('aria-pressed', on); });
    render(); $('#announcements').scrollIntoView({ behavior: 'smooth' });
  });
  $('#fDepts').innerHTML = CV.DEPTS.map(d => `<li><a href="#departments">${d.id} — ${d.name.split(' and ')[0]}</a></li>`).join('');

  // Events
  $('#eGrid').innerHTML = CV.EVENTS.map(CV.eventCard).join('');
})();
