'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
  document.querySelector('.counter').textContent = data.connections;
  document.querySelector('output.errors').textContent = data.errors;
}

window.addEventListener('beforeunload', () => {
  connection.close(1000);
});
