import '../../node_modules/normalize.css/normalize.css';
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick.js';
import '../scss/style.scss';
import $ from 'jquery';

$(document).ready(function () {
  $('.about__slider').slick({
    prevArrow:
      '<button class="about__slider-btn about__slider-btn-left"><svg class="about__left-arrow" width="9" height="16"><use xlink:href="images/icons.svg#left-arrow"></use></svg></button>',
    nextArrow:
      '<button class="about__slider-btn about__slider-btn-right"><svg class="about__right-arrow" width="9" height="16"><use xlink:href="images/icons.svg#right-arrow"></use></svg></button>',
    infinite: false,
  });
});
