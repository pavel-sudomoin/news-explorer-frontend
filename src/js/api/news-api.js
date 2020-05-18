import formatDate from '../utils/format-date';

export default class NewsApi {
  constructor({ baseUrl, apiKey, period }) {
    this._baseUrl = baseUrl;
    this._apiKey = apiKey;
    this._period = period;
  }

  async getNews(search) {
    let response;
    let json;
    let to = new Date();
    let from = new Date();

    from.setDate(from.getDate() - this._period);
    to = formatDate(to);
    from = formatDate(from);

    const url = `${this._baseUrl}/v2/everything?q=${encodeURIComponent(search)}&from=${from}&to=${to}&apiKey=${this._apiKey}&pageSize=100`;
    try {
      response = await fetch(url);
    } catch (err) {
      throw new Error('Проверьте подключение к сети.');
    }

    try {
      json = await response.json();
    } catch (err) {
      throw new Error('Сервер передал некорректные данные.');
    }

    if (!response.ok) throw new Error(`Сервер вернул ошибку ${response.status} (${response.statusText}).`);

    return json;
  }
}
