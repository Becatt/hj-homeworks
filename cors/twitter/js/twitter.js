'use strict';

function loadData(url) {
  return new Promise((done, fail) => {
    window.parseData = done;
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  });
}

function showData(data) {
  console.log(data);
  document.querySelector('[data-wallpaper]').src = data.wallpaper;
  document.querySelector('[data-description]').textContent = data.description;
  document.querySelector('[data-pic]').src = data.pic;
  document.querySelector('[data-tweets]').textContent = data.tweets;
  document.querySelector('[data-followers]').textContent = data.followers;
  document.querySelector('[data-following]').textContent = data.following;
  document.querySelector('[data-username]').textContent = data.username;
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp?jsonp=parseData').then(data => showData(data))
