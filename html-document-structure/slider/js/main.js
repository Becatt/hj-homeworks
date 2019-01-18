'use strict';

const container = document.querySelector('.slider');
const slides = container.querySelector('.slides');
const butNext = container.querySelector('a[data-action=next]');
const butPrev = container.querySelector('a[data-action=prev]');
const butFirst = container.querySelector('a[data-action=first]');
const butLast = container.querySelector('a[data-action=last]');

slides.firstElementChild.classList.add('slide-current');
UpdateButtonStatus();

function moveSlide() {
  const currentSlide = container.querySelector('.slide-current');
  currentSlide.classList.remove('slide-current');

  switch(event.currentTarget.getAttribute('data-action')) {
    case 'next':
      currentSlide.nextElementSibling.classList.add('slide-current');
      UpdateButtonStatus();
      break;
    case 'prev':
      currentSlide.previousElementSibling.classList.add('slide-current');
      UpdateButtonStatus();
      break;
    case 'first':
      slides.firstElementChild.classList.add('slide-current');
      UpdateButtonStatus();
      break;
    case 'last':
      slides.lastElementChild.classList.add('slide-current');
      UpdateButtonStatus();
      break;
  }
}

function UpdateButtonStatus() {
  const currentSlide = container.querySelector('.slide-current');
  if(currentSlide.nextElementSibling) {
    butNext.classList.remove('disabled');
    butLast.classList.remove('disabled');
    butNext.addEventListener('click', moveSlide);
    butLast.addEventListener('click', moveSlide);
  } else {
    butNext.classList.add('disabled');
    butLast.classList.add('disabled');
    butNext.removeEventListener('click', moveSlide);
    butLast.removeEventListener('click', moveSlide);
  }
  if(currentSlide.previousElementSibling) {
    butPrev.classList.remove('disabled');
    butFirst.classList.remove('disabled');
    butPrev.addEventListener('click', moveSlide);
    butFirst.addEventListener('click', moveSlide);
  } else {
    butPrev.classList.add('disabled');
    butFirst.classList.add('disabled');
    butPrev.removeEventListener('click', moveSlide);
    butFirst.removeEventListener('click', moveSlide);
  }
}
