'use strict';

const listBlock = document.querySelector('.list-block');
const inputs = listBlock.getElementsByTagName('input');
const output = document.getElementsByTagName('output')[0];

function countTask() {
  let taskCount = 0;
  let taskEnd = 0;

  for(let item of inputs) {
    taskCount++;
    if (item.checked) {
      taskEnd++;
    }
  }

  if(taskEnd === taskCount) {
    listBlock.classList.add('complete');
  } else {
    listBlock.classList.remove('complete');
  }

  output.innerHTML = `${taskEnd} / ${taskCount}`;
}

countTask();

function checked(event) {
  if(this.checked) {
    this.setAttribute('checked', '');
  } else {
    this.removeAttribute('checked');
  }
  countTask();
}

for(let item of inputs) {
  item.addEventListener('change', checked);
}
