const questionsImg = document.getElementById('questions-img');
const contactsFormText = document.getElementById('contacts__form-text');
const contactsFormTitle = document.getElementById('contacts-form-title');

//animation question-image
const animateImg = () => {
  requestAnimationFrame(() => {
    questionsImg.animate(
      [
        { transform: 'rotate(-7deg)', right: '10px', offset: 0.1 },
        { transform: 'rotate(0deg)', offset: 0.5 },
        { transform: 'rotate(7deg)', right: '290px', offset: 0.9 },
        { right: '300px' },
      ],
      {
        duration: 2500,
        direction: 'alternate',
        easing: 'ease-in-out',
        iterations: 2,
      }
    );
  });
};

export const delay = (wait = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('resolved');
    }, wait);
  });
};

async function animateImgHandler() {
  questionsImg.removeEventListener('mouseenter', animateImgHandler);
  animateImg();
  await delay(5000);
  questionsImg.addEventListener('mouseenter', animateImgHandler);
}
// END of the animation question-image

//animation text
const animate = (options) => {
  var start = performance.now();

  requestAnimationFrame(function animate(time) {
    var timeFraction = (time - start) / options.duration;
    if (timeFraction > 1) timeFraction = 1;

    var progress = options.timing(timeFraction);

    options.draw(progress);

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
  });
};

function animateText() {
  contactsFormText.style.opacity = 1;
  let text = contactsFormText.textContent.replace(/ +/g, ' ').trim();
  let to = text.length,
    from = 0;

  animate({
    duration: 5000,
    timing: function (timeFraction) {
      return timeFraction;
    },
    draw: function (progress) {
      let result = (to - from) * progress + from;
      contactsFormText.textContent = text.substr(0, Math.ceil(result));
    },
  });
}

questionsImg.addEventListener('mouseenter', animateImgHandler);
contactsFormTitle.addEventListener('animationend', animateText);
