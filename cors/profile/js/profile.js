'use strict';

const card = document.querySelector('.card');

function loadData(url) {
  return new Promise((done, fail) => {
    window.parseData = done;
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  });
}

function insertDataProfile(data) {
  card.querySelector('[data-name]').textContent = data.name;
  card.querySelector('[data-description]').textContent = data.description;
  card.querySelector('[data-pic]').src = data.pic;
  card.querySelector('[data-position]').textContent = data.position;
  return `https://neto-api.herokuapp.com/profile/${data.id}/technologies?jsonp=parseData`;
}

function insertDataTechnologies(data) {
  const technologies = document.querySelector('[data-technologies]');
  data.forEach((technology) => {
    const span = document.createElement('span')
    span.classList.add('devicons')
    span.classList.add(`devicons-${technology}`);
  technologies.appendChild(span);
  });
}

loadData(`https://neto-api.herokuapp.com/profile/me?jsonp=parseData`)
        .then(insertDataProfile)
        .then(loadData)
        .then(insertDataTechnologies)
        .then(document.querySelector('.content').style = 'display: initial');
