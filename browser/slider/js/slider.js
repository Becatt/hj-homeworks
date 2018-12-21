'use strict';

const links = [
                "i/airmax.png",
                "i/airmax-jump.png",
                "i/airmax-on-foot.png",
                "i/airmax-playground.png",
                "i/airmax-top-view.png"
                ];
const img = document.getElementById('slider');

let currentPhoto = 0;
img.src = links[currentPhoto];

function nextSlide() {
  img.src = links[currentPhoto];
  currentPhoto++;
  if(currentPhoto === links.length) {
    currentPhoto = 0;
  }
  setTimeout(nextSlide, 5000);
}

nextSlide();
