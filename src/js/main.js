/* eslint-disable */
import '../pages/main.css';



const popupHTML = {
  login: `<div class="popup__content">
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
                <span class="popup__error popup__error_type_other popup__error_open">Ошибка сервера</span>
                <button type="submit" class="button popup__button popup__button_disabled" disabled>Войти</button>
              </div>
              <div class="popup__switch-cover">
                <span>или</span>
                <span class="popup__switch">Зарегистрироваться</span>
              </div>
            </form>
          </div>`,
  signin: `<div class="popup__content">
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
                <input type="text" name="name" required class="popup__input popup__input_type_name" placeholder="Введите своё имя">
                <span class="popup__error popup__error_type_name">Вы не ввели имя</span>
              </div>
              <div class="popup__button-cover">
                <span class="popup__error popup__error_type_other popup__error_open">Такой пользователь уже есть</span>
                <button type="submit" class="button popup__button popup__button_disabled" disabled>Зарегистрироваться</button>
              </div>
              <div class="popup__switch-cover">
                <span>или</span>
                <span class="popup__switch">Войти</span>
              </div>
            </form>
          </div>`,
  success: `<div class="popup__content popup__content_succesfully-registered">
              <div class="popup__close"></div>
              <h3 class="popup__title">Пользователь успешно зарегистрирован!</h3>
              <span class="popup__switch popup__switch_succesfully-registered">Выполнить вход</span>
            </div>`,
};

const popupElem = document.querySelector('.popup');

const headerElem = document.querySelector('.header');



function createPopup(htmlCode) {
  const elem = document.createElement('div');
  elem.insertAdjacentHTML('beforeend', htmlCode);
  return elem.firstElementChild;
}

function openPopup(popup) {
  popupElem.appendChild(popup);
  popupElem.classList.add('popup_open');
}

function closePopup(popup) {
  popupElem.removeChild(popup);
  popupElem.classList.remove('popup_open');
}

function setSubmitButtonEnabled(button) {
  button.removeAttribute('disabled');
  button.classList.remove('popup__button_disabled');
}

function setSubmitButtonDisabled(button) {
  button.setAttribute('disabled', true);
  button.classList.add('popup__button_disabled');
}



const popupLogin = createPopup(popupHTML.login);
const popupSignin = createPopup(popupHTML.signin);
const popupSuccess = createPopup(popupHTML.success);

const formLogin = popupLogin.querySelector('.popup__form');
const formSignin = popupSignin.querySelector('.popup__form');

const loginButton = document.querySelector('.header__nav-item_login-btn .header__auth-btn');
const logoutButton = document.querySelector('.header__nav-item_logout-btn .header__auth-btn');
const menuButton = document.querySelector('.header__menu-btn');



//Логин
loginButton.addEventListener('click', () => openPopup(popupLogin));
popupLogin.querySelector('.popup__close').addEventListener('click', () => closePopup(popupLogin));
popupLogin.querySelector('.popup__switch').addEventListener('click', () => {
  closePopup(popupLogin);
  openPopup(popupSignin);
});
formLogin.addEventListener('input', () => {
  const email = event.currentTarget.elements.email;
  const password = event.currentTarget.elements.password;

  if (!email.validity.valid) {
    formLogin.querySelector('.popup__error_type_email').classList.add('popup__error_open');
  } else {
    formLogin.querySelector('.popup__error_type_email').classList.remove('popup__error_open')
  }

  if (!password.validity.valid) {
    formLogin.querySelector('.popup__error_type_password').classList.add('popup__error_open');
  } else {
    formLogin.querySelector('.popup__error_type_password').classList.remove('popup__error_open')
  }
  
  if (email.validity.valid && password.validity.valid) {
    setSubmitButtonEnabled(popupLogin.querySelector('.popup__button'));
  } else {
    setSubmitButtonDisabled(popupLogin.querySelector('.popup__button'));
  }
});
formLogin.addEventListener('submit', () => {
  setSubmitButtonDisabled(popupLogin.querySelector('.popup__button'));
  closePopup(popupLogin);
  headerElem.classList.toggle('header_login')
  formLogin.reset();
  event.preventDefault();
});



//Регистрация
popupSignin.querySelector('.popup__close').addEventListener('click', () => closePopup(popupSignin));
popupSignin.querySelector('.popup__switch').addEventListener('click', () => {
  closePopup(popupSignin);
  openPopup(popupLogin);
});
formSignin.addEventListener('input', () => {
  const email = event.currentTarget.elements.email;
  const password = event.currentTarget.elements.password;
  const name = event.currentTarget.elements.name;

  if (!email.validity.valid) {
    formSignin.querySelector('.popup__error_type_email').classList.add('popup__error_open');
  } else {
    formSignin.querySelector('.popup__error_type_email').classList.remove('popup__error_open')
  }

  if (!password.validity.valid) {
    formSignin.querySelector('.popup__error_type_password').classList.add('popup__error_open');
  } else {
    formSignin.querySelector('.popup__error_type_password').classList.remove('popup__error_open')
  }

  if (!name.validity.valid) {
    formSignin.querySelector('.popup__error_type_name').classList.add('popup__error_open');
  } else {
    formSignin.querySelector('.popup__error_type_name').classList.remove('popup__error_open')
  }
  
  if (email.validity.valid && password.validity.valid && name.validity.valid) {
    setSubmitButtonEnabled(popupSignin.querySelector('.popup__button'));
  } else {
    setSubmitButtonDisabled(popupSignin.querySelector('.popup__button'));
  }
});
formSignin.addEventListener('submit', () => {
  setSubmitButtonDisabled(popupSignin.querySelector('.popup__button'));
  closePopup(popupSignin);
  openPopup(popupSuccess);
  formSignin.reset();
  event.preventDefault();
});


//Успешная регистрация
popupSuccess.querySelector('.popup__close').addEventListener('click', () => closePopup(popupSuccess));
popupSuccess.querySelector('.popup__switch').addEventListener('click', () => {
  closePopup(popupSuccess);
  openPopup(popupLogin);
});


//Разлогинизация
logoutButton.addEventListener('click', () => headerElem.classList.toggle('header_login'));


//Мобильное меню
menuButton.addEventListener('click', () => headerElem.classList.toggle('header_menu-open'));