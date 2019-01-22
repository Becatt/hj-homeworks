'use strict';

const container = document.querySelector('.slider');
const slides = container.querySelector('.slides');
const butNext = container.querySelector('a[data-action=next]');
const butPrev = container.querySelector('a[data-action=prev]');
const butFirst = container.querySelector('a[data-action=first]');
const butLast = container.querySelector('a[data-action=last]');

butNext.addEventListener('click', moveSlide);
butPrev.addEventListener('click', moveSlide);
butFirst.addEventListener('click', moveSlide);
butLast.addEventListener('click', moveSlide);

slides.firstElementChild.classList.add('slide-current');
UpdateButtonStatus();

function moveSlide() {
  if(event.target.classList.contains('disabled')) {
    return;
  }

  const currentSlide = container.querySelector('.slide-current');
  currentSlide.classList.remove('slide-current');

  switch(event.target.getAttribute('data-action')) {
    case 'next':
      currentSlide.nextElementSibling.classList.add('slide-current');
      break;
    case 'prev':
      currentSlide.previousElementSibling.classList.add('slide-current');
      break;
    case 'first':
      slides.firstElementChild.classList.add('slide-current');
      break;
    case 'last':
      slides.lastElementChild.classList.add('slide-current');
      break;
  }
  UpdateButtonStatus();
}

function UpdateButtonStatus() {
  const currentSlide = container.querySelector('.slide-current');
  butNext.classList.toggle('disabled', !currentSlide.nextElementSibling);
  butLast.classList.toggle('disabled', !currentSlide.nextElementSibling);
  butPrev.classList.toggle('disabled', !currentSlide.previousElementSibling);
  butFirst.classList.toggle('disabled', !currentSlide.previousElementSibling);
}
