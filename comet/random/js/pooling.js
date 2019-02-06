'use strict';

function getPoolingData() {

  const request = new XMLHttpRequest();
  request.addEventListener("load", onLoad);
  request.open('GET', 'https://neto-api.herokuapp.com/comet/pooling');
  request.send();

  function onLoad() {
    if (request.status < 200 || request.status >= 300) {
      console.error(request);
    } else {
      setNumber('.pooling', request.responseText);
    }
  }
}

function setNumber(selector, data) {
  const container = document.querySelector(selector);
  const cards = container.querySelectorAll('div');
  cards.forEach(el => {
    el.classList.remove('flip-it');
    if (el.textContent === data) {
      el.classList.add('flip-it');
    }
  });
}

setInterval(getPoolingData, 5000);
