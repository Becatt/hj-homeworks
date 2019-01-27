'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
showBubbles(connection);

connection.addEventListener('error', error => {
console.log(`Произошла ошибка: ${error.data}`);
});

window.addEventListener('click', (event) => {
  connection.send(JSON.stringify({
    x: event.pageX,
    y: event.pageY
  }));

});
