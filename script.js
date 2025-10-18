// Typing effect for first wish
const text = "💖 Happy Birthday raa Mallika 🎉✨";
const title = document.getElementById("title");
const button = document.getElementById("surpriseBtn");
let idx = 0;

function typeText() {
  if(idx < text.length){
    title.innerHTML += text.charAt(idx);
    idx++;
    setTimeout(typeText, 120);
  } else {
    button.classList.remove("hidden");
    button.style.opacity = 1;
  }
}
typeText();

// Screens
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const finalWish = document.getElementById("finalWish");
const photos = document.querySelectorAll(".photo");

// Surprise button click
button.addEventListener("click", () => {
  screen1.classList.remove("active");
  screen2.classList.add("active");
  showPhotos();
});

let index = 0;

function showPhotos() {
  // Hide all photos first
  photos.forEach(photo => {
    photo.style.width = "0";
    photo.style.height = "0";
    photo.style.opacity = 0;
  });

  if(index < photos.length - 1){
    const photo = photos[index];
    photo.style.width = "300px";
    photo.style.height = "300px";
    photo.style.opacity = 1;
    fireworkBlast();
    index++;
    setTimeout(showPhotos, 1500); // 1.5 sec for each
  } else {
    const lastPhoto = photos[photos.length - 1];
    lastPhoto.style.width = "400px";
    lastPhoto.style.height = "400px";
    lastPhoto.style.opacity = 1;
    fireworkBlast();
    setTimeout(()=>{
      finalWish.classList.add("visible"); // show final text below
    }, 1500);
  }
}

// Fireworks
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
let w = window.innerWidth;
let h = window.innerHeight;
canvas.width = w;
canvas.height = h;

window.addEventListener("resize", ()=>{
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
});

let particles = [];

class Particle{
  constructor(x,y,color){
    this.x=x;
    this.y=y;
    this.color=color;
    this.angle=Math.random()*2*Math.PI;
    this.speed=Math.random()*5+2;
    this.life=100;
  }
  update(){
    this.x += Math.cos(this.angle)*this.speed;
    this.y += Math.sin(this.angle)*this.speed+0.5;
    this.speed *= 0.96;
    this.life--;
    this.draw();
    return this.life>0;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x,this.y,2,0,Math.PI*2);
    ctx.fillStyle=this.color;
    ctx.fill();
  }
}

function fireworkBlast(){
  const colors = ["#ff33cc","#ff99ff","#ff66cc","#ff3366","#ffffff"];
  const x = Math.random()*w;
  const y = Math.random()*(h/2);
  for(let i=0;i<50;i++){
    particles.push(new Particle(x,y,colors[Math.floor(Math.random()*colors.length)]));
  }
}

function loop(){
  ctx.fillStyle="rgba(0,0,0,0.2)";
  ctx.fillRect(0,0,w,h);
  particles = particles.filter(p => p.update());
  requestAnimationFrame(loop);
}
loop();
