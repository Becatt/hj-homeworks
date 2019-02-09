'use strict';

const btnSeatMap = document.getElementById('btnSeatMap'),
      totalPax = document.getElementById('totalPax'),
      totalAdult = document.getElementById('totalAdult'),
      totalHalf = document.getElementById('totalHalf'),
      btnSetFull = document.getElementById('btnSetFull'),
      btnSetEmpty = document.getElementById('btnSetEmpty'),
      seatMapTitle = document.getElementById('seatMapTitle'),
      seatMapDiv = document.getElementById('seatMapDiv');

btnSetFull.setAttribute('disabled', '');
btnSetEmpty.setAttribute('disabled', '');

btnSetFull.addEventListener('click', () => {
  event.preventDefault();
  Array.from(seatMapDiv.querySelectorAll('.seat')).forEach((el) => {
    el.classList.add('adult')
  });
  getTotal();
});

btnSetEmpty.addEventListener('click', () => {
  event.preventDefault();
  Array.from(seatMapDiv.querySelectorAll('.seat')).forEach((el) => {
    el.classList.remove('adult', 'half')
  });
  getTotal();
});

btnSeatMap.addEventListener('click', getData);

function getData(event) {
  event.preventDefault();
  const palneId = document.getElementById('acSelect').value,
        request = new XMLHttpRequest();

  request.addEventListener("load", onLoad);
  request.open('GET', `https://neto-api.herokuapp.com/plane/${palneId}`);
  request.send();


  function onLoad() {
    const response = JSON.parse(request.responseText);
    // console.log(response.scheme.reduce((accumulator, currentValue) => accumulator + currentValue));
    // console.log(response.scheme)

    btnSetFull.removeAttribute('disabled');
    btnSetEmpty.removeAttribute('disabled');

    seatMapTitle.textContent = `${response.title} (${response.passengers} пассажиров)`;

    while (seatMapDiv.firstChild) {
      seatMapDiv.removeChild(seatMapDiv.firstChild);
    }

    seatMapDiv.appendChild(
      response.scheme.reduce((f, item, index) => {
          f.appendChild(schemeJSTemplate(item, index, response));
          return f;
        }, document.createDocumentFragment())
    );

    const seats = seatMapDiv.querySelectorAll('.seat');

    getTotal();

    Array.from(seats).forEach((el) => {
      el.addEventListener('click', (event) => {
        const currentTarget = event.currentTarget;
        if(!currentTarget.classList.contains('seat')) { //узкое место
          return;
        }

        if(currentTarget.classList.contains('adult') || currentTarget.classList.contains('half')) {
          currentTarget.classList.remove('adult', 'half');
        } else {
          currentTarget.classList.remove('adult', 'half');
            if(event.altKey) {
              currentTarget.classList.add('half');
          } else {
            currentTarget.classList.add('adult');
          }
        }
        getTotal();
      });
    });
  }

  function schemeJSTemplate(item, index, response) {
    const container = createElement('div', '', ['row', 'seating-row', 'text-center']),
          rowNumber = createElement('div', container, ['col-xs-1', 'row-number']),
          seatContainer1 = createElement('div', container, 'col-xs-5'),
          seatContainer2 = createElement('div', container, 'col-xs-5');

    createElement('h2', rowNumber, '', index + 1);

    function createElement(tag, parent, classes, content = '') {
      const element = document.createElement(tag);
      if(classes) {
        element.classList.add(...[].concat(classes));
      }
      if(content) {
        element.textContent = content;
      }
      if(parent) {
        parent.appendChild(element);
      }
      return element;
    }

    function cteateSeat(letters) {
      for(const label of letters) {
        if(seatContainer1.children.length < 3){
            const seat = createElement('div', seatContainer1, ['col-xs-4', 'seat']);
            createElement('span', seat, 'seat-label', label);
          } else {
            const seat = createElement('div', seatContainer2, ['col-xs-4', 'seat']);
            createElement('span', seat, 'seat-label', label);
          }
       }
    }

    if(item === 6) {
      cteateSeat(response.letters6);
    } else if(item === 4){
      createElement('div', seatContainer1, ['col-xs-4', 'no-seat']);
      cteateSeat(response.letters4);
      createElement('div', seatContainer2, ['col-xs-4', 'no-seat'])
    } else {
      for(let i = 0; i === 6; i++) {
        createElement('div', seatContainer1, ['col-xs-4', 'no-seat']);
      }
    }

    return container;
  }

}

function getTotal() {
  const adult = document.querySelectorAll('.adult').length,
        half = document.querySelectorAll('.half').length;

  totalAdult.textContent = adult;
  totalHalf.textContent = half;
  totalPax.textContent = adult + half;
}
