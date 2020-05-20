export default class MainApi {
  constructor({ baseUrl, options }) {
    this._baseUrl = baseUrl;
    this._options = options;
  }

  _setOptions({ method = 'GET', bodyData = undefined }) {
    const options = { ...this._options };
    options.method = method;
    if (bodyData) options.body = JSON.stringify(bodyData);
    return options;
  }

  async _requestServer(url, options) {
    let response;
    let json;
    try {
      response = await fetch(this._baseUrl + url, options);
    } catch (err) {
      throw new Error('Проверьте подключение к сети.');
    }

    try {
      json = await response.json();
    } catch (err) {
      throw new Error('Сервер передал некорректные данные.');
    }

    if (!response.ok) throw new Error(json.message);

    return json;
  }

  signup(bodyData) {
    return this._requestServer('/signup', this._setOptions({ method: 'POST', bodyData }));
  }

  signin(bodyData) {
    return this._requestServer('/signin', this._setOptions({ method: 'POST', bodyData }));
  }

  logout() {
    return this._requestServer('/logout', this._setOptions({ method: 'POST' }));
  }

  getUserData() {
    return this._requestServer('/users/me', this._setOptions({ method: 'GET' }));
  }

  getArticles() {
    return this._requestServer('/articles', this._setOptions({ method: 'GET' }));
  }

  createArticle(bodyData) {
    return this._requestServer('/articles', this._setOptions({ method: 'POST', bodyData }));
  }

  removeArticle(articleId) {
    return this._requestServer(`/articles/${articleId}`, this._setOptions({ method: 'DELETE' }));
  }
}
