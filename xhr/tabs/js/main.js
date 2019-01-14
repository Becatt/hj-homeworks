'use strict'

const container = document.getElementsByClassName('tabs')[0];
const tabs = container.getElementsByTagName('a');
const content = document.getElementById('content');
const preloader = document.getElementById('preloader');

const request = new XMLHttpRequest();
request.addEventListener("load", onLoad);
request.addEventListener("loadstart", onLoadStart);
request.addEventListener("loadend", onLoadEnd);
request.open('GET', getActiveTab().href);
request.send();
function onLoad() {
  if (request.status === 200) {
    content.innerHTML = request.responseText;
  }
}

function onLoadStart() {
  if (request.status !== 200) {
    content.innerHTML =`<h3>Ответ ${request.status}: ${request.statusText}</h3>`;
  } else {
    content.innerHTML = request.responseText;
  }
}

function onLoadEnd() {
  preloader.classList.add('hidden');
}

function getActiveTab() {
  return container.getElementsByClassName('active')[0];
}

function setActive(event) {
  event.preventDefault();
  getActiveTab().classList.remove('active');
  this.classList.add('active');
  request.open('GET', this.href);
  request.send();
}

for (let tab of tabs) {
  tab.addEventListener('click', setActive)
}
