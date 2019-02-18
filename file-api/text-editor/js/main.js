const throttle = ( handler, ms ) => {
  let timeout;
  return () => {
    clearTimeout( timeout );
    timeout = setTimeout( handler, ms );
  }
};
class TextEditor {
  constructor( container, storageKey = '_text-editor__content' ) {
    this.container = container;
    this.contentContainer = container.querySelector( '.text-editor__content' );
    this.hintContainer = container.querySelector( '.text-editor__hint' );
    this.filenameContainer = container.querySelector( '.text-editor__filename' );
    this.storageKey = storageKey;
    this.registerEvents();
    this.load( this.getStorageData());
  }
  registerEvents() {
    const save = throttle( this.save.bind( this ), 1000 );
    this.contentContainer.addEventListener( 'input', save );
    this.container.addEventListener('dragover', this.showHint.bind(this));
    this.hintContainer.addEventListener('drop', this.loadFile.bind(this));
    this.hintContainer.addEventListener('dragleave', this.hideHint.bind(this));
  }
  loadFile( e ) {
    e.preventDefault();
    this.hintContainer.classList.remove('text-editor__hint_visible');
    const file = event.dataTransfer.files[0];
    const fileTypeRegExp = /^text\/plain/;

    if(fileTypeRegExp.test(file.type)) {
      this.readFile( file );
      this.setFilename( file.name );
    } else {
      alert('Файл не может быть загружен. Расширение файла должно быть "txt"');
    }

  }
  readFile( file ) {
    const reader = new FileReader();
    reader.addEventListener('load', event => {
      this.load( event.target.result );
      this.save();
    });

    reader.readAsText(file);

  }
  setFilename( filename ) {
    this.filenameContainer.textContent = filename;
  }
  showHint( e ) {
    e.preventDefault();
    this.hintContainer.classList.add('text-editor__hint_visible');

  }
  hideHint() {
    this.hintContainer.classList.remove('text-editor__hint_visible');
  }
  load( value ) {
    this.contentContainer.value = value || '';
  }
  getStorageData() {
    return localStorage[ this.storageKey ];
  }
  save() {
    localStorage[ this.storageKey ] = this.contentContainer.value;
  }
}

new TextEditor( document.getElementById( 'editor' ));
