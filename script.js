const canvas = document.getElementById('plasmaCanvas');
const ctx = canvas.getContext('2d');
const modeSwitch = document.getElementById('modeSwitch');
const powerToggle = document.getElementById('powerToggle');
const zapSound = document.getElementById('zapSound');
const idleHum = document.getElementById('idleHum');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

let colorMode = localStorage.getItem('plasmaMode') || 'rainbow';
let poweredOn = true;
let lastMouseMove = Date.now();

modeSwitch.value = colorMode;
let tendrils = [];

class Tendril {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = centerX;
    this.y = centerY;
    this.angle = Math.random() * Math.PI * 2;
    this.length = 100 + Math.random() * 200;
    this.speed = 0.02 + Math.random() * 0.03;
    this.offset = Math.random() * 1000;
  }

  update(targetX, targetY) {
    const dx = targetX - centerX;
    const dy = targetY - centerY;
    const targetAngle = Math.atan2(dy, dx);
    this.angle += (targetAngle - this.angle) * 0.05;

    this.offset += this.speed;
    this.x = centerX + Math.cos(this.angle) * this.length * Math.sin(this.offset);
    this.y = centerY + Math.sin(this.angle) * this.length * Math.sin(this.offset);
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(this.x, this.y);
    ctx.strokeStyle = getColor();
    ctx.lineWidth = 2;
    ctx.shadowBlur = 15;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.stroke();
  }
}

function getColor() {
  switch (colorMode) {
    case 'blue': return 'hsl(210, 100%, 70%)';
    case 'red': return 'hsl(0, 100%, 70%)';
    case 'green': return 'hsl(130, 100%, 70%)';
    case 'rainbow':
    default: return `hsl(${Math.random() * 360}, 100%, 70%)`;
  }
}

function createTendrils() {
  tendrils = [];
  for (let i = 0; i < 40; i++) {
    tendrils.push(new Tendril());
  }
}
createTendrils();

let mouseX = centerX;
let mouseY = centerY;

canvas.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  lastMouseMove = Date.now();
  if (poweredOn) zapSound.play();
});

canvas.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  mouseX = touch.clientX;
  mouseY = touch.clientY;
  lastMouseMove = Date.now();
  if (poweredOn) zapSound.play();
});

modeSwitch.addEventListener('change', (e) => {
  colorMode = e.target.value;
  localStorage.setItem('plasmaMode', colorMode);
});

powerToggle.addEventListener('click', () => {
  poweredOn = !poweredOn;
  powerToggle.textContent = poweredOn ? '⏻ ON' : '⏻ OFF';

  if (poweredOn) {
    idleHum.play();
  } else {
    idleHum.pause();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

function animate() {
  requestAnimationFrame(animate);

  if (!poweredOn) return;

  // Faint trail effect
  ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Idle behavior (no movement)
  const now = Date.now();
  if (now - lastMouseMove > 4000) {
    mouseX = centerX + Math.sin(now / 500) * 100;
    mouseY = centerY + Math.cos(now / 500) * 100;
  }

  for (let t of tendrils) {
    t.update(mouseX, mouseY);
    t.draw();
  }
}

idleHum.volume = 0.4;
idleHum.play();
animate();
