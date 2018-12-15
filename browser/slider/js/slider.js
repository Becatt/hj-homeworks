'use strict';

const links = [
                "i/airmax.png",
                "i/airmax-jump.png",
                "i/airmax-on-foot.png",
                "i/airmax-playground.png",
                "i/airmax-top-view.png"
                ];
const img = document.getElementById('slider');

let slider = setTimeout(function nextSlide() {
  for (let i = 0; i < links.length; i++) {
      setTimeout(function() {
        img.src = links[i];
      }, i * 5000);
  }
  slider = setTimeout(nextSlide, links.length * 5000);
}, 0);
