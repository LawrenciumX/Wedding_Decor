/* ===== Progress bar ===== */
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
const docHeight = document.body.scrollHeight - window.innerHeight;
const progress = (scrollTop / docHeight) * 100;
document.getElementById('progress').style.width = progress + '%';
});

/* ===== Carousel fade ===== */
const slides = document.querySelectorAll('.carousel img');
let index = 0;
setInterval(() => {
  slides[index].style.opacity = 0; index = (index + 1) % slides.length;
  slides[index].style.opacity = 1;
},9000);


document.addEventListener("DOMContentLoaded", () => {
  const words = ["wedding", "occasion", "birthday"];
const el = document.querySelector(".word-rotate");

let index = 0;

setInterval(() => {
  // fade out
  el.style.opacity = 0;

setTimeout(() => {
  index = (index + 1) % words.length;
el.textContent = words[index];

// fade in
el.style.opacity = 1;
}, 900);
}, 4500);
});



