export default class NewsCard {
  constructor(content, data) {
    this._content = content;
    this._data = data;
    this._articleInitialization();
  }

  _articleInitialization() {
    const {
      keyword,
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

    if (keyElem) keyElem.textContent = keyword;
    linkElem.textContent = title;
    linkElem.href = link;
    textElem.textContent = text;
    dateElem.textContent = date;
    sourceElem.textContent = source;
    imageElem.src = image;
    imageElem.alt = title;
  }

  renderIcon(state) {
    const { control, prompt } = this._interfaceElements;
    switch (state) {
      case 'unauth':
        control.classList.remove('article__control_save_marked');
        control.classList.add('article__control_save_unmarked');
        prompt.classList.remove('article__prompt_disabled');
        break;
      case 'unsaved':
        control.classList.remove('article__control_save_marked');
        control.classList.add('article__control_save_unmarked');
        prompt.classList.add('article__prompt_disabled');
        break;
      case 'saved':
        control.classList.remove('article__control_save_unmarked');
        control.classList.add('article__control_save_marked');
        prompt.classList.add('article__prompt_disabled');
        break;
      default:
    }
  }

  onprocess() {
    this._interfaceElements.control.classList.add('article__control_processing');
  }

  offprocess() {
    this._interfaceElements.control.classList.remove('article__control_processing');
  }

  setId(id = undefined) {
    this._articleId = id;
  }

  getId() {
    if (this._articleId) return this._articleId;
    const { _id: id } = this._data;
    if (id) return id;
    return undefined;
  }

  getContent() {
    return this._content;
  }

  getData() {
    return this._data;
  }
}
