'use strict';

const content = document.getElementById('content');
const request = new XMLHttpRequest();
request.addEventListener("load", onLoad);
request.open('GET', 'https://neto-api.herokuapp.com/book/');
request.send();

function onLoad() {
  if (request.status !== 200) {
    content.innerHTML = `<h3>Ошибка ${request.status}: ${request.statusText}</h3>`;
  } else {
    const response = JSON.parse(request.responseText);
    content.innerHTML = setData(response);
  }
}

function setData(response) {
  let item = '';
  for(let book of response) {
     item += `<li
                data-title = '${book.title}'
                data-author = '${book.author.name}'
                data-info = '${book.info}'
                data-price = '${book.price}'
              >
                <img src = '${book.cover.small}' >
              </li>`;

  }
  return item;
}
