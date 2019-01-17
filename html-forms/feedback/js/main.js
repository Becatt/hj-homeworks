'use script';

const form = document.querySelector('.contentform');
const buttonSend = form.querySelector('.button-contact');
const output = document.getElementById('output');
const buttonUpdate = output.querySelector('.button-contact');
const textarea = form.getElementsByTagName('textarea')[0];
const index = form.querySelector('input[name=zip]');

textarea.addEventListener('input', checkForm);
buttonSend.addEventListener('click', onClickButtonSend);
buttonUpdate.addEventListener('click', onClickButtonUpdate);
index.addEventListener('input', chekIndex);

for (let item of form.getElementsByTagName('input')) {
  item.addEventListener('change', checkForm);
}


function checkForm() {
  let check = textarea.value ? true : false;

  for (let item of form.getElementsByTagName('input')) {
    if(!item.value) {
      check = false;
    }
  }

  if(check) {
    buttonSend.removeAttribute('disabled');
  } else {
    buttonSend.setAttribute('disabled', '');
  }
}

function setData() {
  document.getElementById(textarea.name).value = textarea.value;

  for (let item of form.getElementsByTagName('input')) {
    if(document.getElementById(item.name)) {
      document.getElementById(item.name).value = item.value;
    }
  }
}

function onClickButtonSend() {
  event.preventDefault();
  form.classList.add('hidden');
  output.classList.remove('hidden');
  setData();
}

function onClickButtonUpdate() {
  event.preventDefault();
  form.classList.remove('hidden');
  output.classList.add('hidden');
}

function chekIndex() {
  const str = index.value;
  index.value = str.match(/\d+/);
}

