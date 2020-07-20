import '../../node_modules/normalize.css/normalize.css';
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick.js';
import '../scss/style.scss';
import '../js/slider.js';

const html = document.querySelector('html');
const top = document.getElementById('top');
const about = document.getElementById('about');
const advantages = document.getElementById('advantages');
const specification = document.getElementById('specification');
const topItemsForAnimate = top.querySelectorAll('.top-animate');
const aboutItemsForAnimate = about.querySelectorAll('.about-animate');
const advantagesItemsForAnimate = advantages.querySelectorAll(
  '.advantages-animate'
);
const specificationItemsForAnimate = specification.querySelectorAll(
  '.specification-animate'
);

function checkScrollPosition(section) {
  if (
    html.scrollTop >= section.offsetTop - section.offsetHeight / 2 &&
    html.scrollTop < section.offsetTop + section.offsetHeight / 2
  ) {
    return true;
  }
}

function addAnimate(items) {
  items.forEach((item) => {
    item.classList.add('animate');
  });
}

function animateTop() {
  if (checkScrollPosition(top)) {
    addAnimate(topItemsForAnimate);
  }
}

function animateAbout() {
  if (checkScrollPosition(about)) {
    addAnimate(aboutItemsForAnimate);
  }
}

function animateAdvantages() {
  if (checkScrollPosition(advantages)) {
    addAnimate(advantagesItemsForAnimate);
  }
}

function animateSpecification() {
  if (checkScrollPosition(specification)) {
    addAnimate(specificationItemsForAnimate);
  }
}

function scrollHandler() {
  animateTop();
  animateAbout();
  animateAdvantages();
  animateSpecification();
}

window.addEventListener('load', scrollHandler);
document.addEventListener('scroll', scrollHandler);
