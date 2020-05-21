import BaseComponent from '../../js/components/base-components';

export default class NewsCardList extends BaseComponent {
  constructor(container, content) {
    super(container);
    this._content = content;

    this._articles = {
      container: undefined,
      button: undefined,
      list: [],
      displayed: 0,
    };
  }

  _clearContent() {
    while (this._container.firstChild) {
      this._container.removeChild(this._container.lastChild);
    }
  }

  _setContent(content) {
    this._container.appendChild(content);
  }

  _show(contentName) {
    this._clearContent();
    this._setContent(this._content[contentName]);
  }

  _removeArticles() {
    for (let i = 0; i < this._articles.displayed; i += 1) {
      this._articles.container.removeChild(this._articles.list[i].getContent());
    }
    this._articles.list = [];
    this._articles.displayed = 0;
  }

  _hideMoreButton() {
    if (!this._articles.button) return;
    this._articles.button.classList.add('results__disabled');
  }

  _showMoreButton() {
    if (!this._articles.button) return;
    this._articles.button.classList.remove('results__disabled');
  }

  addHandlers(handlers) {
    this._setEventListeners(handlers);
  }

  setArticlesParams(containerSelector, buttonSelector = undefined) {
    if (this._content.articles.matches(containerSelector)) {
      this._articles.container = this._content.articles;
    } else {
      this._articles.container = this._content.articles.querySelector(containerSelector);
    }
    this._articles.button = this._content.articles.querySelector(buttonSelector);
  }

  open() {
    this._container.classList.add('results_open');
  }

  renderResults(articles, numberForDisplay) {
    this._removeArticles();
    this._articles.list = articles;
    this._articles.displayed = 0;
    this.showMore(numberForDisplay);
    this._show('articles');
  }

  renderLoader() {
    this._show('loader');
  }

  renderError() {
    this._show('error');
  }

  showMore(numberForDisplay) {
    const start = this._articles.displayed;
    let stop = (numberForDisplay === 'all') ? this._articles.list.length : start + numberForDisplay;

    if (stop >= this._articles.list.length) {
      stop = this._articles.list.length;
      this._hideMoreButton();
    } else {
      this._showMoreButton();
    }

    for (let i = start; i < stop; i += 1) {
      this._articles.container.appendChild(this._articles.list[i].getContent());
    }

    this._articles.displayed = stop;
  }

  getArticles() {
    return this._articles.list;
  }
}
