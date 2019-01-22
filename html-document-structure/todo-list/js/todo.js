'use strict';
const container = document.querySelector('.todo-list');

Array.from(container.querySelectorAll('input')).forEach(input => input.addEventListener('click', updateInputStatus));

function updateInputStatus() {
  const parent = this.parentElement
  const queryStr = this.checked ? '.done' : '.undone';
  container.querySelector(queryStr).appendChild(parent);
}
