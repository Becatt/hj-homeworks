  'use strict';

  const buttons = document.querySelectorAll('.button');
  Array.from(buttons).forEach(b => b.addEventListener('click', sendData))

  function sendData() {
    event.preventDefault();
    let url = 'signin';
    let formClass = '.sign-in-htm';

    if(document.querySelector('.sign-up').checked) {
      formClass = '.sign-up-htm';
      url = 'signup'
    }
    const form = document.querySelector(formClass);
    const xhr = new XMLHttpRequest();
    const formData = new FormData(form);
    let objFormData = {};
    for (const [k, v] of formData) {
      objFormData[k] = v;
    }

    xhr.addEventListener('load', () => {
      const response = JSON.parse(xhr.response);
      const message = form.querySelector('.error-message');
      if(response.error) {
        console.log(xhr.response);
        message.textContent = response.message;
      } else {
        message.textContent = formClass === '.sign-in-htm' ? `Пользователь ${response.name} успешно авторизован` : `Пользователь ${response.name} успешно зарегистрирован`;
      }
    });

    xhr.open('POST', `https://neto-api.herokuapp.com/${url}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(objFormData));
  }
