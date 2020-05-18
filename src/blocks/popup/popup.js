import BaseComponent from '../../js/components/base-components';

export default class Popup extends BaseComponent {
  constructor({ container, content }) {
    super(container);
    this._content = content;
  }

  addHandlers(handlers) {
    this._setEventListeners(handlers);
  }

  setContent(content) {
    this._container.appendChild(content);
  }

  clearContent() {
    while (this._container.firstChild) {
      this._container.removeChild(this._container.lastChild);
    }
  }

  open() {
    this._container.classList.add('popup_open');
  }

  close() {
    this._container.classList.remove('popup_open');
  }

  show(popupName) {
    this.open();
    this.clearContent();
    this.setContent(this._content[popupName]);
  }

  contentList() {
    return this._content;
  }
}
