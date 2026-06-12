import { pastMessages } from './messages.js';

const STORAGE_KEY = 'gacha_opened_balls';
const R = 17;

const state = {
  balls: [],
  gravX: 0,
  gravY: 0.45,
  popup: null,
};

// ── Storage ───────────────────────────────────────────────────────────────────

function loadSaved() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
}

function persistSaved() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(state.balls.filter(b => !b.isPast).map(b => b.message))
    );
  } catch {}
}

// ── Popup ─────────────────────────────────────────────────────────────────────

export function closePopup() {
  if (state.popup) {
    state.popup.remove();
    state.popup = null;
  }
}

function openPopup(ball, anchorEl) {
  closePopup();

  const W = 218;
  const rect = anchorEl.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const left = Math.max(10, Math.min(cx - W / 2, window.innerWidth - W - 10));
  const top = rect.top - 10;

  const div = document.createElement('div');
  div.className = 'scattered-popup';
  div.style.cssText = `position:fixed;left:${left}px;top:${top}px;width:${W}px;z-index:15;`;
  div.innerHTML = `
    <span class="scattered-popup-knot">💌</span>
    <p class="scattered-popup-text">${ball.message}</p>
    <button class="scattered-popup-close" aria-label="Tutup">✕</button>
  `;

  document.body.appendChild(div);
  state.popup = div;
  state.popup._ball = ball;

  div.querySelector('.scattered-popup-close').addEventListener('click', (e) => {
    e.stopPropagation();
    closePopup();
  });

  setTimeout(() => {
    const onOutside = (e) => {
      if (!div.contains(e.target) && e.target !== anchorEl) {
        if (state.popup === div) closePopup();
        document.removeEventListener('click', onOutside);
      }
    };
    document.addEventListener('click', onOutside);
  }, 60);
}

// ── Ball spawning ─────────────────────────────────────────────────────────────

function spawnBall(message, isPast) {
  const H = window.innerHeight;
  const W = window.innerWidth;
  const yMin = H - 94;
  const yMax = H - R - 4;

  const ball = {
    x: R * 2 + Math.random() * (W - R * 4),
    y: yMin + Math.random() * Math.max(0, yMax - yMin),
    vx: (Math.random() - 0.5) * 3,
    vy: (Math.random() - 0.5) * 1.5,
    r: R,
    message,
    isPast,
    el: null,
  };

  const el = document.createElement('button');
  el.className = isPast ? 'scattered-ball scattered-ball--past' : 'scattered-ball';
  el.setAttribute('aria-label', 'Buka pesan');
  el.style.cssText = `width:${R * 2}px;height:${R * 2}px;left:${ball.x - R}px;top:${ball.y - R}px;`;

  const shine = document.createElement('span');
  shine.className = 'scattered-ball-shine';
  el.appendChild(shine);

  el.addEventListener('click', (e) => {
    e.stopPropagation();
    if (state.popup?._ball === ball) { closePopup(); return; }
    openPopup(ball, el);
  });

  document.body.appendChild(el);
  ball.el = el;
  state.balls.push(ball);
}

// ── Physics ───────────────────────────────────────────────────────────────────

function tick() {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const yMin = H - 98;
  const yMax = H - 4;
  const { balls } = state;

  for (const b of balls) {
    b.vx += state.gravX * 0.16;
    b.vy += state.gravY * 0.16;
    b.vx *= 0.93;
    b.vy *= 0.93;
    b.x += b.vx;
    b.y += b.vy;

    if (b.x - b.r < 0)    { b.x = b.r;     b.vx =  Math.abs(b.vx) * 0.5; }
    if (b.x + b.r > W)    { b.x = W - b.r; b.vx = -Math.abs(b.vx) * 0.5; }
    if (b.y - b.r < yMin) { b.y = yMin + b.r; b.vy =  Math.abs(b.vy) * 0.35; }
    if (b.y + b.r > yMax) { b.y = yMax - b.r; b.vy = -Math.abs(b.vy) * 0.45; }

    b.el.style.left = `${b.x - b.r}px`;
    b.el.style.top  = `${b.y - b.r}px`;
  }

  // Ball-to-ball collision
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const a = balls[i], b = balls[j];
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.hypot(dx, dy);
      const min = a.r + b.r;
      if (d < min && d > 0.01) {
        const nx = dx / d, ny = dy / d;
        const push = (min - d) / 2;
        a.x -= nx * push; a.y -= ny * push;
        b.x += nx * push; b.y += ny * push;
        const rvx = b.vx - a.vx, rvy = b.vy - a.vy;
        const dot = rvx * nx + rvy * ny;
        if (dot < 0) {
          a.vx += dot * nx * 0.45; a.vy += dot * ny * 0.45;
          b.vx -= dot * nx * 0.45; b.vy -= dot * ny * 0.45;
        }
      }
    }
  }

  requestAnimationFrame(tick);
}

// ── Motion ────────────────────────────────────────────────────────────────────

function applyShakeImpulse(magnitude) {
  if (magnitude > 18) {
    for (const b of state.balls) {
      b.vx += (Math.random() - 0.5) * 10;
      b.vy += (Math.random() - 0.5) * 6;
    }
  }
}

function attachDeviceMotion() {
  window.addEventListener('devicemotion', (e) => {
    const g = e.accelerationIncludingGravity;
    const a = e.acceleration;
    if (g) {
      state.gravX = -(g.x || 0) * 0.3;
      state.gravY = 0.25 + Math.max(0, (g.y || 0)) * 0.05;
    }
    if (a) {
      applyShakeImpulse(Math.hypot(a.x || 0, a.y || 0, a.z || 0));
    }
  }, { passive: true });
}

function setupMotion() {
  if (typeof DeviceMotionEvent !== 'undefined') {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      // iOS 13+: request on first user tap
      document.addEventListener('click', () => {
        DeviceMotionEvent.requestPermission()
          .then(s => { if (s === 'granted') attachDeviceMotion(); })
          .catch(() => {});
      }, { once: true });
    } else {
      attachDeviceMotion();
    }
  }

  // Desktop: mouse tilt controls horizontal gravity
  window.addEventListener('mousemove', (e) => {
    state.gravX = ((e.clientX - window.innerWidth / 2) / window.innerWidth) * 1.4;
  }, { passive: true });
}

// ── Public API ────────────────────────────────────────────────────────────────

export function addOpenedMessage(message) {
  if (pastMessages.includes(message)) return;
  if (state.balls.some(b => b.message === message && !b.isPast)) return;
  spawnBall(message, false);
  persistSaved();
}

export function initScatteredBalls() {
  pastMessages.forEach(msg => spawnBall(msg, true));

  loadSaved().forEach(msg => {
    if (!state.balls.some(b => b.message === msg)) {
      spawnBall(msg, false);
    }
  });

  setupMotion();
  requestAnimationFrame(tick);
}
