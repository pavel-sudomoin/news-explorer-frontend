import templatesHandler from '../utils/templates-handler';

const POPUP_SIGNIN_HTML = `
<div class="popup__content">
  <div class="popup__close"></div>
  <h3 class="popup__title">Вход</h3>
  <form class="popup__form" name="form-signin" novalidate="">
    <div class="popup__input-cover">
      <span class="popup__input-title">Email</span>
      <input type="email" name="email" required class="popup__input popup__input_type_email" placeholder="Введите почту">
      <span class="popup__error popup__error_type_email">Неправильный формат email</span>
    </div>
    <div class="popup__input-cover">
      <span class="popup__input-title">Пароль</span>
      <input type="text" name="password" required minlength="8" class="popup__input popup__input_type_password" placeholder="Введите пароль">
      <span class="popup__error popup__error_type_password">Пароль должен быть больше 8 символов</span>
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
      <input type="email" name="email" required class="popup__input popup__input_type_email" placeholder="Введите почту">
      <span class="popup__error popup__error_type_email">Неправильный формат email</span>
    </div>
    <div class="popup__input-cover">
      <span class="popup__input-title">Пароль</span>
      <input type="text" name="password" required minlength="8" class="popup__input popup__input_type_password" placeholder="Введите пароль">
      <span class="popup__error popup__error_type_password">Пароль должен быть больше 8 символов</span>
    </div>
    <div class="popup__input-cover">
      <span class="popup__input-title">Имя</span>
      <input type="text" name="username" required class="popup__input popup__input_type_name" placeholder="Введите своё имя">
      <span class="popup__error popup__error_type_name">Вы не ввели имя</span>
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

export default templatesHandler({
  signin: POPUP_SIGNIN_HTML,
  signup: POPUP_SIGNUP_HTML,
  success: POPUP_SUCCESS_HTML,
});
