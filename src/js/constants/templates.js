import templatesHandler from '../utils/templates-handler';
import { EMAIL_PATTERN, NO_WHITESPACES_AT_BOTH_ENDS_PATTERN } from './values';


const POPUP_SIGNIN_HTML = `
<div class="popup__content">
  <div class="popup__close"></div>
  <h3 class="popup__title">Вход</h3>
  <form class="popup__form" name="form-signin" novalidate="">
    <div class="popup__input-cover">
      <span class="popup__input-title">Email</span>
      <input type="email" name="email" pattern="${EMAIL_PATTERN}" required class="popup__input popup__input_type_email" placeholder="Введите почту">
      <span class="popup__error popup__error_type_email"></span>
    </div>
    <div class="popup__input-cover">
      <span class="popup__input-title">Пароль</span>
      <input type="text" name="password" pattern="${NO_WHITESPACES_AT_BOTH_ENDS_PATTERN}" required minlength="8" class="popup__input popup__input_type_password" placeholder="Введите пароль">
      <span class="popup__error popup__error_type_password"></span>
    </div>
    <div class="popup__button-cover">
      <span class="popup__error popup__error_type_other"></span>
      <button type="submit" class="button popup__button popup__button_disabled" disabled>Войти</button>
    </div>
    <div class="popup__switch-cover">
      <span>или</span>
      <span class="popup__switch popup__switch-to-signup">Зарегистрироваться</span>
    </div>
  </form>
</div>`;

const POPUP_SIGNUP_HTML = `
<div class="popup__content">
  <div class="popup__close"></div>
  <h3 class="popup__title">Регистрация</h3>
  <form class="popup__form" name="form-signup" novalidate="">
    <div class="popup__input-cover">
      <span class="popup__input-title">Email</span>
      <input type="email" name="email" pattern="${EMAIL_PATTERN}" required class="popup__input popup__input_type_email" placeholder="Введите почту">
      <span class="popup__error popup__error_type_email"></span>
    </div>
    <div class="popup__input-cover">
      <span class="popup__input-title">Пароль</span>
      <input type="text" name="password" pattern="${NO_WHITESPACES_AT_BOTH_ENDS_PATTERN}" required minlength="8" class="popup__input popup__input_type_password" placeholder="Введите пароль">
      <span class="popup__error popup__error_type_password"></span>
    </div>
    <div class="popup__input-cover">
      <span class="popup__input-title">Имя</span>
      <input type="text" name="username" pattern="${NO_WHITESPACES_AT_BOTH_ENDS_PATTERN}" required minlength="2" maxlength="30" class="popup__input popup__input_type_name" placeholder="Введите своё имя">
      <span class="popup__error popup__error_type_name"></span>
    </div>
    <div class="popup__button-cover">
      <span class="popup__error popup__error_type_other"></span>
      <button type="submit" class="button popup__button popup__button_disabled" disabled>Зарегистрироваться</button>
    </div>
    <div class="popup__switch-cover">
      <span>или</span>
      <span class="popup__switch popup__switch-to-signin">Войти</span>
    </div>
  </form>
</div>`;

const POPUP_SUCCESS_HTML = `
<div class="popup__content popup__content_succesfully-registered">
  <div class="popup__close"></div>
  <h3 class="popup__title">Пользователь успешно зарегистрирован!</h3>
  <span class="popup__switch popup__switch_succesfully-registered popup__switch-to-signin">Выполнить вход</span>
</div>`;


const RESULT_LOADER_MAINPAGE_HTML = `
<div class="results__load">
  <i class="results__load-preloader"></i>
  <h2 class="results__load-title">Идет поиск новостей...</h2>
</div>`;

const RESULT_NOTFOUND_MAINPAGE_HTML = `
<div class="results__not-found">
  <img class="results__not-found-image" src="../images/not-found.svg" alt="Ничего не найдено">
  <h2 class="results__not-found-title">Ничего не найдено</h2>
  <p class="results__not-found-text">К сожалению по вашему запросу ничего не найдено.</p>
</div>`;

