import '../pages/main.css';

import MainApi from './api/main-api';
import NewsApi from './api/news-api';

import Header from '../blocks/header/header';
import Popup from '../blocks/popup/popup';
import Form from '../blocks/popup/__form/form';

import headerRefresh from './utils/header-refresh';

import POPUP_CONTENT from './constants/templates';
import {
  POPUP_CONTAINER,
  HEADER_CONTAINER,
  SEARCH_FORM_CONTAINER,
} from './constants/elements';
import {
  MAIN_API_URL,
  NEWS_API_URL,
  NEWS_API_KEY,
  NEWS_API_PERIOD,
} from './constants/api-config';
import {
  EMPTY_SEARCH_FIELD_MESSAGE,
} from './constants/messages';


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

let popupForm;


// добавляем свойства элементов, если нужно
Object.values(popupForms).forEach((form) => {
  const submitButton = form.container().querySelector('.popup__button');
  const serverError = form.container().querySelector('.popup__error_type_other');
  form.addSubmitButton(submitButton, 'popup__button_disabled');
  form.addServerError(serverError, 'popup__error_open');
});

searchForm.addSubmitButton(searchForm.container().querySelector('.search__button'));
searchForm.addServerError(searchForm.container().querySelector('.search__error'), 'search__error_open');


// задаём обработчики
popup.addHandlers([
  {
    event: 'click',
    callback: (event) => {
      const cls = event.target.classList;
      switch (true) {
        // case cls.contains('popup'):
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
    event: 'submit',
    callback: async (event) => {
      event.preventDefault();
      popupForm.removeServerError();
      popupForm.disable();
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
            await headerRefresh(header, mainApi);
            popupForm.clear();
            popup.close();
          } catch (error) {
            popupForm.setServerError(error.message);
            popupForm.enable();
          }
          break;
        default:
      }
    },
  },
  {
    event: 'input',
    callback: (event) => {
      popupForm.removeServerError();
      switch (Form.validateInputElement(event.target)) {
        case true:
          event.target.nextElementSibling.classList.remove('popup__error_open');
          break;
        case false:
          event.target.nextElementSibling.classList.add('popup__error_open');
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
    callback: (event) => {
      if (event.target.classList.contains('header__auth-btn') || event.target.parentNode.classList.contains('header__auth-btn')) {
        if (header.isLoggedIn()) {
          mainApi.signin({}).catch(() => {});
          header.render({ isLoggedIn: false });
        } else {
          popup.show('signin');
          popupForm = popupForms.signin;
        }
      }
    },
  },
]);

searchForm.addHandlers([
  {
    event: 'click',
    callback: async (event) => {
      if (event.target.classList.contains('search__button')) {
        if (!searchForm.validateForm()) {
          searchForm.setServerError(EMPTY_SEARCH_FIELD_MESSAGE);
          return;
        }
        searchForm.removeServerError();
        searchForm.disable();
        try {
          const { search } = searchForm.getInfo();
          const articles = await newsApi.getNews(search);
          console.log(articles);
        } catch (error) {
          searchForm.setServerError(error.message);
        }
        searchForm.enable();
      }
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

headerRefresh(header, mainApi);
