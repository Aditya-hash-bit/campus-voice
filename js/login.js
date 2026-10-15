/* Login page — CLIENT-SIDE VALIDATION ONLY (demo). Not real authentication. */
(() => {
  const $ = s => document.querySelector(s);
  const roles = document.querySelectorAll('.role');
  const forms = { student: $('#studentForm'), department: $('#deptForm') };
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const idRe = /^[A-Za-z0-9]{6,15}$/;

  function pick(role) {
    roles.forEach(r => { const on = r.dataset.role === role; r.classList.toggle('active', on); r.setAttribute('aria-checked', on); });
    Object.entries(forms).forEach(([k, f]) => { f.hidden = k !== role; });
    history.replaceState(null, '', '#' + role);
  }
  roles.forEach(r => {
    r.addEventListener('click', () => pick(r.dataset.role));
    r.addEventListener('keydown', e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { const o = [...roles].find(x => x !== r); pick(o.dataset.role); o.focus(); } });
  });
  if (location.hash === '#department') pick('department');

  // Show/hide password
  document.querySelectorAll('.eye').forEach(b => {
    b.addEventListener('click', () => {
      const inp = b.parentElement.querySelector('input');
      const show = inp.type === 'password';
      inp.type = show ? 'text' : 'password';
      b.innerHTML = CV.icon(show ? 'eyeoff' : 'eye');
      b.setAttribute('aria-pressed', show);
      b.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    });
  });

  function fail(input, errEl, msg) { input.classList.add('bad'); input.setAttribute('aria-invalid', 'true'); errEl.textContent = msg; }
  function ok(input, errEl) { input.classList.remove('bad'); input.removeAttribute('aria-invalid'); errEl.textContent = ''; }

  function handle(form, idInput, idErr, pwInput, pwErr, role, validateId) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let good = true, first = null;
      const idv = idInput.value.trim();
      const idMsg = !idv ? 'This field is required.' : validateId(idv);
      if (idMsg) { fail(idInput, idErr, idMsg); good = false; first = first || idInput; } else ok(idInput, idErr);
      if (!pwInput.value) { fail(pwInput, pwErr, 'Please enter your password.'); good = false; first = first || pwInput; }
      else if (pwInput.value.length < 6) { fail(pwInput, pwErr, 'Password must be at least 6 characters.'); good = false; first = first || pwInput; }
      else ok(pwInput, pwErr);
      if (!good) { first.focus(); return; }
      CV.session.set({ role, name: role === 'student' ? 'Demo Student' : 'Demo Department', id: idv });
      const t = $('#toast'); t.hidden = false; t.textContent = 'Demo sign-in successful. Redirecting…';
      setTimeout(() => { location.href = role === 'student' ? 'student-dashboard.html' : 'department-dashboard.html'; }, 600);
    });
    [idInput, pwInput].forEach(i => i.addEventListener('input', () => i.classList.remove('bad')));
  }

  handle(forms.student, $('#sId'), $('#sIdE'), $('#sPw'), $('#sPwE'), 'student',
    v => (emailRe.test(v) || idRe.test(v)) ? '' : 'Enter a valid college email or a student ID (6–15 letters/digits).');
  handle(forms.department, $('#dId'), $('#dIdE'), $('#dPw'), $('#dPwE'), 'department',
    v => emailRe.test(v) ? '' : 'Enter a valid department email address.');

  document.querySelectorAll('.forgot').forEach(a => a.addEventListener('click', e => {
    e.preventDefault(); const t = $('#toast'); t.hidden = false;
    t.textContent = 'Password reset needs a backend. Not available in this demo.';
  }));
})();
