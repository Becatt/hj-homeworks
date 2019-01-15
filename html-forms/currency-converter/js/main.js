'use strict';

const content = document.getElementById('content');
const loader = document.getElementById('loader');
const from = document.getElementById('from');
const to = document.getElementById('to');
const result = document.getElementById('result');
const source = document.getElementById('source');

const request = new XMLHttpRequest();
request.addEventListener("load", onLoad);
request.addEventListener("loadstart", onLoadStart);
request.addEventListener("loadend", onLoadEnd);
request.open('GET', 'https://neto-api.herokuapp.com/currency');
request.send();

function onLoad() {
  if (request.status !== 200) {
    content.innerHTML =`<h3>Ошибка ${request.status}: ${request.statusText}</h3>`;
  } else {
    const response = JSON.parse(request.responseText);
    // console.log(response)
    setData(response);
    getRate();
  }
}

function onLoadStart() {
  loader.classList.remove('hidden');
}

function onLoadEnd() {
  loader.classList.add('hidden');
  content.classList.remove('hidden');
}

function setData(response) {
  let cur = '';
  for(let item of response) {
    cur += `<option value = ${item.value}>${item.code}</option>\n`
  }
  from.innerHTML = cur;
  to.innerHTML = cur;
}

function getRate() {
  const rate = Math.ceil(from.value / to.value * source.value * 100) / 100;
  result.innerHTML = `${rate.toFixed(2)}`;
}

content.addEventListener('input', getRate);
