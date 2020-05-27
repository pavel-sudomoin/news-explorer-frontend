import '../pages/main.css';

import MainApi from './api/main-api';
import NewsApi from './api/news-api';

import Header from '../blocks/header/header';
import Popup from '../blocks/popup/popup';
import Form from '../blocks/popup/__form/form';
import NewsCard from '../blocks/article/news-card';
import NewsCardList from '../blocks/news-card-list/news-card-list';

import headerRefresh from './utils/header-refresh';
import getUserData from './utils/get-user-data';
import getSavedArticlesData from './utils/get-saved-articles-data';
import getUnathServerData from './utils/get-unath-server-data';
import setArticlesState from './utils/set-articles-state';
import setArticleState from './utils/set-article-state';
import dateToString from './utils/date-to-string';
import returnValidateErrorMessage from './utils/return-validate-error-message';
import findArticleByEventTarget from './utils/find-article-by-event-target';
import findArticleIndexById from './utils/find-article-index-by-id';

import {
  POPUP_CONTENT,
  RESULT_MAINPAGE_CONTENT,
  ARTICLE_MAINPAGE_CONTENT,
} from './constants/templates';
import {
  POPUP_CONTAINER,
  HEADER_CONTAINER,
  SEARCH_FORM_CONTAINER,
  RESULT_CONTAINER,
} from './constants/elements';
import {
  MAIN_API_URL,
  NEWS_API_URL,
  NEWS_API_KEY,
  NEWS_API_PERIOD,
} from './constants/api-config';
import {
  EMPTY_SEARCH_FIELD_MESSAGE,
  CANNOT_DELETE_ARTICLE_MESSAGE,
  CANNOT_SAVE_ARTICLE_MESSAGE,
  CANNOT_LOGOUT_MESSAGE,
  CONFIRM_LOGOUT_MESSAGE,
} from './constants/messages';
import {
  NUMBER_ARTICLES_FOR_DISPLAY,
} from './constants/values';


// создаём инстансы классов
const mainApi = new MainApi({
  baseUrl: MAIN_API_URL,
  options: {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  },
});
const newsApi = new NewsApi({
  baseUrl: NEWS_API_URL,
  apiKey: NEWS_API_KEY,
  period: NEWS_API_PERIOD,
});
const header = new Header(HEADER_CONTAINER);
const popup = new Popup({ container: POPUP_CONTAINER, content: POPUP_CONTENT });
const popupForms = Object.entries(popup.contentList()).reduce(
  (result, [popupName, popupElem]) => {
    const container = popupElem.querySelector('.popup__form');
    const obj = result;
    if (container) obj[popupName] = new Form(container);
    return obj;
  }, {},
);
const searchForm = new Form(SEARCH_FORM_CONTAINER);
const newsCardList = new NewsCardList(RESULT_CONTAINER, RESULT_MAINPAGE_CONTENT);


// создаём переменные
let popupForm;
let serverData = getUnathServerData();
const popupOverlay = {
  mousedown: false,
  mouseup: false,
};


// устанавливаем параметры
Object.values(popupForms).forEach((form) => {
  const submitButton = form.container().querySelector('.popup__button');
  const serverError = form.container().querySelector('.popup__error_type_other');
  form.addSubmitButton(submitButton, 'popup__button_disabled');
  form.addServerError(serverError, 'popup__error_open');
});

searchForm.addSubmitButton(searchForm.container().querySelector('.search__button'));
searchForm.addServerError(searchForm.container().querySelector('.search__error'), 'search__error_open');

newsCardList.setArticlesParams('.results__found-articles', '.results__button');


// задаём обработчики
popup.addHandlers([
  {
    event: 'click',
    callback: (event) => {
      if (popup.isBlocked()) return;
      const cls = event.target.classList;
      switch (true) {
        case popupOverlay.mousedown && popupOverlay.mouseup:
        case cls.contains('popup__close'):
          popup.close();
          break;
        case cls.contains('popup__switch-to-signin'):
          popup.show('signin');
          popupForm = popupForms.signin;
          break;
        case cls.contains('popup__switch-to-signup'):
          popup.show('signup');
          popupForm = popupForms.signup;
          break;
        default:
      }
    },
  },
  {
    event: 'mousedown',
    callback: (event) => {
      if (event.currentTarget === event.target) popupOverlay.mousedown = true;
      else popupOverlay.mousedown = false;
    },
  },
  {
    event: 'mouseup',
    callback: (event) => {
      if (event.currentTarget === event.target) popupOverlay.mouseup = true;
      else popupOverlay.mouseup = false;
    },
  },
  {
    event: 'submit',
    callback: async (event) => {
      event.preventDefault();
      popupForm.removeServerError();
      popupForm.disable();
      popup.block();
      switch (event.target.name) {
        case 'form-signup':
          try {
            const { email, password, username: name } = popupForm.getInfo();
            await mainApi.signup({ email, password, name });
            popupForm.clear();
            popup.show('success');
          } catch (error) {
            popupForm.setServerError(error.message);
            popupForm.enable();
          }
          break;
        case 'form-signin':
          try {
            await mainApi.signin(popupForm.getInfo());
            serverData.user = await getUserData(mainApi);
            headerRefresh(header, serverData.user);
            serverData.articles = await getSavedArticlesData(mainApi);
            setArticlesState(newsCardList.getArticles(), serverData);
            popupForm.clear();
            popup.close();
          } catch (error) {
            popupForm.setServerError(error.message);
            popupForm.enable();
          }
          break;
        default:
      }
      popup.unblock();
    },
  },
  {
    event: 'input',
    callback: (event) => {
      popupForm.removeServerError();
      const errorElem = event.target.nextElementSibling;
      const inputName = event.target.name;
      const validity = Form.validateInputElement(event.target);
      switch (validity.valid) {
        case true:
          event.target.nextElementSibling.classList.remove('popup__error_open');
          errorElem.textContent = '';
          break;
        case false:
          errorElem.classList.add('popup__error_open');
          errorElem.textContent = returnValidateErrorMessage(
            inputName,
            validity,
            event.target.value,
          );
          break;
        default:
      }
      switch (popupForm.validateForm()) {
        case true:
          popupForm.setSubmitButtonEnabled();
          break;
        case false:
          popupForm.setSubmitButtonDisabled();
          break;
        default:
      }
    },
  },
]);

