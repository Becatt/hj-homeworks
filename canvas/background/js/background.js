const canvas = document.querySelector('#wall');
canvas.height = document.documentElement.clientHeight;
canvas.width = document.documentElement.clientWidth;
const ctx = canvas.getContext('2d');
const circles = [];
const crosses = [];
const figureAmount = randomInt(25, 100);

function nextPoint1(x, y, time) {
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  };
}

function nextPoint2(x, y, time) {
  return {
    x: x + Math.sin((x + (time / 10)) / 100) * 5,
    y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
  }
}

function randomFraction(min = 0, max = 0) {
  return Math.random() * (max - min) + min;
}

function randomInt(min = 0, max = 0) {
  return Math.round(randomFraction(min, max));
}

class Figure {
  constructor() {
    this.xStart = randomInt(0, canvas.width);
    this.yStart = randomInt(0, canvas.height);
    this.x = this.xStart;
    this.y = this.yStart;
    this.size = randomFraction(0.1, 0.6);
    this.lineWidth = this.size * 5;
}

  updatePos() {
    const { x, y } = this.nextPoint(this.xStart, this.yStart, Date.now());
    this.x = x;
    this.y = y;
  }
}


class Сircle extends Figure {
  constructor() {
    super();
    this.radius = this.size * 12;
  }

  show() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.lineWidth = this.lineWidth;
    ctx.strokeStyle = 'white';
    ctx.stroke();
  }
}

class Сross extends Figure {
  constructor() {
    super();
    this.side = this.size * 10;
    this.angle = randomFraction(0, 2 * Math.PI);
    this.angleSpeed = randomFraction(-0.2, 0.2);
  }

  updatePos() {
    super.updatePos();
    this.angle += this.angleSpeed * 1;
  }

  show() {
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = this.lineWidth;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.moveTo(this.side, 0);
    ctx.lineTo(-this.side, 0);
    ctx.moveTo(0, this.side);
    ctx.lineTo(0, -this.side);
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.restore();
  }
}

function createFigure(figure = {}, container = []) {
  figure.nextPoint = randomInt(0, 1) ? nextPoint1 : nextPoint2;
  container.push(figure);
}

for (let i = 0; i < figureAmount; i++) {
  createFigure(new Сircle, circles);
  createFigure(new Сross, crosses);
}

function repaint() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < figureAmount; i++) {
    circles[i].updatePos();
    circles[i].show();
    crosses[i].updatePos();
    crosses[i].show();
  }
}

setInterval(repaint, 50);
