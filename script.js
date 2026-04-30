/* ════════════════════════════════════════════════════════
   PORTFOLIO — MAIN SCRIPT
   Stages: Terminal → Library → Rockstar Intro → Portfolio
   + Weapon Wheel for Projects & Skills
════════════════════════════════════════════════════════ */

'use strict';

// ─────────────────────────────────────────────
// DATA — Wheel segments
// ─────────────────────────────────────────────
const PROJECTS_WHEEL = [
  { icon: '🚗', title: 'BMW TRACKER', desc: 'CV vehicle tracking for BMW', color: '#0066b1', url: null },
  { icon: '🏥', title: 'GETCARE AI', desc: 'AI healthcare analytics', color: '#10b981', url: null },
  { icon: '📁', title: 'FILEDROP', desc: 'Full-stack file sharing app', color: '#00ffff', url: 'https://filedrop-gules.vercel.app' },
  { icon: '💼', title: 'BSA', desc: 'Blue Sphere Accounting platform', color: '#ff0080', url: null },
  { icon: '🌐', title: 'PORTFOLIO', desc: 'This portfolio website', color: '#8000ff', url: null },
  { icon: '🍳', title: 'SMART COOKER', desc: 'IoT cooker with Arduino & Python', color: '#ff8000', url: null },
  { icon: '💨', title: 'AIR PURIFIER', desc: 'Smart air quality monitor', color: '#00ff80', url: null },
  { icon: '🧬', title: 'BARBARA MC', desc: 'Educational genetics website', color: '#ff4080', url: null },
  { icon: '🔌', title: 'LAN CONFIG', desc: 'Cisco network configuration', color: '#ffff00', url: null },
];

const SKILLS_WHEEL = [
  { icon: '💻', title: 'PROGRAMMING', desc: 'Python · C++ · Java · JS/TS', color: '#ff0080' },
  { icon: '🌐', title: 'WEB DEV', desc: 'React · Node.js · Express · FastAPI', color: '#00ffff' },
  { icon: '🤖', title: 'AI / CV', desc: 'YOLOv8 · OpenCV · LLMs · ByteTrack', color: '#10b981' },
  { icon: '🗄️', title: 'DATABASE', desc: 'SQL · PostgreSQL · Supabase', color: '#8000ff' },
  { icon: '⚙️', title: 'DEVOPS', desc: 'Linux · GitHub · Vercel · Render', color: '#ff8000' },
  { icon: '🔌', title: 'IOT', desc: 'Arduino · Tinkercad · Sensors', color: '#00ff80' },
  { icon: '📡', title: 'NETWORKING', desc: 'LAN · Cisco Packet Tracer', color: '#ff4040' },
  { icon: '🎨', title: 'DESIGN', desc: 'Figma · UI/UX · Unity 3D', color: '#ffff00' },
  { icon: '🤝', title: 'SOFT SKILLS', desc: 'Problem-Solving · Teamwork', color: '#ff80ff' },
];

// ─────────────────────────────────────────────
// UTIL
// ─────────────────────────────────────────────
const $ = id => document.getElementById(id);
const qs = sel => document.querySelector(sel);

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }



// ─────────────────────────────────────────────
// STAGE TRANSITIONS
// ─────────────────────────────────────────────
function showStage(id) {
  document.querySelectorAll('.stage').forEach(s => {
    s.classList.remove('show');
    s.classList.add('hiding');
  });
  const next = $(id);
  if (!next) return;
  setTimeout(() => {
    document.querySelectorAll('.stage').forEach(s => s.classList.remove('hiding'));
    next.classList.add('show');
  }, 50);
}

function endAllStages() {
  document.querySelectorAll('.stage').forEach(s => {
    s.classList.remove('show');
  });
  document.body.classList.remove('no-scroll');
  // scroll to top of main content
  window.scrollTo(0, 0);
}

