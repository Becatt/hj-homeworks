'use strict';

const food = document.querySelector('.food');

function createCallbackName() {
  return 'callback' + Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
}


function loadData(url, callback) {
  return new Promise((done, fail) => {
    window[`${callback}`] = done;
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  });
}

function insertDataRecipe(data) {
  food.querySelector('[data-title]').textContent = data.title;
  food.querySelector('[data-pic]').style = `background: url(${data.pic})`;
  food.querySelector('[data-ingredients]').textContent = data.ingredients.join(', ');
}

function insertDataRaiting(data) {
  food.querySelector('[data-rating]').textContent = data.rating; // округлить до сотых
  // food.querySelector('[data-star]').textContent = data.rating; // добавить ширину
  food.querySelector('[data-votes]').textContent = `(${data.votes} оценок)`;
}


function insertDataConsumers(data) {
  const consumers = food.querySelector('[data-consumers]');
  console.log();
  data.consumers.forEach(el => {
    const consumer = document.createElement('img');
    consumer.src = el.pic;
    consumer.title = el.name;
    consumers.appendChild(consumer);
  });

  const span = document.createElement('span');
  const total = data.total - data.consumers.length;
  span.textContent = `(+${total})`;
  consumers.appendChild(span);
}

let callback = createCallbackName();
loadData(`https://neto-api.herokuapp.com/food/42?jsonp=${callback}`, callback).then(insertDataRecipe);

callback = createCallbackName();
loadData(`https://neto-api.herokuapp.com/food/42/rating?jsonp=${callback}`, callback).then(insertDataRaiting);

callback = createCallbackName();
loadData(`https://neto-api.herokuapp.com/food/42/consumers?jsonp=${callback}`, callback).then(insertDataConsumers);
