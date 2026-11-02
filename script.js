const loader = document.getElementById("loader");
const loaderText = document.getElementById("loader-text");
let progress = 0;
const loading = window.setInterval(() => {
  progress += progress < 85 ? 5 : 15;
  loaderText.textContent = `${Math.min(progress, 100)}%`;
  if (progress >= 100) {
    window.clearInterval(loading);
    loader.classList.add("done");
  }
}, 35);

document.getElementById("year").textContent = new Date().getFullYear();

const navLinks = [...document.querySelectorAll(".floating-nav a")];
const sections = [...document.querySelectorAll("main section[id]")];
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle("active", link.hash === `#${entry.target.id}`));
  }), {rootMargin: "-35% 0px -55% 0px"});
  sections.forEach(section => observer.observe(section));
}

const input = document.getElementById("term-input");
const history = document.getElementById("term-history");
const matrixCanvas = document.getElementById("matrix-canvas");
const matrixContext = matrixCanvas.getContext("2d");
let matrixFrame;
function drawMatrix() {
  matrixCanvas.width = window.innerWidth;
  matrixCanvas.height = window.innerHeight;
  matrixContext.fillStyle = "rgba(9, 9, 11, .12)";
  matrixContext.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
  matrixContext.fillStyle = "#ccff00";
  matrixContext.font = "12px Space Mono, monospace";
  for (let x = 0; x < matrixCanvas.width; x += 22) {
    matrixContext.fillText(String.fromCharCode(0x30a0 + Math.random() * 96), x, Math.random() * matrixCanvas.height);
  }
  matrixFrame = window.requestAnimationFrame(drawMatrix);
}
function toggleMatrix() {
  document.body.classList.toggle("matrix-mode");
  if (document.body.classList.contains("matrix-mode")) drawMatrix();
  else window.cancelAnimationFrame(matrixFrame);
}
const commands = {
  help: "commando's: over · vaardigheden · projecten · contact · matrix · clear",
  over: "Favour is een Software Development student die leert door te bouwen.",
  about: "Favour is een Software Development student die leert door te bouwen.",
  vaardigheden: "HTML · CSS · JavaScript · React · PHP · Laravel · MySQL",
  skills: "HTML · CSS · JavaScript · React · PHP · Laravel · MySQL",
  projecten: "Movieflix.nl · to-do applicatie",
  projects: "Movieflix.nl · to-do applicatie",
  contact: "scroll naar contact of stuur een e-mail naar fa.okoduwa@student.alfa-college.nl",
  matrix: "matrix-modus geactiveerd."
};
input.addEventListener("keydown", event => {
  if (event.key !== "Enter") return;
  const command = input.value.trim().toLowerCase();
  if (command === "clear") history.innerHTML = "";
  else history.insertAdjacentHTML("beforeend", `<br><span class="lime">favour@dev</span>:~ $ ${command}<br><span class="${command === "matrix" ? "pink" : "blue"}">${commands[command] || "onbekend commando. typ 'help'."}</span>`);
  if (command === "matrix") toggleMatrix();
  input.value = "";
  document.getElementById("terminal").scrollTop = document.getElementById("terminal").scrollHeight;
});
