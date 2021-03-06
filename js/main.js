const canvas = document.querySelector('#draw');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 10;
ctx.globalCompositeOperation = 'lighten';

let direction = true;
let hue = 0;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function setLineWidth(){
  if (ctx.lineWidth >= 50 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

function setStrokeStyle(){
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  hue++;
}

function setLineTo(e){
  if (e.type === 'touchmove') {
    ctx.lineTo(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
  } else {
    ctx.lineTo(e.offsetX, e.offsetY);
  }
}

function updatePosition(e){
   if (e.type === 'touchmove') {
    [lastX, lastY] = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
  } else {
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
}

function draw(e) {
  if (!isDrawing) return;
  
  setStrokeStyle();
  setLineWidth();
  
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  setLineTo(e);
  ctx.stroke();

  updatePosition(e);
}

document.addEventListener('mousemove', draw);
document.addEventListener('mousedown', (e) => {
  isDrawing = true;
  updatePosition(e);
});
document.addEventListener('mouseup', () => isDrawing = false);
document.addEventListener('mouseout', () => isDrawing = false);

document.addEventListener('touchmove', draw);
document.addEventListener('touchstart', (e) => {
  isDrawing = true;
  updatePosition(e);
});
document.addEventListener('touchend', () => isDrawing = false);
document.addEventListener('touchleave', () => isDrawing = false);