// ─────────────────────────────────────────────
// STAGE 1 — TERMINAL
// ─────────────────────────────────────────────
async function runTerminal() {
  const body = $('terminal-body');

  const lines = [
    { type: 'cmd', text: 'whoami' },
    { type: 'out', text: 'houssam-aitmoulay' },
    { type: 'cmd', text: 'cat welcome.txt' },
    { type: 'out', text: '> Hello! Welcome to my portfolio.' },
    { type: 'out', text: '> CS student · Full-Stack Developer · AI Engineering Enthusiast' },
    { type: 'out', text: '> Birmingham City University, UK' },
    { type: 'cmd', text: 'launch --portfolio' },
    { type: 'out', text: 'Initializing game library...' },
    { type: 'out', text: 'Loading profile data........  [OK]' },
    { type: 'out', text: 'Fetching projects...........  [OK]' },
    { type: 'out', text: 'Done. Launching library interface.' },
  ];

  // Add skip button
  const skipBtn = document.createElement('button');
  skipBtn.className = 't-skip-btn';
  skipBtn.textContent = 'PRESS ANY KEY TO SKIP';
  body.appendChild(skipBtn);

  let skipped = false;
  const skip = () => { if (!skipped) { skipped = true; goToLibrary(); } };
  skipBtn.addEventListener('click', skip);
  document.addEventListener('keydown', skip, { once: true });

  for (const line of lines) {
    if (skipped) return;
    await renderTerminalLine(body, line);
    await sleep(line.type === 'cmd' ? 1000 : 500);
  }

  if (!skipped) {
    await sleep(800);
    goToLibrary();
  }
}

async function renderTerminalLine(container, line) {
  const row = document.createElement('div');
  row.className = 't-line';

  if (line.type === 'cmd') {
    const prompt = document.createElement('span');
    prompt.className = 't-prompt';
    prompt.textContent = 'houssam@portfolio ~ $';
    const cmd = document.createElement('span');
    cmd.className = 't-cmd';
    row.appendChild(prompt);
    row.appendChild(cmd);
    container.insertBefore(row, container.lastElementChild);
    // type the command
    for (const ch of line.text) {
      cmd.textContent += ch;
      await sleep(90);
    }
  } else {
    const out = document.createElement('span');
    out.className = 't-out';
    out.textContent = line.text;
    row.appendChild(out);
    container.insertBefore(row, container.lastElementChild);
  }
}

function goToLibrary() {
  showStage('stage-library');
}

// ─────────────────────────────────────────────
// STAGE 2 — GAME LIBRARY
// ─────────────────────────────────────────────
function initLibrary() {
  const btn = $('launch-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    btn.textContent = 'LAUNCHING...';
    btn.style.opacity = '.7';
    setTimeout(() => showStage('stage-rockstar'), 600);
    setTimeout(() => runRockstarIntro(), 700);
  });
}

// ─────────────────────────────────────────────
// STAGE 3 — ROCKSTAR INTRO
// ─────────────────────────────────────────────
async function runRockstarIntro() {
  const namecard = $('rs-namecard');
  const loaderEl = $('rs-loader');
  const barFill = $('rs-bar-fill');
  const sirenL = qs('.rs-siren-left');
  const sirenR = qs('.rs-siren-right');

  // Phase 1 — name card fades in
  await sleep(500);
  namecard.classList.add('visible');

  // Phase 2 — siren lights
  await sleep(800);
  sirenL.classList.add('active');
  sirenR.classList.add('active');

  // Phase 3 — loader appears & fills
  await sleep(900);
  sirenL.classList.remove('active');
  sirenR.classList.remove('active');
  loaderEl.classList.add('visible');
  await sleep(100);
  barFill.style.width = '100%';

  // Phase 4 — transition to main
  await sleep(1800);
  endAllStages();
}

// ─────────────────────────────────────────────
// NAV — burger menu + scroll highlight
// ─────────────────────────────────────────────
function initNav() {
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('.s-intro, .s-section');
  const navLinks = document.querySelectorAll('.nav-link');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active-link'));
        const id = entry.target.id;
        const map = { intro: '#intro', experience: '#experience', projects: '#projects', skills: '#skills', languages: '#languages', contact: '#contact' };
        const active = document.querySelector(`.nav-link[href="${map[id] || '#' + id}"]`);
        if (active) active.classList.add('active-link');
      }
    });
  }, { rootMargin: '-30% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));

}

