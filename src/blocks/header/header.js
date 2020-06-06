import BaseComponent from '../../js/components/base-components';

export default class Header extends BaseComponent {
  addHandlers(handlers) {
    this._setEventListeners(handlers);
  }

  isLoggedIn() {
    return this._container.classList.contains('header_login');
  }

  render(data) {
    if (!data.isLoggedIn) {
      this._container.classList.remove('header_login');
      return;
    }
    this._container.classList.add('header_login');
    this._container.querySelector('.header__user-name').textContent = data.userName;
  }
}
