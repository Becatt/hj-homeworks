'use strict';
const container = document.querySelector('.todo-list');

Array.from(container.querySelectorAll('input')).forEach(input => input.addEventListener('click', updateInputStatus));

function updateInputStatus() {
  const parent = this.parentElement
  if(this.checked) {
    container.querySelector('.done').insertBefore(parent, null);
  } else {
    const undone = container.querySelector('.undone').insertBefore(parent, null);
  }
}
