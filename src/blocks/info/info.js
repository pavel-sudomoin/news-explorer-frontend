import BaseComponent from '../../js/components/base-components';

export default class Info extends BaseComponent {
  constructor(container) {
    super(container);
    this._elements = {
      amount: undefined,
      keyWords: undefined,
    };
  }

  setParams(amountOfArticlesSelector, keyWordsSelector) {
    this._elements.amount = this._container.querySelector(amountOfArticlesSelector);
    this._elements.keyWords = this._container.querySelector(keyWordsSelector);
  }

  render(amount, keyWords) {
    this._elements.amount.textContent = amount;
    this._elements.keyWords.textContent = keyWords;
  }
}
