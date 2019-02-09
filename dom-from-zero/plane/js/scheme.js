'use strict';

const btnSeatMap = document.getElementById('btnSeatMap');

btnSeatMap.addEventListener('click', getData);

function getData(event) {
  event.preventDefault();
  const palneId = document.getElementById('acSelect').value;
  const request = new XMLHttpRequest();
  request.addEventListener("load", onLoad);
  request.open('GET', `https://neto-api.herokuapp.com/plane/${palneId}`);
  request.send();


  function onLoad() {
    const response = JSON.parse(request.responseText);
    console.log(response);

    const seatMapTitle = document.getElementById('seatMapTitle');
    seatMapTitle.textContent = `${response.title} (${response.passengers} пассажиров)`;

    document.getElementById('seatMapDiv').appendChild(
        browserJSEngine(response.scheme.map(schemeJSTemplate))
    );

  }

  function schemeJSTemplate(scheme, index) {
    console.log();
    return {
      tag: 'div',
      cls: ['row', 'seating-row', 'text-center'],
      content: {
        tag: 'div',
        cls: ['col-xs-1', 'row-number'],
        content: {
          tag: 'h2',
          cls: '',
          content: index + 1
        }
      },
      tag: 'div',
      cls: 'col-xs-5',
      contenet: {
        tag: 'div',
        cls: ['col-xs-4', 'seat'],
        content: {
          tag: 'span ',
          cls: 'seat-label',
          content: 1/*?????*/
        }
      }

    }
  }

  function browserJSEngine(block) {
        if ((block === undefined) || (block === null) || (block === false)) {
            return document.createTextNode('');
        }
        if ((typeof block === 'number') || (typeof block === 'string') || (block === true)) {
            return document.createTextNode(block.toString());
        }

        if (Array.isArray(block)) {
            return block.reduce((f, item) => {
                f.appendChild(
                    browserJSEngine(item)
                );

                return f;
            }, document.createDocumentFragment());
        }

        const element = document.createElement(block.tag);

        if (block.cls) {
            element.classList.add(...[].concat(block.cls));
        }

        if (block.attrs) {
            Object.keys(block.attrs).forEach(key => {
                element.setAttribute(key, block.attrs[key]);
            });
        }

        if (block.content) {
            element.appendChild(browserJSEngine(block.content));
        }

        return element;
    }
}