// ─────────────────────────────────────────────
// SECTION ENTRANCE ANIMATIONS
// ─────────────────────────────────────────────
function initSectionAnims() {
  const sections = document.querySelectorAll('.s-section, .s-intro');
  const io = new IntersectionObserver(entries => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        io.unobserve(e.target);
      }
    });
  }, { threshold: .06 });
  sections.forEach(s => {
    s.style.opacity = '0';
    s.style.transform = 'translateY(24px)';
    s.style.transition = 'opacity .6s ease, transform .6s ease';
    io.observe(s);
  });
}

// ─────────────────────────────────────────────
// WANTED STARS
// ─────────────────────────────────────────────
function initStars() {
  document.querySelectorAll('.wanted-stars').forEach(container => {
    const level = parseInt(container.getAttribute('data-level')) || 0;
    container.innerHTML = '';
    for (let i = 0; i < 5; i++) {
      const s = document.createElement('span');
      s.className = 'star ' + (i < level ? 'filled' : 'empty');
      s.textContent = '★';
      s.style.animationDelay = `${i * 0.12}s`;
      container.appendChild(s);
    }
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.classList.contains('animate')) {
        e.target.classList.add('animate');
      }
    });
  }, { threshold: .4 });
  document.querySelectorAll('.wanted-stars').forEach(c => io.observe(c));
}



// ─────────────────────────────────────────────
// WEB AUDIO — subtle UI sounds
// ─────────────────────────────────────────────
let audioCtx = null;
function getAudio() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch { }
  }
  return audioCtx;
}
function playBeep(freq = 900, dur = 40, vol = .06) {
  const ctx = getAudio(); if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain); gain.connect(ctx.destination);
  osc.frequency.value = freq; osc.type = 'sine';
  gain.gain.setValueAtTime(vol, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(.001, ctx.currentTime + dur / 1000);
  osc.start(ctx.currentTime); osc.stop(ctx.currentTime + dur / 1000);
}
function initSounds() {
  document.addEventListener('click', () => getAudio(), { once: true });
  document.querySelectorAll('.hud-link, .btn-cyber, .proj-live-btn, .wheel-trigger-btn')
    .forEach(el => {
      el.addEventListener('mouseenter', () => playBeep(1000, 25, .05));
      el.addEventListener('click', () => playBeep(600, 50, .08));
    });
}

// ─────────────────────────────────────────────
// WEAPON WHEEL
// ─────────────────────────────────────────────
const WheelState = {
  active: false,
  type: null,
  hovered: -1,
};

// Geometry helpers
function toRad(deg) { return deg * Math.PI / 180; }