const RESULT_ARTICLES_MAINPAGE_HTML = `
<div class="results__found">
  <h2 class="results__found-title">Результаты поиска</h2>
  <div class="results__found-articles"></div>
  <button type="button" class="button results__button">Показать еще</button>
</div>`;


const ARTICLE_MAINPAGE_HTML = `
<div class="article">
  <div class="article__figure">
    <img class="article__image" src="" alt="">
    <div class="article__interface">
      <button class="article__control article__control_save_unmarked article-legend"></button>
      <p class="article__prompt article-legend">Войдите, чтобы сохранять статьи</p>
    </div>
  </div>
  <div class="article__content">
    <p class="article__date"></p>
    <h3 class="article__title">
      <a class="article__title-link link" target="_blank" href=""></a>
    </h3>
    <p class="article__text"></p>
    <p class="article__source"></p>
  </div>
</div>`;


const RESULT_LOADER_SAVEDPAGE_HTML = `
<div class="results__load">
  <i class="results__load-preloader"></i>
  <h2 class="results__load-title">Идет поиск сохранённых статей...</h2>
</div>`;

const RESULT_NOTFOUND_SAVEDPAGE_HTML = `
<div class="results__not-found">
  <img class="results__not-found-image" src="../images/not-found.svg" alt="Ничего не найдено">
  <h2 class="results__not-found-title">Ничего не найдено</h2>
  <p class="results__not-found-text">Вы ещё пока ничего не сохранили</p>
</div>`;

const RESULT_ARTICLES_SAVEDPAGE_HTML = `
<div class="results__found-articles results__saved-articles"></div>`;


const ARTICLE_SAVEDPAGE_HTML = `
<div class="article">
<div class="article__figure">
  <img class="article__image" src="" alt=""> 
  <div class="article__interface">
    <button class="article__control article__control_trash article-legend"></button>
    <p class="article__prompt article__prompt_delete article-legend">Убрать из сохранённых</p>
    <p class="article__key-word article-legend"></p>
  </div>
</div>
<div class="article__content">
  <p class="article__date"></p>
  <h3 class="article__title">
    <a class="article__title-link link" target="_blank" href=""></a>
  </h3>
  <p class="article__text"></p>
  <p class="article__source"></p>
</div>
</div>`;


const POPUP_CONTENT = templatesHandler({
  signin: POPUP_SIGNIN_HTML,
  signup: POPUP_SIGNUP_HTML,
  success: POPUP_SUCCESS_HTML,
});

const RESULT_MAINPAGE_CONTENT = templatesHandler({
  loader: RESULT_LOADER_MAINPAGE_HTML,
  error: RESULT_NOTFOUND_MAINPAGE_HTML,
  articles: RESULT_ARTICLES_MAINPAGE_HTML,
});

const { ARTICLE_MAINPAGE_HTML: ARTICLE_MAINPAGE_CONTENT } = templatesHandler({
  ARTICLE_MAINPAGE_HTML,
});

const RESULT_SAVEDPAGE_CONTENT = templatesHandler({
  loader: RESULT_LOADER_SAVEDPAGE_HTML,
  error: RESULT_NOTFOUND_SAVEDPAGE_HTML,
  articles: RESULT_ARTICLES_SAVEDPAGE_HTML,
});

const { ARTICLE_SAVEDPAGE_HTML: ARTICLE_SAVEDPAGE_CONTENT } = templatesHandler({
  ARTICLE_SAVEDPAGE_HTML,
});

export {
  POPUP_CONTENT,
  RESULT_MAINPAGE_CONTENT,
  ARTICLE_MAINPAGE_CONTENT,
  RESULT_SAVEDPAGE_CONTENT,
  ARTICLE_SAVEDPAGE_CONTENT,
};
