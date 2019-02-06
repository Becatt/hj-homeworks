'use strict';

function getLongPoolingData() {

  const request = new XMLHttpRequest();
  request.addEventListener("load", onLoad);
  request.open('GET', 'https://neto-api.herokuapp.com/comet/long-pooling');
  request.send();

  function onLoad() {
    if (request.status < 200 || request.status >= 300) {
      console.error(request);
    } else {
      const response = request.responseText.match(/\d+/)[0];
      setNumber('.long-pooling', response);
    }
    getLongPoolingData();
  }
}

getLongPoolingData();