header.addHandlers([
  {
    event: 'click',
    callback: async (event) => {
      if (event.target.classList.contains('header__auth-btn') || event.target.parentNode.classList.contains('header__auth-btn')) {
        if (header.isLoggedIn()) {
          if (!window.confirm(CONFIRM_LOGOUT_MESSAGE)) return;
          try {
            await mainApi.logout();
            serverData = getUnathServerData();
            header.render({ isLoggedIn: false });
            setArticlesState(newsCardList.getArticles(), serverData);
          } catch (err) {
            alert(`${CANNOT_LOGOUT_MESSAGE} - ${err.message}`);
          }
        } else {
          popup.show('signin');
          popupForm = popupForms.signin;
        }
      } else if (event.target.classList.contains('header__menu-btn')) {
        event.currentTarget.classList.toggle('header_menu-open');
      }
    },
  },
]);

searchForm.addHandlers([
  {
    event: 'submit',
    callback: async (event) => {
      event.preventDefault();
      if (!searchForm.validateForm()) {
        searchForm.setServerError(EMPTY_SEARCH_FIELD_MESSAGE);
        return;
      }
      searchForm.removeServerError();
      searchForm.disable();
      newsCardList.open();
      newsCardList.renderLoader();
      try {
        const { search } = searchForm.getInfo();
        const newsData = await newsApi.getNews(search);
        const articles = newsData.articles.reduce((result, current) => {
          const data = {
            keyword: (search.charAt(0).toUpperCase() + search.slice(1).toLowerCase()).trim(),
            title: current.title,
            text: current.description,
            date: dateToString(current.publishedAt),
            source: current.source.name,
            link: current.url,
            image: current.urlToImage,
          };
          const isInvalid = Object.values(data).some((val) => val === null);
          if (!isInvalid) {
            result.push(new NewsCard(ARTICLE_MAINPAGE_CONTENT.cloneNode(true), data));
          }
          return result;
        }, []);
        setArticlesState(articles, serverData);
        newsCardList.renderResults(articles, NUMBER_ARTICLES_FOR_DISPLAY);
      } catch (error) {
        newsCardList.renderError();
        if (error.message !== 'Ничего не найдено') searchForm.setServerError(error.message);
      }
      searchForm.enable();
    },
  },
  {
    event: 'input',
    callback: (event) => {
      searchForm.removeServerError();
      switch (Form.validateInputElement(event.target)) {
        case true:
          searchForm.removeServerError();
          break;
        case false:
          searchForm.setServerError(EMPTY_SEARCH_FIELD_MESSAGE);
          break;
        default:
      }
    },
  },
]);

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
        if (!serverData.user.auth) return;
        const article = findArticleByEventTarget(newsCardList, event.target);
        if (!article) return;
        article.onprocess();
        if (targetClasses.contains('article__control_save_unmarked')) {
          try {
            const newArticleData = await mainApi.createArticle(article.getData());
            serverData.articles.push(newArticleData);
            setArticleState({ article, id: newArticleData._id, isSaved: true });
          } catch (err) {
            alert(`${CANNOT_SAVE_ARTICLE_MESSAGE} - ${err.message}`);
          }
        } else if (targetClasses.contains('article__control_save_marked')) {
          try {
            const { _id: id } = await mainApi.removeArticle(article.getId());
            serverData.articles.splice(findArticleIndexById(serverData.articles, id), 1);
            setArticleState({ article, isDeleted: true });
          } catch (err) {
            alert(`${CANNOT_DELETE_ARTICLE_MESSAGE} - ${err.message}`);
          }
        }
        article.offprocess();
      }
    },
  },
]);

document.addEventListener('keyup', (event) => {
  if (event.keyCode === 27) {
    if (popup.isBlocked()) return;
    popup.close();
  }
});


(async () => {
  serverData.user = await getUserData(mainApi);
  headerRefresh(header, serverData.user);
  if (serverData.user.auth) {
    serverData.articles = await getSavedArticlesData(mainApi);
  }
})();
