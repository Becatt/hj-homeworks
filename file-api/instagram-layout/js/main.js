const addClass = ( className, context ) => context.classList.add( className ),
  removeClass = ( className, context ) => context.classList.remove( className ),
  hasClass = ( className, context ) => context.classList.contains( className );
class iLayout {
  constructor( container ) {
    this.container = container;
    this.positionsContainer = container.querySelector( '.layout__positions' );
    this.actionButton = container.querySelector( '.layout__button' );
    this.result = container.querySelector( '.layout__result' );
    this.layout = {
      left: null,
      top: null,
      bottom: null
    };
    this.registerEvents();
  }
  registerEvents() {
    this.positionsContainer.addEventListener('dragover', this.showBorder);
    this.positionsContainer.addEventListener('drop', this.loadFile);
    this.positionsContainer.addEventListener('dragleave', this.hideBorder);
    this.actionButton.addEventListener('click', this.createCollge.bind(this));
  }

  showBorder(event) {
    event.preventDefault();
    event.target.classList.add('layout__item_active');
  }

  hideBorder(event) {
    event.target.classList.remove('layout__item_active');
  }

  loadFile() {
    event.preventDefault();
    event.target.classList.remove('layout__item_active');

    const file = event.dataTransfer.files[0],
          fileTypeRegExp = /^image\//;

    if(!fileTypeRegExp.test(file.type)) {
      event.target.textContent = 'Ошибка! Файл не является картинкой';
      return;
    }

    if(hasClass('layout__image', event.target)) {
      event.target.src = URL.createObjectURL(file);
    }
    const img = document.createElement('img');
    img.classList.add('layout__image');
    img.src = URL.createObjectURL(file);
    event.target.appendChild(img);
  }

  createCollge() {

    const canvas = document.createElement('canvas'),
          ctx = canvas.getContext('2d'),
          images = this.positionsContainer.querySelectorAll('.layout__item');

    canvas.width = this.positionsContainer.offsetWidth;
    canvas.height = this.positionsContainer.offsetHeight;

    Array.from(images).forEach(el => {
      const boundEl = el.parentElement.getBoundingClientRect(),
            x = Math.abs(Math.round(el.offsetLeft - boundEl.left)),
            y = Math.abs(Math.round(el.offsetTop - boundEl.top)),
            img = el.querySelector('img');
      ctx.drawImage(img, x, y, el.offsetWidth, img.height);
    });
    this.result.innerText = `<img src="${canvas.toDataURL()}">`;
  }
}

new iLayout( document.getElementById( 'layout' ));
