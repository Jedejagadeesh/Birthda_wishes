// Typing effect
const text = "💖🩵💐💞Appie Birthuuday Kothiiii 🐒🎆🎂🎀🎉";
const title = document.getElementById("title");
const button = document.getElementById("surpriseBtn");
let i = 0;

function typeEffect() {
  if (i < text.length) {
    title.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeEffect, 120);
  } else {
    button.classList.remove("hidden");
    button.style.opacity = 1;
  }
}
typeEffect();

// Screens
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const photos = document.querySelectorAll(".photo");
const finalWish = document.getElementById("finalWish");

button.addEventListener("click", () => {
  screen1.classList.remove("active");
  screen2.classList.add("active");
  showPhotos();
});

// Fireworks
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;

window.addEventListener("resize", () => {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
});

let particles = [];
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.angle = Math.random() * 2 * Math.PI;
    this.speed = Math.random() * 5 + 2;
    this.life = 100;
  }
  update() {
    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed + 0.5;
    this.speed *= 0.96;
    this.life--;
    this.draw();
    return this.life > 0;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}
function fireworkBlast(count = 50) {
  const colors = ["#00ffff", "#00c8ff", "#0077ff", "#ffffff", "#aeefff"];
  const x = Math.random() * w;
  const y = Math.random() * (h / 2);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
  }
}

// 🌸 Flower falling effect for final photo
function flowerFall() {
  const flowerEmojis = ["🌸", "💐", "🌺", "🌼", "🌻"];
  const fallInterval = setInterval(() => {
    const flower = document.createElement("div");
    flower.classList.add("flower");
    flower.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    flower.style.left = Math.random() * 100 + "vw";
    flower.style.animationDuration = Math.random() * 3 + 4 + "s";
    document.body.appendChild(flower);
    setTimeout(() => flower.remove(), 7000);
  }, 150);

  // stop after 6 seconds
  setTimeout(() => clearInterval(fallInterval), 6000);
}

// Photos show one by one
let index = 0;
function showPhotos() {
  photos.forEach(p => { p.style.width = "0"; p.style.height = "0"; p.style.opacity = 0; });
  if (index < photos.length - 1) {
    const p = photos[index];
    p.style.width = "320px";
    p.style.height = "320px";
    p.style.opacity = 1;
    fireworkBlast();
    index++;
    setTimeout(showPhotos, 1800);
  } else {
    const last = photos[photos.length - 1];
    last.style.width = "380px";
    last.style.height = "390px";
    last.style.opacity = 1;

    // 5s full corner blast + 6s flower fall
    for (let i = 0; i < 100; i++) fireworkBlast(80);
    flowerFall();

    setTimeout(() => finalWish.classList.add("visible"), 6000);
  }
}

// Firework animation loop
function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, w, h);
  particles = particles.filter(p => p.update());
  requestAnimationFrame(loop);
}
loop();
