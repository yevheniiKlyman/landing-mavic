import $ from 'jquery';

$(document).ready(function () {
  $('.about__text-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    infinite: false,
    asNavFor: '.about__slider',
  });

  $('.about__slider').slick({
    prevArrow:
      '<button class="about__slider-btn about__slider-btn-left"><svg class="about__left-arrow" width="9" height="16"><use xlink:href="images/icons.svg#left-arrow"></use></svg></button>',
    nextArrow:
      '<button class="about__slider-btn about__slider-btn-right"><svg class="about__right-arrow" width="9" height="16"><use xlink:href="images/icons.svg#right-arrow"></use></svg></button>',
    infinite: false,
    asNavFor: '.about__text-slider',
  });
});
