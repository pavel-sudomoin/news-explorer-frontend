import '../pages/articles.css';

import MainApi from './api/main-api';

import Header from '../blocks/header/header';
import Info from '../blocks/info/info';
import NewsCardList from '../blocks/results/news-card-list';

import headerRefresh from './utils/header-refresh';
import infoRefresh from './utils/info-refresh';
import savedArticlesRefresh from './utils/saved-articles-refresh';
import getUserData from './utils/get-user-data';
import getSavedArticlesData from './utils/get-saved-articles-data';
import getUnathServerData from './utils/get-unath-server-data';

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


// создаём переменные
const serverData = getUnathServerData();


// устанавливаем параметры
newsCardList.setArticlesParams('.results__found-articles');
info.setParams('.info__number-of-articles', '.info__key-words');


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
        if (!serverData.user.auth) return;
        const article = newsCardList.getArticles()
          .find((parent) => parent.getContent().contains(event.target));
        if (!article) return;
        article.onprocess();
        try {
          const { _id: id } = await mainApi.removeArticle(article.getId());
          serverData.articles.splice(serverData.articles.findIndex((item) => item._id === id), 1);
          newsCardList.delete(article);
        } catch (err) {
          alert(`${CANNOT_DELETE_ARTICLE_MESSAGE} - ${err.message}`);
        }
        article.offprocess();
        infoRefresh(info, serverData);
        if (newsCardList.getArticles().length === 0) newsCardList.renderError();
      }
    },
  },
]);


(async () => {
  newsCardList.renderLoader();
  serverData.user = await getUserData(mainApi);
  if (!serverData.user.auth) window.location.href = '../';
  headerRefresh(header, serverData.user);
  serverData.articles = await getSavedArticlesData(mainApi);
  infoRefresh(info, serverData);
  savedArticlesRefresh(newsCardList, serverData);
})();
