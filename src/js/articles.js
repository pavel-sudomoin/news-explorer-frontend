import '../pages/articles.css';

import MainApi from './api/main-api';

import Header from '../blocks/header/header';
import NewsCard from '../blocks/article/news-card';
import NewsCardList from '../blocks/results/news-card-list';

import headerRefresh from './utils/header-refresh';
import getUserData from './utils/get-user-data';

import {
  RESULT_CONTENT,
  ARTICLE_CONTENT,
} from './constants/templates';
import {
  HEADER_CONTAINER,
  RESULT_CONTAINER,
} from './constants/elements';
import {
  MAIN_API_URL,
} from './constants/api-config';
import {
  CANNOT_DELETE_ARTICLE_MESSAGE,
  CANNOT_SAVE_ARTICLE_MESSAGE,
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
const newsCardList = new NewsCardList(RESULT_CONTAINER, RESULT_CONTENT);

let userData = {};


// устанавливаем параметры
newsCardList.setArticlesParams('.results__found-articles', '.results__button');


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

/*
newsCardList.addHandlers([
  {
    event: 'click',
    callback: async (event) => {
      const targetClasses = event.target.classList;
      if (targetClasses.contains('results__button')) {
        newsCardList.showMore(NUMBER_ARTICLES_FOR_DISPLAY);
      }
      if (targetClasses.contains('article__control_save_unmarked') || targetClasses.contains('article__control_save_marked')) {
        if (targetClasses.contains('article__control_processing')) return;
        if (!userData.auth) return;
        const article = newsCardList.getArticles()
          .find((parent) => parent.getContent().contains(event.target));
        if (!article) return;
        article.onprocess();
        if (targetClasses.contains('article__control_save_unmarked')) {
          try {
            await mainApi.createArticle(article.getData());
            userData = await getUserData(mainApi);
            setArticlesState(newsCardList.getArticles(), userData);
          } catch (err) {
            alert(`${CANNOT_SAVE_ARTICLE_MESSAGE} - ${err.message}`);
          }
        } else if (targetClasses.contains('article__control_save_marked')) {
          try {
            await mainApi.removeArticle(article.getId());
            userData = await getUserData(mainApi);
            setArticlesState(newsCardList.getArticles(), userData);
          } catch (err) {
            alert(`${CANNOT_DELETE_ARTICLE_MESSAGE} - ${err.message}`);
          }
        }
        article.offprocess();
      }
    },
  },
]);
*/

(async () => {
  userData = await getUserData(mainApi);
  if (!userData.auth) window.location.href = '../';
  headerRefresh(header, userData);
})();
