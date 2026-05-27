const canvas = document.getElementById("Fireworks");
const ctx = canvas.getContext("2d");

/* =========================
   SETTINGS
========================= */

const SETTINGS = {
    interval: 200,          // milliseconds between fireworks
    maxFireworks: 15,        // maximum active fireworks
    particleCount: 10,      // particles per explosion
    mobileParticleCount: 40,

    launchSpeedMin: 10,
    launchSpeedMax: 15,

    particleSpeedMin: 1,
    particleSpeedMax: 6,

    gravity: 0.05,
    fadeSpeed: 0.015,

    glow: true,
};

/* =========================
   CANVAS
========================= */

let width;
let height;
let dpr;

function resizeCanvas() {
    dpr = window.devicePixelRatio || 1;

    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* =========================
   STORAGE
========================= */

const fireworks = [];
const particles = [];

/* =========================
   FIREWORK
========================= */

class Firework {
    constructor() {
        this.x = Math.random() * width;
        this.y = height + 20;

        this.targetY = Math.random() * (height * 0.5);

        this.speed =
            Math.random() *
                (SETTINGS.launchSpeedMax - SETTINGS.launchSpeedMin) +
            SETTINGS.launchSpeedMin;

        this.color = `hsl(${Math.random() * 360}, 100%, 75%)`;

        this.radius = 2;
    }

    update() {
        this.y -= this.speed;

        if (this.y <= this.targetY) {
            this.explode();
            return false;
        }

        return true;
    }

    explode() {
        const amount =
            window.innerWidth < 768
                ? SETTINGS.mobileParticleCount
                : SETTINGS.particleCount;

        for (let i = 0; i < amount; i++) {
            particles.push(
                new Particle(this.x, this.y, this.color)
            );
        }
    }

    draw() {
        if (SETTINGS.glow) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.shadowBlur = 0;
    }
}

/* =========================
   PARTICLE
========================= */

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;

        this.color = color;

        const angle = Math.random() * Math.PI * 2;

        const speed =
            Math.random() *
                (SETTINGS.particleSpeedMax -
                    SETTINGS.particleSpeedMin) +
            SETTINGS.particleSpeedMin;

        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.gravity = SETTINGS.gravity;
        this.friction = 0.98;

        this.alpha = 1;

        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.vy += this.gravity;

        this.x += this.vx;
        this.y += this.vy;

        this.alpha -= SETTINGS.fadeSpeed;

        return this.alpha > 0;
    }

    draw() {
        ctx.globalAlpha = this.alpha;

        if (SETTINGS.glow) {
            ctx.shadowBlur = 12;
            ctx.shadowColor = this.color;
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        ctx.fillStyle = this.color;
        ctx.fill();

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
    }
}

/* =========================
   SPAWNING
========================= */

function spawnFirework() {
    if (fireworks.length >= SETTINGS.maxFireworks) return;

    fireworks.push(new Firework());
}

setInterval(spawnFirework, SETTINGS.interval);

/* =========================
   ANIMATION
========================= */

function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, width, height);

    for (let i = fireworks.length - 1; i >= 0; i--) {
        const alive = fireworks[i].update();

        fireworks[i].draw();

        if (!alive) {
            fireworks.splice(i, 1);
        }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        const alive = particles[i].update();

        particles[i].draw();

        if (!alive) {
            particles.splice(i, 1);
        }
    }
}

animate();