function arcPath(cx, cy, r1, r2, startDeg, endDeg) {
  const s = toRad(startDeg), e = toRad(endDeg);
  const x1 = cx + r2 * Math.cos(s), y1 = cy + r2 * Math.sin(s);
  const x2 = cx + r2 * Math.cos(e), y2 = cy + r2 * Math.sin(e);
  const x3 = cx + r1 * Math.cos(e), y3 = cy + r1 * Math.sin(e);
  const x4 = cx + r1 * Math.cos(s), y4 = cy + r1 * Math.sin(s);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M${x1},${y1} A${r2},${r2} 0 ${large} 1 ${x2},${y2} L${x3},${y3} A${r1},${r1} 0 ${large} 0 ${x4},${y4} Z`;
}

function midPoint(cx, cy, r, angleDeg) {
  return { x: cx + r * Math.cos(toRad(angleDeg)), y: cy + r * Math.sin(toRad(angleDeg)) };
}

function buildWheel(data) {
  const svg = $('wheel-svg');
  svg.innerHTML = '';

  const cx = 300, cy = 300;
  const INNER = 108, OUTER = 240;
  const ICON_R = 174, LABEL_R = 210;
  const N = data.length;
  const step = 360 / N;
  const gap = 3;

  // Dark outer ring background
  const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  Object.assign(bgCircle, {});
  bgCircle.setAttribute('cx', cx); bgCircle.setAttribute('cy', cy);
  bgCircle.setAttribute('r', OUTER + 18);
  bgCircle.setAttribute('fill', 'rgba(0,0,0,0.7)');
  bgCircle.setAttribute('stroke', 'rgba(255,255,255,0.05)');
  bgCircle.setAttribute('stroke-width', '1');
  svg.appendChild(bgCircle);

  data.forEach((item, i) => {
    const startDeg = -90 + i * step + gap / 2;
    const endDeg = startDeg + step - gap;
    const midAngle = -90 + i * step + step / 2;

    // Segment path
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', arcPath(cx, cy, INNER, OUTER, startDeg, endDeg));
    path.setAttribute('class', 'w-seg');
    path.setAttribute('data-index', i);
    path.setAttribute('fill', 'rgba(18,18,18,0.92)');
    path.setAttribute('stroke', 'rgba(255,255,255,0.07)');
    path.setAttribute('stroke-width', '1');
    svg.appendChild(path);

    // Icon
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const iPos = midPoint(cx, cy, ICON_R - 22, midAngle);
    icon.setAttribute('x', iPos.x); icon.setAttribute('y', iPos.y);
    icon.setAttribute('class', 'w-icon'); icon.setAttribute('data-index', i);
    icon.textContent = item.icon;
    svg.appendChild(icon);

    // Label
    const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const lPos = midPoint(cx, cy, OUTER - 18, midAngle);
    label.setAttribute('x', lPos.x); label.setAttribute('y', lPos.y);
    label.setAttribute('class', 'w-label'); label.setAttribute('data-index', i);
    label.textContent = item.title;
    svg.appendChild(label);

    // Invisible hover overlay (easier hit area)
    const overlay = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    overlay.setAttribute('d', arcPath(cx, cy, INNER, OUTER + 16, startDeg, endDeg));
    overlay.setAttribute('fill', 'transparent');
    overlay.setAttribute('class', 'w-seg-overlay');
    overlay.setAttribute('data-index', i);
    svg.appendChild(overlay);
  });

  // Center circle
  const centerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  centerCircle.setAttribute('cx', cx); centerCircle.setAttribute('cy', cy);
  centerCircle.setAttribute('r', INNER - 2);
  centerCircle.setAttribute('class', 'w-center-circle');
  svg.appendChild(centerCircle);

  // Separator tick marks
  for (let i = 0; i < N; i++) {
    const angle = toRad(-90 + i * step);
    const x1 = cx + (INNER - 2) * Math.cos(angle);
    const y1 = cy + (INNER - 2) * Math.sin(angle);
    const x2 = cx + (OUTER + 16) * Math.cos(angle);
    const y2 = cy + (OUTER + 16) * Math.sin(angle);
    const tick = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    tick.setAttribute('x1', x1); tick.setAttribute('y1', y1);
    tick.setAttribute('x2', x2); tick.setAttribute('y2', y2);
    tick.setAttribute('stroke', 'rgba(0,0,0,0.8)'); tick.setAttribute('stroke-width', '2');
    tick.setAttribute('pointer-events', 'none');
    svg.appendChild(tick);
  }

  // Hover events on overlay paths
  svg.querySelectorAll('.w-seg-overlay, .w-seg').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const idx = parseInt(el.getAttribute('data-index'));
      highlightSegment(idx, data);
    });
    el.addEventListener('click', () => {
      const idx = parseInt(el.getAttribute('data-index'));
      handleWheelClick(idx, data);
    });
  });
}

function highlightSegment(idx, data) {
  const svg = $('wheel-svg');
  const item = data[idx];

  // Reset all
  svg.querySelectorAll('.w-seg').forEach(p => {
    const i = parseInt(p.getAttribute('data-index'));
    p.setAttribute('fill', 'rgba(18,18,18,0.92)');
    p.setAttribute('stroke', 'rgba(255,255,255,0.07)');
  });
  svg.querySelectorAll('.w-label').forEach(l => {
    l.setAttribute('fill', '#888');
  });

  // Highlight active segment
  const activeSeg = svg.querySelector(`.w-seg[data-index="${idx}"]`);
  if (activeSeg) {
    activeSeg.setAttribute('fill', `color-mix(in srgb, ${item.color} 20%, rgba(25,25,25,0.95))`);
    // Fallback for browsers without color-mix:
    activeSeg.style.fill = `${item.color}22`;
    activeSeg.setAttribute('stroke', item.color);
    activeSeg.style.stroke = item.color;
    activeSeg.style.filter = `drop-shadow(0 0 8px ${item.color}80)`;
  }
  const activeLabel = svg.querySelector(`.w-label[data-index="${idx}"]`);
  if (activeLabel) { activeLabel.style.fill = '#fff'; }

  // Update center info
  $('wc-icon').textContent = item.icon;
  $('wc-title').textContent = item.title;
  $('wc-desc').textContent = item.desc;

  playBeep(800 + idx * 40, 20, .04);
}

function resetWheelCenter() {
  $('wc-icon').textContent = '?';
  $('wc-title').textContent = 'SELECT';
  $('wc-desc').textContent = '';
  $('wheel-svg').querySelectorAll('.w-seg').forEach(p => {
    p.setAttribute('fill', 'rgba(18,18,18,0.92)');
    p.style.fill = '';
    p.style.stroke = '';
    p.style.filter = '';
  });
  $('wheel-svg').querySelectorAll('.w-label').forEach(l => { l.style.fill = ''; });
}

function handleWheelClick(idx, data) {
  const item = data[idx];
  if (item.url) {
    window.open(item.url, '_blank');
  } else {
    // Scroll to projects section
    const target = document.querySelector('#projects, #skills');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    closeWheel();
  }
}

function openWheel(type) {
  const data = type === 'projects' ? PROJECTS_WHEEL : SKILLS_WHEEL;
  $('wheel-type-label').textContent = type === 'projects' ? 'MISSIONS' : 'EQUIPMENT';
  buildWheel(data);
  resetWheelCenter();
  WheelState.active = true;
  WheelState.type = type;
  const overlay = $('wheel-overlay');
  overlay.classList.remove('hidden');
  playBeep(400, 80, .1);
}

function closeWheel() {
  const overlay = $('wheel-overlay');
  overlay.classList.add('hidden');
  WheelState.active = false;
  WheelState.type = null;
  playBeep(300, 60, .08);
}

function initWheel() {
  // Trigger buttons
  document.querySelectorAll('.wheel-trigger-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-wheel');
      openWheel(type);
    });
  });

  // Close on backdrop click
  $('wheel-backdrop').addEventListener('click', closeWheel);

  // Close on ESC
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && WheelState.active) closeWheel();
  });
}

// ─────────────────────────────────────────────
// GREETING CYCLE
// ─────────────────────────────────────────────
function initGreetingCycle() {
  const el = document.getElementById('greeting-text');
  if (!el) return;

  const greetings = [
    'السلام عليكم',   // Arabic
    'Hello',         // English
    'Bonjour',       // French
    'Hallo',         // German
    'Hi choom!',    // Cyberpunk 2077
    'ⴰⵣⵓⵍ',        // Tamazight
  ];
  let idx = 0;

  // Start on Arabic, cycle every 2.5s
  setInterval(() => {
    // Fade out
    el.classList.add('fade-out');
    el.classList.remove('fade-in');

    setTimeout(() => {
      idx = (idx + 1) % greetings.length;
      el.textContent = greetings[idx];
      // Arabic needs RTL; others LTR
      el.style.direction = idx === 0 ? 'rtl' : 'ltr';

      // Fade in
      el.classList.remove('fade-out');
      el.classList.add('fade-in');
    }, 370);
  }, 2500);
}



// ─────────────────────────────────────────────
// BOOT — DOMContentLoaded
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLibrary();
  initNav();
  initSectionAnims();
  initStars();
  initWheel();
  initSounds();
  initGreetingCycle();
  initTheme();

  // Start terminal
  runTerminal();
});

// ─────────────────────────────────────────────
// THEME TOGGLE — dark / light
// ─────────────────────────────────────────────
function initTheme() {
  const btn = $('nav-theme-btn');
  if (!btn) return;

  // Apply saved preference on load
  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    btn.textContent = '☀';
  }

  btn.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light');
    btn.textContent = isLight ? '☀' : '☽';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}
