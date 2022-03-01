const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("controls_colors jsColor");
const eraser = document.getElementById("eraser");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;
ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
let painting = false;
let filling = false;

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}


function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseUp(event) {
  stopPainting();
}

function onMouseEnter(event) {
  x = event.offsetX;
  y = event.offsetY;

  ctx.moveTo(x, y);
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function chooseEraser(event) {
  ctx.strokeStyle = "white";
  ctx.fillStyle = "white";
}

function handleModeClick(event) {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function fillingColor(event) {
  if (filling === true) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
function handleRange(event) {
  ctx.lineWidth = event.target.value;
}

function handleSaveClick(event) {
  const image = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = image;
  link.download = "paint";
  link.click();
}
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseenter", onMouseEnter)
  canvas.addEventListener("click", fillingColor);
}

document.body.addEventListener("mouseup", stopPainting);
document.body.addEventListener("mousedown", startPainting);

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

eraser.addEventListener("click", chooseEraser);

save.addEventListener("click", handleSaveClick);
let isClicked = false;

range.addEventListener("input", handleRange);

mode.addEventListener("click", handleModeClick);