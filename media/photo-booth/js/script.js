'use strict';
// находм элементы, которые есть изначально в html
const app = document.querySelector('.app'),
      errorMessage = document.getElementById('error-message'),
      controls = app.querySelector('.controls'),
      btn = document.getElementById('take-photo'),
      list = document.querySelector('.list'),
      canvas = document.createElement('canvas');

app.appendChild(canvas);
// настраиваем работу с камерой
// работа с видео
window.navigator.mediaDevices.getUserMedia({
  audio: false,
  video: true
}).then((stream) => {
  const video = document.createElement('video');
  video.srcObject = stream;
  app.appendChild(video);

  video.onloadedmetadata = function(e) {
    video.play();
  }

  controls.setAttribute('style', 'display: block'); // оторбражаем кнопку снимок

  btn.addEventListener('click', (event) => {

    // настраиваем фото


    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);


    // воспроизведение щелчка затвора
    const audio = document.createElement('audio');
    audio.src = './audio/click.mp3';
    document.body.appendChild(audio);
    audio.autoplay = true;

    // удаялем тег audio после воспроизвдения, даем на воспроизведение 2 сек.
    setTimeout(() => {
      document.body.removeChild(audio)
    }, 2000);

    // объект карточки с фото
    const figure = {
      tag: 'figure',
      content: [{
        tag: 'img',
        attrs: {src: canvas.toDataURL()}
      },
      {
        tag: 'figcaption',
        content: [{
          tag: 'a',
          attrs: {
            href: canvas.toDataURL(),
            download: 'snapshot.png'
          },
          content: {
            tag: 'i',
            cls: 'material-icons',
            content: 'file_download'
          }
        },
        {
          tag: 'a',
          content: {
            tag: 'i',
            cls: 'material-icons',
            content: 'file_upload'
          }
        },
        {
          tag: 'a',
          content: {
            tag: 'i',
            cls: 'material-icons',
            content: 'delete'
          }
        }]
      }]
    }

    const firstChild = list.querySelector('figure'),
          photo = createElement(figure);

    // вешаем обработчики событий на кнопки карточки с фото
    photo.addEventListener('click', event => {
      // event.preventDefault();
      const currentTarget = event.currentTarget;
      // console.log(curIndex);

      // удаление
      if(event.target.textContent === 'delete') {
         list.removeChild(currentTarget)
        }

      // загрузка на сервер, почему-то уходит только верхняя левая часть фото
      if(event.target.textContent === 'file_upload') {
        const img = currentTarget.querySelector('img'),
              canvasImg = document.createElement('canvas'),
              ctxImg = canvasImg.getContext('2d');

        canvasImg.width = img.width;
        canvasImg.height = img.height;
        ctxImg.drawImage(img, 0, 0);
        console.log(img);
        canvasImg.toBlob( blob => {
          const formData = new FormData();
          formData.append('image', blob);
          fetch('https://neto-api.herokuapp.com/photo-booth', {
            method: 'POST',
            body: formData,
          })
          .then(response => console.log(response))
          .catch(e => {
            document.querySelector('#error-message').style.display = 'block';
            document.querySelector('#error-message').textContent = 'Ошибка: ' + err;;
          });
        });

      }
    });

    // добавляем картоки в DOM и присваиваем индекс в дата атрибут
    list.insertBefore(photo, firstChild);
  });

}).catch((err) => {
    document.querySelector('#error-message').style.display = 'block';
    document.querySelector('#error-message').textContent = 'Ошибка: ' + err;;
});

// функция для преобразования объекта карточки фото в html разметку
function createElement(block) {
 if ((block === undefined) || (block === null) || (block === false)) {
      return document.createTextNode('');
  }
  if ((typeof block === 'number') || (typeof block === 'string') || (block === true)) {
      return document.createTextNode(block.toString());
  }

  if (Array.isArray(block)) {
    return block.reduce((f, item) => {
      f.appendChild(
          createElement(item)
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
      element.appendChild(createElement(block.content));
  }

  return element;
}
