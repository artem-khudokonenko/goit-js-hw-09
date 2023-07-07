const bodyEl = document.querySelector('body');
const btnStar = bodyEl.querySelector('button[data-start]');
const btnStop = bodyEl.querySelector('button[data-stop]');
let colorRandom = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
btnStar.addEventListener('click', () => {
  colorRandom = setInterval(() => {
    bodyEl.style.background = getRandomHexColor();
    btnStar.disabled = true;
  }, 1000);
});
btnStop.addEventListener('click', () => {
  clearInterval(colorRandom);
  btnStar.disabled = false;
});
