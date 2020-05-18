import BaseComponent from '../../../js/components/base-components';

export default class Form extends BaseComponent {
  static validateInputElement(inputElem) {
    return inputElem.checkValidity();
  }

  validateForm() {
    return this._container.checkValidity();
  }

  clear() {
    this._container.reset();
    this.enable();
    this.setSubmitButtonDisabled();
  }

  getInfo() {
    return [...this._container.elements].reduce(
      (result, element) => {
        const obj = result;
        if (element.name) {
          obj[element.name] = element.value;
        }
        return obj;
      }, {},
    );
  }

  disable() {
    this._container.elements.forEach((element) => {
      element.setAttribute('disabled', 'disabled');
    });
    this.setSubmitButtonDisabled();
  }

  enable() {
    this._container.elements.forEach((element) => {
      element.removeAttribute('disabled');
    });
    this.setSubmitButtonEnabled();
  }

  setSubmitButtonDisabled() {
    if (!this._submitButton.element) return;
    this._submitButton.element.setAttribute('disabled', 'disabled');
    if (this._submitButton.disableClass) {
      this._submitButton.element.classList.add(this._submitButton.disableClass);
    }
  }

  setSubmitButtonEnabled() {
    if (!this._submitButton.element) return;
    this._submitButton.element.removeAttribute('disabled');
    if (this._submitButton.disableClass) {
      this._submitButton.element.classList.remove(this._submitButton.disableClass);
    }
  }

  setServerError(error) {
    if (!this._serverError.element) return;
    this._serverError.element.textContent = error;
    if (this._serverError.openClass) {
      this._serverError.element.classList.add(this._serverError.openClass);
    }
  }

  removeServerError() {
    if (!this._serverError.element) return;
    this._serverError.element.textContent = '';
    if (this._serverError.openClass) {
      this._serverError.element.classList.remove(this._serverError.openClass);
    }
  }

  addSubmitButton(element = undefined, disableClass = undefined) {
    this._submitButton = { element, disableClass };
  }

  addServerError(element = undefined, openClass = undefined) {
    this._serverError = { element, openClass };
  }

  addHandlers(handlers) {
    this._setEventListeners(handlers);
  }

  container() {
    return this._container;
  }
}
