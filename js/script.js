// =====================================================
// Utilidades: confeti en canvas
// =====================================================
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let confettiRAF = null;

function resizeCanvas(){
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function launchConfetti(colors, count = 90){
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  for (let i = 0; i < count; i++){
    confettiParticles.push({
      x: Math.random() * confettiCanvas.width,
      y: -20 - Math.random() * 200,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: 2 + Math.random() * 3,
      speedX: (Math.random() - 0.5) * 2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      life: 0,
      maxLife: 180 + Math.random() * 60
    });
  }
  if (!confettiRAF) confettiRAF = requestAnimationFrame(animateConfetti);
}

function animateConfetti(){
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiParticles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.rotation += p.rotSpeed;
    p.life++;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  });
  confettiParticles = confettiParticles.filter(p => p.life < p.maxLife && p.y < confettiCanvas.height + 40);
  if (confettiParticles.length > 0){
    confettiRAF = requestAnimationFrame(animateConfetti);
  } else {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiRAF = null;
  }
}

const PALETTE = ['#6FC6E8', '#F6A8C0', '#F17FA6', '#FFFFFF'];
const PANDA_PALETTE = ['#D9713F', '#F6A8C0', '#FBEFE6', '#6FC6E8'];

// =====================================================
// HERO: abrir el sobre
// =====================================================
const envelopeStage = document.getElementById('envelopeStage');
const heroReveal = document.getElementById('heroReveal');
const openBtn = document.getElementById('openBtn');
const scrollCue = document.getElementById('scrollCue');

openBtn.addEventListener('click', () => {
  envelopeStage.classList.add('hidden');
  heroReveal.classList.add('visible');
  launchConfetti(PALETTE, 70);
});

scrollCue.addEventListener('click', () => {
  document.getElementById('carta').scrollIntoView({ behavior: 'smooth' });
});

// =====================================================
// CARTA: efecto de aparición al hacer scroll
// =====================================================
const letterLines = document.querySelectorAll('#letterText [data-line]');
const letterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      letterLines.forEach((line, i) => {
        setTimeout(() => line.classList.add('shown'), i * 550);
      });
      letterObserver.disconnect();
    }
  });
}, { threshold: 0.3 });
letterObserver.observe(document.getElementById('carta'));

// =====================================================
// 23 RAZONES
// =====================================================
const reasons = [
  "Porque nadie me hace tan feliz",
  "Por como me tratas siempre.",
  "Por enamorarme todos los dias aún más.",
  "Por tener un corazoncito que no te cabe en el pecho.",
  "Por tu manera de ver la vida.",
  "Por escucharme siempre.",
  "Por tu paciencia infinita conmigo.",
  "Por cada abracito.",
  "Porque siempre te preocupas por mi",
  "Por ser mi persona favorita para no hacer nada.",
  "Por tu manera de bailar cuando crees que nadie te ve.",
  "Por tu cada palabra que decimos a la vez.",
  "Por tu ternura con todo el mundo.",
  "Por tu buen gusto ;)",
  "Por tu sentido del humor.",
  "Por tus siestecitas de 5 horas infinitas.",
  "Por hacerme sentir tranquilo solo con estar.",
  "Por las cochinadas que sueltas poor esa boca putiti.",
  "Por los gifs y reels que me mandas.",
  "Por creer en mi siempre.",
  "Porque siempre te interesas en cualquier cosa que tenga que ver conmigo.",
  "Por tu forma de f**** jejejeje.",
  "YYYYYYY Porque eres una pobre chica y mi pequeña chica."
];

const cardsGrid = document.getElementById('cardsGrid');
reasons.forEach((text, i) => {
  const card = document.createElement('div');
  card.className = 'reason-card';
  card.innerHTML = `
    <div class="reason-card-inner">
      <div class="reason-face reason-front">
        <span class="num">${String(i + 1).padStart(2, '0')}</span>
        <span class="heart">🩷</span>
      </div>
      <div class="reason-face reason-back">${text}</div>
    </div>
    <button class="reason-hit" aria-label="Descubrir razón ${i + 1}"></button>
  `;
  card.querySelector('.reason-hit').addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
  cardsGrid.appendChild(card);
});

