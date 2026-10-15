/* Campus Voice — shared data, icons, storage and UI helpers.
   FRONTEND DEMO: all data is sample data; browser storage is per-browser only. */
const CV = (() => {
  const P = {
    cap: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/>',
    bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/>',
    megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
    building: '<path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1M14 9h1M9 13h1M14 13h1M9 17h6"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    briefcase: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
    eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>',
    eyeoff: '<path d="M17.9 17.9A10.9 10.9 0 0 1 12 20C5 20 1 12 1 12a18.5 18.5 0 0 1 5.1-5.9M9.9 4.2A9.1 9.1 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.2 3.2M1 1l22 22"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    radio: '<circle cx="12" cy="12" r="2"/><path d="M16.2 7.8a6 6 0 0 1 0 8.4M7.8 16.2a6 6 0 0 1 0-8.4M19.1 4.9a10 10 0 0 1 0 14.2M4.9 19.1a10 10 0 0 1 0-14.2"/>',
    cog: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    brain: '<path d="M9.5 2A3.5 3.5 0 0 0 6 5.5a3.5 3.5 0 0 0-2 6.2A3.5 3.5 0 0 0 6.5 17 3.5 3.5 0 0 0 12 19.5V4.5A2.5 2.5 0 0 0 9.5 2zM14.5 2A3.5 3.5 0 0 1 18 5.5a3.5 3.5 0 0 1 2 6.2 3.5 3.5 0 0 1-2.5 5.3 3.5 3.5 0 0 1-5.5 2.5"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5v15z"/><path d="M20 22H6.5A2.5 2.5 0 0 1 4 19.5"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8"/>',
    trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    layout: '<rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/>',
    chevron: '<path d="m6 9 6 6 6-6"/>',
    inbox: '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.5 5.1 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.5-6.9A2 2 0 0 0 16.7 4H7.2a2 2 0 0 0-1.7 1.1z"/>'
  };
  const icon = (n, s = 20) => `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ''}</svg>`;
  const hydrateIcons = (root = document) => root.querySelectorAll('[data-icon]:not([data-done])').forEach(el => {
    el.innerHTML = icon(el.dataset.icon, +el.dataset.size || 20); el.dataset.done = 1;
  });

  const CATS = ['Academics', 'Examinations', 'Placements', 'Events', 'General Notices'];
  const DEPTS = [
    { id: 'CSE', name: 'Computer Science and Engineering', icon: 'code', desc: 'Programming, systems, software engineering and research notices.' },
    { id: 'ISE', name: 'Information Science and Engineering', icon: 'layout', desc: 'Information systems, data and web technology updates.' },
    { id: 'ECE', name: 'Electronics and Communication Engineering', icon: 'radio', desc: 'Electronics, communication labs, workshops and circulars.' },
    { id: 'ME', name: 'Mechanical Engineering', icon: 'cog', desc: 'Design, manufacturing, thermal labs and industrial visits.' },
    { id: 'CE', name: 'Civil Engineering', icon: 'building', desc: 'Structures, surveying, site visits and project notices.' },
    { id: 'AIML', name: 'Artificial Intelligence and Machine Learning', icon: 'brain', desc: 'AI/ML courses, hackathons and research opportunities.' }
  ];
  const deptName = id => (DEPTS.find(d => d.id === id) || {}).name || id;

  // Sample data — clearly fictional
  const SEED = [
    { id: 's1', title: 'Internal Assessment 2 Timetable Released', dept: 'CSE', cat: 'Examinations', date: '2026-10-12', desc: 'The sample timetable for Internal Assessment 2 is now available for all semesters.', body: 'This is demonstration content. The timetable for Internal Assessment 2 lists dates, sessions and room allocations. Students should report 15 minutes before each session with their ID cards.' },
    { id: 's2', title: 'Campus Placement Registration Open', dept: 'ISE', cat: 'Placements', date: '2026-10-11', desc: 'Final-year students can register for the upcoming sample placement drive.', body: 'Demonstration content. Register with an updated resume and complete the eligibility form before the deadline. Pre-placement talks will be announced separately.' },
    { id: 's3', title: 'Revised Lab Schedule for Odd Semester', dept: 'ECE', cat: 'Academics', date: '2026-10-10', desc: 'Laboratory batches have been rearranged. Please check your updated batch allocation.', body: 'Demonstration content. Lab batches for the odd semester have been reorganised to balance equipment availability. Contact your lab coordinator for swaps.' },
    { id: 's4', title: 'Annual Tech Fest Volunteer Sign-up', dept: 'AIML', cat: 'Events', date: '2026-10-09', desc: 'Volunteers are invited to help organise the sample annual technical festival.', body: 'Demonstration content. Roles include registration desk, event coordination, logistics and hospitality. Certificates are provided to active volunteers.' },
    { id: 's5', title: 'Library Timings During Exam Weeks', dept: 'ME', cat: 'General Notices', date: '2026-10-08', desc: 'Extended library hours will be available during the examination period.', body: 'Demonstration content. The reading room stays open for extended hours during exam weeks. Please carry your ID card at all times.' },
    { id: 's6', title: 'Industrial Visit: Structural Testing Lab', dept: 'CE', cat: 'Academics', date: '2026-10-07', desc: 'Third-year students can enrol for the sample industrial visit next month.', body: 'Demonstration content. Seats are limited and allotted on a first-come basis. Submit the consent form to the department office.' },
    { id: 's7', title: 'Resume Building Workshop', dept: 'CSE', cat: 'Placements', date: '2026-10-06', desc: 'A hands-on session on writing effective resumes and professional profiles.', body: 'Demonstration content. Bring a draft of your resume. Mentors will give individual feedback during the session.' },
    { id: 's8', title: 'Semester End Exam Fee Payment Notice', dept: 'ISE', cat: 'Examinations', date: '2026-10-05', desc: 'Last date to pay examination fees without a late fine is approaching.', body: 'Demonstration content. Fees must be paid through the official channel announced by the exam section. Late payment attracts a fine.' },
    { id: 's9', title: 'Guest Lecture on Embedded Systems', dept: 'ECE', cat: 'Events', date: '2026-10-04', desc: 'An industry speaker (sample) will talk about modern embedded design.', body: 'Demonstration content. The lecture covers microcontroller selection, low-power design and career pathways in embedded engineering.' },
    { id: 's10', title: 'Code of Conduct Reminder', dept: 'AIML', cat: 'General Notices', date: '2026-10-03', desc: 'A reminder about responsible behaviour and academic integrity on campus.', body: 'Demonstration content. Students are reminded to follow the code of conduct, respect shared facilities and avoid plagiarism.' }
  ];
  const EVENTS = [
    { id: 'e1', title: 'Inter-Department Hackathon (Sample)', date: '2026-11-08', venue: 'Main Auditorium', dept: 'CSE', desc: 'A 24-hour build event for student teams across departments.' },
    { id: 'e2', title: 'Robotics Showcase (Sample)', date: '2026-11-14', venue: 'Innovation Lab', dept: 'ME', desc: 'Student robotics projects demonstrated live, with a feedback panel.' },
    { id: 'e3', title: 'Career Guidance Seminar (Sample)', date: '2026-11-20', venue: 'Seminar Hall 2', dept: 'ISE', desc: 'Talks and Q&A on higher studies, internships and careers.' },
    { id: 'e4', title: 'Green Campus Drive (Sample)', date: '2026-11-27', venue: 'Central Lawn', dept: 'CE', desc: 'A volunteer-led plantation and cleanliness drive.' }
  ];

  // Browser-side store for department-created announcements (demo only)
  const KEY = 'cv_user_announcements';
  const read = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
  const write = l => { try { localStorage.setItem(KEY, JSON.stringify(l)); } catch { /* storage blocked */ } };
  const store = {
    all: () => [...read().filter(a => a.status !== 'draft'), ...SEED].sort((a, b) => b.date.localeCompare(a.date)),
    mine: () => read(),
    add(a) { const l = read(); l.unshift(a); write(l); },
    remove(id) { write(read().filter(a => a.id !== id)); },
    find: id => [...read(), ...SEED].find(a => a.id === id)
  };

  // Demo session (NOT real authentication)
  const session = {
    get() { try { return JSON.parse(sessionStorage.getItem('cv_session')); } catch { return null; } },
    set(s) { try { sessionStorage.setItem('cv_session', JSON.stringify(s)); } catch { /* blocked */ } },
    clear() { try { sessionStorage.removeItem('cv_session'); } catch { /* blocked */ } }
  };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = d => { const x = new Date(d + 'T00:00:00'); return isNaN(x) ? d : x.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); };
  const catClass = c => 'cat-' + c.toLowerCase().replace(/[^a-z]+/g, '-');

  const card = a => `<article class="a-card">
    <div class="a-top"><span class="badge ${catClass(a.cat)}">${esc(a.cat)}</span><time datetime="${esc(a.date)}">${fmt(a.date)}</time></div>
    <h3>${esc(a.title)}</h3>
    <p class="a-dept">${icon('building', 15)} ${esc(deptName(a.dept))}</p>
    <p class="a-desc">${esc(a.desc)}</p>
    <button class="link-btn" data-open="${esc(a.id)}">Read More ${icon('arrow', 16)}</button>
  </article>`;

  function filter(list, { q = '', cat = 'All', dept = 'All' }) {
    q = q.trim().toLowerCase();
    return list.filter(a => (cat === 'All' || a.cat === cat) && (dept === 'All' || a.dept === dept) &&
      (!q || (a.title + ' ' + a.desc + ' ' + deptName(a.dept) + ' ' + a.cat).toLowerCase().includes(q)));
  }
  const empty = (msg = 'No announcements match your search.') => `<div class="empty">${icon('inbox', 36)}<p>${esc(msg)}</p></div>`;
  const skeleton = n => Array.from({ length: n }, () => '<div class="a-card skel"><i></i><i></i><i></i></div>').join('');

  // Modal (announcement or event details)
  function modal(html) {
    const prev = document.activeElement;
    const wrap = document.createElement('div');
    wrap.className = 'modal-wrap';
    wrap.innerHTML = `<div class="modal" role="dialog" aria-modal="true" tabindex="-1"><button class="modal-x" aria-label="Close">${icon('x')}</button>${html}</div>`;
    document.body.appendChild(wrap);
    const box = wrap.firstElementChild;
    const close = () => { wrap.remove(); document.removeEventListener('keydown', onKey); prev && prev.focus && prev.focus(); };
    const onKey = e => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    wrap.addEventListener('click', e => { if (e.target === wrap) close(); });
    box.querySelector('.modal-x').addEventListener('click', close);
    box.focus();
  }
  function openAnnouncement(id) {
    const a = store.find(id); if (!a) return;
    modal(`<span class="badge ${catClass(a.cat)}">${esc(a.cat)}</span><h2>${esc(a.title)}</h2>
      <p class="a-dept">${icon('building', 15)} ${esc(deptName(a.dept))} · ${fmt(a.date)}</p>
      <p>${esc(a.body || a.desc)}</p>
      ${a.audience ? `<p class="muted">Audience: ${esc(a.audience)}</p>` : ''}
      <p class="demo-note">Demonstration content — not a real college announcement.</p>`);
  }
  function openEvent(id) {
    const e = EVENTS.find(x => x.id === id); if (!e) return;
    modal(`<span class="badge cat-events">Event</span><h2>${esc(e.title)}</h2>
      <p class="a-dept">${icon('calendar', 15)} ${fmt(e.date)} · ${icon('pin', 15)} ${esc(e.venue)}</p>
      <p class="a-dept">${icon('building', 15)} ${esc(deptName(e.dept))}</p><p>${esc(e.desc)}</p>
      <p class="demo-note">Sample event for demonstration only.</p>`);
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-open]'); if (a) openAnnouncement(a.dataset.open);
    const v = e.target.closest('[data-event]'); if (v) openEvent(v.dataset.event);
  });
  document.addEventListener('DOMContentLoaded', () => hydrateIcons());

  const eventCard = e => `<article class="e-card">
    <div class="e-date"><b>${new Date(e.date + 'T00:00:00').getDate()}</b><span>${new Date(e.date + 'T00:00:00').toLocaleDateString('en-IN', { month: 'short' })}</span></div>
    <div><h3>${esc(e.title)}</h3>
    <p class="a-dept">${icon('pin', 15)} ${esc(e.venue)} · ${esc(e.dept)}</p>
    <p class="a-desc">${esc(e.desc)}</p>
    <button class="link-btn" data-event="${esc(e.id)}">View Details ${icon('arrow', 16)}</button></div>
  </article>`;

  return { icon, hydrateIcons, CATS, DEPTS, deptName, EVENTS, store, session, esc, fmt, card, eventCard, filter, empty, skeleton, openAnnouncement, catClass };
})();
