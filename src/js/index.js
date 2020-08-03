import '../../node_modules/normalize.css/normalize.css';
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick.js';
import './slider';
import '../scss/style.scss';
import './accordion';
import './scroll';
import './animation';
import './modal';

const mobileMenuBtn = document.getElementById('m-menu-btn');
const mobileMenuSpan = document.getElementById('m-menu-span');
const menu = document.getElementById('menu');
const contactsForm = document.getElementById('contacts-form');

export const mobileMenuHandler = () => {
  mobileMenuSpan.classList.toggle('active');
  menu.classList.toggle('active');
};

mobileMenuBtn.addEventListener('click', (event) => {
  event.preventDefault();
  mobileMenuHandler();
});

contactsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  contactsForm.reset();
});