// =====================================================
// TARTA: soplar la vela
// =====================================================
const blowBtn = document.getElementById('blowBtn');
const flame = document.getElementById('flame');
const smokeText = document.getElementById('smokeText');
const wishMsg = document.getElementById('wishMsg');

blowBtn.addEventListener('click', () => {
  if (blowBtn.disabled) return;
  flame.classList.add('out');
  smokeText.classList.add('show');
  wishMsg.textContent = '¡Que se cumplan todos tus deseos, mi vida! 🩷';
  launchConfetti(PALETTE, 110);
  blowBtn.disabled = true;
  blowBtn.textContent = 'Deseo pedido ✨';
});

// =====================================================
// MINIJUEGO: atrapa los corazones
// =====================================================
const gameArea = document.getElementById('gameArea');
const startGameBtn = document.getElementById('startGameBtn');
const scoreVal = document.getElementById('scoreVal');
const timeVal = document.getElementById('timeVal');
const gameResult = document.getElementById('gameResult');

let score = 0;
let timeLeft = 15;
let gameInterval = null;
let spawnInterval = null;
const heartEmojis = ['💙', '🩷', '🤍', '💗'];

function startGame(){
  score = 0;
  timeLeft = 15;
  scoreVal.textContent = score;
  timeVal.textContent = timeLeft;
  gameResult.textContent = '';
  startGameBtn.remove();
  document.querySelectorAll('.falling-heart').forEach(h => h.remove());

  spawnInterval = setInterval(spawnHeart, 550);
  gameInterval = setInterval(() => {
    timeLeft--;
    timeVal.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function spawnHeart(){
  const heart = document.createElement('button');
  heart.className = 'falling-heart';
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * (gameArea.clientWidth - 40) + 'px';
  const duration = 3 + Math.random() * 2;
  heart.style.animationDuration = duration + 's';
  heart.setAttribute('aria-label', 'Corazón');

  heart.addEventListener('click', () => {
    score++;
    scoreVal.textContent = score;
    heart.remove();
  });

  heart.addEventListener('animationend', () => heart.remove());
  gameArea.appendChild(heart);
}

function endGame(){
  clearInterval(gameInterval);
  clearInterval(spawnInterval);
  document.querySelectorAll('.falling-heart').forEach(h => h.remove());

  let msg = '';
  if (score >= 15) msg = `¡${score} corazones! Tan rápida atrapando corazones como robándote el mío. 🩷`;
  else if (score >= 8) msg = `¡${score} corazones atrapados! Se nota que tienes buena puntería para el amor. 🩵`;
  else msg = `${score} corazones atrapados. No pasa nada, el mío ya lo tienes atrapado hace tiempo. 🤍`;
  gameResult.textContent = msg;

  const again = document.createElement('button');
  again.className = 'game-start';
  again.textContent = 'Jugar de nuevo';
  again.addEventListener('click', () => {
    again.remove();
    startGame();
  });
  gameArea.appendChild(again);
}

startGameBtn.addEventListener('click', startGame);

// =====================================================
// EASTER EGG: panda rojo
// =====================================================
const pandaModal = document.getElementById('pandaModal');
const pandaBackdrop = document.getElementById('pandaBackdrop');
const pandaClose = document.getElementById('pandaClose');
const pawSecret = document.getElementById('pawSecret');

function openPanda(){
  pandaModal.classList.add('open');
  launchConfetti(PANDA_PALETTE, 90);
}
function closePanda(){
  pandaModal.classList.remove('open');
}

pawSecret.addEventListener('click', openPanda);
pandaBackdrop.addEventListener('click', closePanda);
pandaClose.addEventListener('click', closePanda);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePanda();
});

// Segunda forma de encontrar el secreto: escribir "panda" en cualquier momento
let secretBuffer = '';
document.addEventListener('keydown', (e) => {
  if (e.key.length !== 1) return;
  secretBuffer = (secretBuffer + e.key).slice(-5).toLowerCase();
  if (secretBuffer === 'panda'){
    openPanda();
  }
});
