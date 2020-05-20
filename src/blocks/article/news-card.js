export default class NewsCard {
  constructor(content, data) {
    this._content = content;
    this._data = data;
    this._cardInitialization();
  }

  _cardInitialization() {
    const {
      key,
      title,
      text,
      date,
      source,
      link,
      image,
    } = this._data;
    const linkElem = this._content.querySelector('.article__title-link');
    const imageElem = this._content.querySelector('.article__image');
    const keyElem = this._content.querySelector('.article__key-word');
    const textElem = this._content.querySelector('.article__text');
    const dateElem = this._content.querySelector('.article__date');
    const sourceElem = this._content.querySelector('.article__source');

    this._interfaceElements = {
      control: this._content.querySelector('.article__control'),
      prompt: this._content.querySelector('.article__prompt'),
    };

    if (keyElem) keyElem.textContent = key;
    linkElem.textContent = title;
    linkElem.href = link;
    textElem.textContent = text;
    dateElem.textContent = date;
    sourceElem.textContent = source;
    imageElem.src = image;
    imageElem.alt = title;
  }

  renderIcon(state) {
    switch (state) {
      case 'unauth':
        this.control.classList.remove('article__control_save_marked');
        this.control.classList.add('article__control_save_unmarked');
        this.prompt.classList.remove('article__prompt_disabled');
        break;
      case 'unsaved':
        this.control.classList.remove('article__control_save_marked');
        this.control.classList.add('article__control_save_unmarked');
        this.prompt.classList.add('article__prompt_disabled');
        break;
      case 'saved':
        this.control.classList.remove('article__control_save_unmarked');
        this.control.classList.add('article__control_save_marked');
        this.prompt.classList.add('article__prompt_disabled');
        break;
      default:
    }
  }

  getContent() {
    return this._content;
  }
}
