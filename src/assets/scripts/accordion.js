const accordion = document.getElementById('accordion');
const itemsText = document.querySelectorAll('.accordion__item-text');

itemsText[1].previousElementSibling.classList.add('is-open');
itemsText[1].style.maxHeight = `${itemsText[1].scrollHeight + 20}px`;
itemsText[1].style.paddingBottom = '20px';

function accordionHandler(event) {
  if (!event.target.closest('.accordion__item-title')) {
    return;
  }

  const target = event.target.closest('.accordion__item-title');

  const targetText = target.nextElementSibling;

  itemsText.forEach((item) => {
    if (item.offsetHeight) {
      item.previousElementSibling.classList.remove('is-open');
      item.style.maxHeight = null;
      item.style.paddingBottom = '0px';
    }
  });

  target.classList.add('is-open');
  targetText.style.maxHeight = `${targetText.scrollHeight + 20}px`;
  targetText.style.paddingBottom = '20px';
}

accordion.addEventListener('click', accordionHandler);
