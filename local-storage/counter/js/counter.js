'use strict';

let count = 0;

const container = document.querySelector('.wrap-btns');
const counter = document.querySelector('#counter');

container.addEventListener('click', setCount);
showCount();

function getCoockieCount() {
  if(document.cookie) {
    const cookieData = document.cookie.split(';').forEach(el => {
      const split = el.split('=');
      if(split[0] === 'count') {
        count = split[1];
      }
    });
  }
}

function showCount() {
  getCoockieCount();
  counter.textContent = count;
}

function setCount(event) {
  switch(event.target.getAttribute('id')) {
    case 'increment':
      count++;
      break;
    case 'decrement':
      count--;
      break;
    case 'reset':
      count = 0;
      break;
  }
  document.cookie = `count=${count}`
  counter.textContent = count;
}
