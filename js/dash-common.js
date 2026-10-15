/* Shared dashboard behaviour: guard, sidebar, profile menu, view switching, toast.
   NOTE: the role guard below is a client-side convenience for the demo only.
   Anyone can edit sessionStorage in dev tools; real access control requires a server. */
const Dash = (() => {
  function guard(role) {
    const s = CV.session.get();
    if (!s || s.role !== role) { location.replace('login.html#' + role); return null; }
    return s;
  }
  function toast(msg) {
    const t = document.createElement('div'); t.className = 'toast-fixed'; t.setAttribute('role', 'status'); t.textContent = msg;
    document.body.appendChild(t); setTimeout(() => t.remove(), 2600);
  }
  function init(views, onView) {
    const body = document.body;
    const toggle = document.getElementById('sideToggle'), scrim = document.getElementById('scrim');
    const closeSide = () => { body.classList.remove('side-open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => { const o = body.classList.toggle('side-open'); toggle.setAttribute('aria-expanded', o); });
    scrim.addEventListener('click', closeSide);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeSide(); document.getElementById('pMenu').classList.remove('open'); } });

    const pb = document.getElementById('pBtn'), pm = document.getElementById('pMenu');
    pb.addEventListener('click', e => { e.stopPropagation(); const o = pm.classList.toggle('open'); pb.setAttribute('aria-expanded', o); });
    document.addEventListener('click', () => pm.classList.remove('open'));

    document.querySelectorAll('[data-logout]').forEach(b => b.addEventListener('click', () => { CV.session.clear(); location.href = 'index.html'; }));

    function show(name) {
      if (!views.includes(name)) name = views[0];
      views.forEach(v => { const el = document.getElementById('view-' + v); if (el) el.hidden = v !== name; });
      document.querySelectorAll('.side-link[data-view]').forEach(l => { const on = l.dataset.view === name; l.classList.toggle('active', on); on ? l.setAttribute('aria-current', 'page') : l.removeAttribute('aria-current'); });
      const title = document.querySelector('.side-link[data-view="' + name + '"]');
      document.getElementById('pageTitle').textContent = title ? title.dataset.title || title.textContent.trim() : '';
      closeSide(); window.scrollTo(0, 0);
      onView && onView(name);
    }
    document.querySelectorAll('[data-view]').forEach(l => l.addEventListener('click', e => { e.preventDefault(); location.hash = l.dataset.view; }));
    window.addEventListener('hashchange', () => show(location.hash.slice(1)));
    show(location.hash.slice(1));
    return { show };
  }
  return { guard, toast, init };
})();
