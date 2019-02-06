'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.addEventListener('click', () => createStars(randomInt(200, 400)));

createStars(randomInt(200, 400));

function randomFraction(min = 0, max = 0) {
  return Math.random() * (max - min) + min;
}

function randomInt(min = 0, max = 0) {
  return Math.round(randomFraction(min, max));
}

function createStars(count) {
  ctx.beginPath();
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for(let i = 1; i < count; i++) {

    const x = randomInt(0, canvas.width);
    const y = randomInt(0, canvas.height);
    const radius = randomFraction(0, 1.1 / 2);
    console.log(radius);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();

    let color = randomInt(0, 2);

    switch(color) {
      case 0:
        color = '#ffffff';
        break;
      case 1:
        color = '#ffe9c4';
        break;
      case 2:
        color = '#d4fbff';
        break;
    }
    ctx.fillStyle = color;
    ctx.globalApha = randomFraction(0.8, 1);
  }
}

