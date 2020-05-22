import '../pages/articles.css';

import MainApi from './api/main-api';

import Header from '../blocks/header/header';
import Info from '../blocks/info/info';
import NewsCardList from '../blocks/results/news-card-list';

import headerRefresh from './utils/header-refresh';
import infoRefresh from './utils/info-refresh';
import savedArticlesRefresh from './utils/saved-articles-refresh';
import getUserData from './utils/get-user-data';
import setArticlesId from './utils/set-articles-id';

import { RESULT_SAVEDPAGE_CONTENT } from './constants/templates';
import {
  HEADER_CONTAINER,
  RESULT_CONTAINER,
  INFO_CONTAINER,
} from './constants/elements';
import {
  MAIN_API_URL,
} from './constants/api-config';
import {
  CANNOT_DELETE_ARTICLE_MESSAGE,
  CANNOT_LOGOUT_MESSAGE,
  CONFIRM_LOGOUT_MESSAGE,
} from './constants/messages';


// создаём инстансы классов
const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  options: {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  },
});
const header = new Header(HEADER_CONTAINER);
const info = new Info(INFO_CONTAINER);
const newsCardList = new NewsCardList(RESULT_CONTAINER, RESULT_SAVEDPAGE_CONTENT);

let userData = {};


// устанавливаем параметры
newsCardList.setArticlesParams('.results__found-articles');
info.setParams('.info__number-of-articles', '.info__text-bold');


// задаём обработчики
header.addHandlers([
  {
    event: 'click',
    callback: async (event) => {
      if (event.target.classList.contains('header__auth-btn') || event.target.parentNode.classList.contains('header__auth-btn')) {
        if (!window.confirm(CONFIRM_LOGOUT_MESSAGE)) return;
        try {
          await mainApi.logout();
          window.location.href = '../';
        } catch (err) {
          alert(`${CANNOT_LOGOUT_MESSAGE} - ${err.message}`);
        }
      } else if (event.target.classList.contains('header__menu-btn')) {
        event.currentTarget.classList.toggle('header_menu-open');
      }
    },
  },
]);

newsCardList.addHandlers([
  {
    event: 'click',
    callback: async (event) => {
      const targetClasses = event.target.classList;
      if (targetClasses.contains('article__control')) {
        if (targetClasses.contains('article__control_processing')) return;
        if (!userData.auth) return;
        const article = newsCardList.getArticles()
          .find((parent) => parent.getContent().contains(event.target));
        if (!article) return;
        article.onprocess();
        try {
          await mainApi.removeArticle(article.getId());
          userData = await getUserData(mainApi);
          newsCardList.delete(article);
        } catch (err) {
          alert(`${CANNOT_DELETE_ARTICLE_MESSAGE} - ${err.message}`);
        }
        article.offprocess();
        infoRefresh(info, userData);
        if (newsCardList.getArticles().length === 0) newsCardList.renderError();
      }
    },
  },
]);


(async () => {
  newsCardList.renderLoader();
  userData = await getUserData(mainApi);
  if (!userData.auth) window.location.href = '../';
  headerRefresh(header, userData);
  infoRefresh(info, userData);
  savedArticlesRefresh(newsCardList, userData);
  setArticlesId(newsCardList.getArticles(), userData);
})();
