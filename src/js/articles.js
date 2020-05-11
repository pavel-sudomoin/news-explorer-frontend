/* eslint-disable */
import '../pages/articles.css';

const headerElem = document.querySelector('.header');

const menuButton = document.querySelector('.header__menu-btn');

menuButton.addEventListener('click', () => headerElem.classList.toggle('header_menu-open'));