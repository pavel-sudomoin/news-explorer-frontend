export default class BaseComponent {
  constructor(container, handlers = []) {
    this._container = container;
    this._setEventListeners(handlers);
  }

  _setEventListeners(handlers) {
    handlers.forEach((handler) => {
      this._container.addEventListener(handler.event, handler.callback);
    });
  }
}
