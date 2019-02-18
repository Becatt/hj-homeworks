const prop = ( data, name ) => data.map( item => item[ name ] ),
  summ = data => data.reduce(( total, value ) => total + value, 0 );
class SpriteGenerator {
  constructor( container ) {
    this.uploadButton = container.querySelector( '.sprite-generator__upload' );

    this.submitButton = container.querySelector( '.sprite-generator__generate' );
    this.imagesCountContainer = container.querySelector( '.images__added-count-value' );
    this.codeContainer = container.querySelector( '.sprite-generator__code' );
    this.imageElement = container.querySelector( '.sprite-generator__result-image' );
    this.images = [];

    this.imagesCount = 0;

    this.registerEvents();
  }
  registerEvents() {
    this.uploadButton.addEventListener('change', () => this.getImages.call(this, event));
    this.submitButton.addEventListener('click', () => this.generateSprite.call(this, event));
  }

  getImages() {
    const fileTypeRegExp = /^image\//;
    Array.from( event.currentTarget.files ).forEach( el => {
      if (fileTypeRegExp.test( el.type )) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(el);
        img.setAttribute('name', el.name)
        this.images.push(img)
        this.imagesCount++;
      }
    })
    this.imagesCountContainer.textContent = this.imagesCount;
  }

  generateSprite() {
    let css = `.icon {
      display: inline-block;
      background-image: url(img/sprite.png);
    }`

    if (this.images.length > 0) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = this.getWidth();
    canvas.height = this.getHeight();
    let x = 0
    Array.from(this.images).forEach(function(image, indx) {
      const img = document.createElement('img');
      img.src = image.src
      ctx.drawImage(img, x, 0, image.width, image.height);
      const name = image.name.replace( /(\.[^/.]+)+$/, "" )

      const iconCss =`.icon_${name} {
        background-position: ${x}px 0;
        width: ${image.width}px;
        height: ${image.height}px;
      }`

      css += iconCss;
      x += image.width;
    });
    this.imageElement.src = canvas.toDataURL();
    this.codeContainer.textContent = css;
    }
  }

  getHeight() {
    return Math.max(...prop( this.images, 'height'));
  }

  getWidth() {
    return summ(prop(this.images, 'width'));

  }

}

new SpriteGenerator( document.getElementById( 'generator' ));
