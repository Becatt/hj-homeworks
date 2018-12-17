'use strict';

const photos = [
                "i/breuer-building.jpg",
                "i/guggenheim-museum.jpg",
                "i/headquarters.jpg",
                "i/IAC.jpg",
                "i/new-museum.jpg"
                ];
const currentPhoto = document.getElementById('currentPhoto');

let currentId = 0;
currentPhoto.src = photos[currentId];

function photoInctement() {
  if(currentId === photos.length - 1) {
    currentId = 0;
  } else {
    currentId++;
  }
  currentPhoto.src = photos[currentId];
}

function photoDecrement() {
  if(currentId === 0) {
    currentId = photos.length - 1;
  } else {
    currentId--;
  }
  currentPhoto.src = photos[currentId];
}

const prevPhoto = document.getElementById('prevPhoto');
const nextPhoto = document.getElementById('nextPhoto');

nextPhoto.onclick = photoInctement;
prevPhoto.onclick = photoDecrement;
