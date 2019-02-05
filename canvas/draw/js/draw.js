'use strict';

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

let curves = [];
let drawing = false;
let weird = false;
let needsRepaint = false;
let brushRadiusInc = false;
let brushRadius = 100;
let hue = 0;

// curves and figures
function circle(point) {
  ctx.beginPath();
  ctx.fillStyle = `hsl(${point.hue}, 100%, 50%)`;
  ctx.arc(...point, point.brushRadius / 2, 0, 2 * Math.PI);
  ctx.fill();
}

function smoothCurveBetween (p1, p2) {
  // Bezier control point
  ctx.strokeStyle = `hsl(${p1.hue}, 100%, 50%)`;
  ctx.lineWidth = p1.brushRadius;
  ctx.beginPath();
  const cp = p1.map((coord, idx) => (coord + p2[idx]) / 2);
  ctx.quadraticCurveTo(...p1, ...cp);
  ctx.stroke();
}

function smoothCurve(points) {
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  ctx.moveTo(...points[0]);

  for(let i = 1; i < points.length - 1; i++) {
    smoothCurveBetween(points[i], points[i + 1]);
  }
}

// events

canvas.addEventListener("mousedown", (evt) => {
  drawing = true;
  weird = evt.shiftKey; // press shift to make things weird =)

  const curve = []; // create a new curve
  const point = [evt.offsetX, evt.offsetY];
  point.hue = hue;
  point.brushRadius = brushRadius;

  curve.push(point); // add a new point
  curves.push(curve); // add the curve to the array of curves
  needsRepaint = true;
});

canvas.addEventListener("mouseup", (evt) => {
  drawing = false;
});

canvas.addEventListener("mouseleave", (evt) => {
  drawing = false;
});

canvas.addEventListener("mousemove", (evt) => {
  if (drawing) {
    weird = evt.shiftKey;
    // add a point
    const point = [evt.offsetX, evt.offsetY];
    point.hue = hue;
    point.brushRadius = brushRadius;

    curves[curves.length - 1].push(point);
    needsRepaint = true;
  }
});

canvas.addEventListener('dblclick', clear);

function repaint () {
  // clear before repainting
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  curves
    .forEach((curve) => {
      // first...
      circle(curve[0]);

      // the body is compraised of lines
      smoothCurve(curve);
    });
}

window.addEventListener('resize', () => {
    resizeCanvas();
    clear();
});

function clear() {
  curves = [];
  needsRepaint = true;
}

function resizeCanvas() {
  canvas.height = document.documentElement.clientHeight;
  canvas.width = document.documentElement.clientWidth;
}

function resizeBrush() {
  if(brushRadiusInc) {
    brushRadius++;
    if(brushRadius === 100) {
      brushRadiusInc = false;
    }
  } else {
    brushRadius--;
    if(brushRadius === 5) {
      brushRadiusInc = true;
    }
  }
}

function updateHue() {
  hue = weird ? hue - 1 : hue + 1;
  if(hue > 359) {
    hue = 0
  } else if(hue < 0) {
    hue = 359;
  }
}


function tick() {
  resizeBrush();
  updateHue();
  if(needsRepaint) {
    repaint();
    needsRepaint = false;
  }

  window.requestAnimationFrame(tick);
}

resizeCanvas();
tick();
