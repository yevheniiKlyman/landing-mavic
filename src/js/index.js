import '../../node_modules/normalize.css/normalize.css';
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick.js';
import '../scss/style.scss';
import '../js/slider.js';
import '../js/accordion.js';
import '../js/animation.js';
import { delay } from '../js/animation';

const html = document.querySelector('html');
const headerInner = document.getElementById('header-inner');
const scrollArrow = document.querySelectorAll('#scroll-arrow-link');
const top = document.getElementById('top');
const about = document.getElementById('about');
const advantages = document.getElementById('advantages');
const specification = document.getElementById('specification');
const questions = document.getElementById('questions');
const contacts = document.getElementById('contacts');
const topItemsForAnimate = top.querySelectorAll('.top-animate');
const aboutItemsForAnimate = about.querySelectorAll('.about-animate');
const advantagesItemsForAnimate = advantages.querySelectorAll(
  '.advantages-animate'
);
const specificationItemsForAnimate = specification.querySelectorAll(
  '.specification-animate'
);
const questionsItemsForAnimate = questions.querySelectorAll(
  '.questions-animate'
);
const contactsItemsForAnimate = contacts.querySelectorAll('.contacts-animate');

const dataForAnimate = [
  [top, topItemsForAnimate],
  [about, aboutItemsForAnimate],
  [advantages, advantagesItemsForAnimate],
  [specification, specificationItemsForAnimate],
  [questions, questionsItemsForAnimate],
  [contacts, contactsItemsForAnimate],
];

let currentSectionIndex, prevScrollTop;
let startCoords = 0;
let endCoords = 0;
let touchDistance = 0;

function addAnimate(items) {
  items.forEach((item) => {
    item.classList.add('animate');
  });
}

function defineSection(section) {
  if (
    html.scrollTop >= section.offsetTop - section.offsetHeight / 2 &&
    html.scrollTop < section.offsetTop + section.offsetHeight / 2
  ) {
    return section;
  }
}

const checkChangeScroll = () => {
  return new Promise((resolve) => {
    let scrollChange = setInterval(() => {
      if (prevScrollTop != html.scrollTop) {
        prevScrollTop = html.scrollTop;
      } else {
        clearInterval(scrollChange);
        resolve();
      }
    }, 500);
  });
};

async function checkEndScroll() {
  await checkChangeScroll();
  document.removeEventListener('scroll', checkEndScroll);
  loadHandler();
}

async function navigationHandler() {
  if (event.target.closest('a')) {
    document.addEventListener('scroll', checkEndScroll), { once: true };
  }
}

function loadHandler() {
  dataForAnimate.forEach((section) => {
    if (defineSection(section[0])) {
      console.log('fire if');
      currentSectionIndex = dataForAnimate.indexOf(section);
      html.scrollTop = dataForAnimate[currentSectionIndex][0].offsetTop;
      addAnimate(section[1]);
    }
  });
}

async function scrollHandler() {
  document.removeEventListener('wheel', scrollHandler);

  if (event.deltaY > 0 && currentSectionIndex < dataForAnimate.length - 1) {
    currentSectionIndex += 1;
    html.scrollTop = dataForAnimate[currentSectionIndex][0].offsetTop;
    addAnimate(dataForAnimate[currentSectionIndex][1]);
  } else if (event.deltaY < 0 && currentSectionIndex > 0) {
    currentSectionIndex -= 1;
    html.scrollTop = dataForAnimate[currentSectionIndex][0].offsetTop;
    addAnimate(dataForAnimate[currentSectionIndex][1]);
  }
  await delay(1000);
  document.addEventListener('wheel', scrollHandler);
}

function scrollArrowHandler() {
  currentSectionIndex += 1;
  addAnimate(dataForAnimate[currentSectionIndex][1]);
}

function touchStartHandler() {
  startCoords = event.changedTouches[0].pageY;
}

function touchEndHandler() {
  endCoords = event.changedTouches[0].pageY;
  touchDistance = endCoords - startCoords;
  if (touchDistance < -10 && currentSectionIndex < dataForAnimate.length - 1) {
    currentSectionIndex += 1;
    html.scrollTop = dataForAnimate[currentSectionIndex][0].offsetTop;
    addAnimate(dataForAnimate[currentSectionIndex][1]);
  } else if (touchDistance > 10 && currentSectionIndex > 0) {
    currentSectionIndex -= 1;
    html.scrollTop = dataForAnimate[currentSectionIndex][0].offsetTop;
    addAnimate(dataForAnimate[currentSectionIndex][1]);
  }
}

window.addEventListener('load', loadHandler);
document.addEventListener('wheel', scrollHandler);
headerInner.addEventListener('click', navigationHandler);

const createArrowEventListener = () => {
  scrollArrow.forEach((arrow) => {
    arrow.addEventListener('click', scrollArrowHandler);
  });
};
createArrowEventListener();
document.addEventListener('touchstart', () => {
  touchStartHandler();
});
document.addEventListener('touchend', () => {
  touchEndHandler();
});
