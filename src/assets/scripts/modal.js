const buyBtn = document.getElementById('buy-btn');
const modal = document.getElementById('modal');
const itemPrice = modal.querySelector('#item-price');
const totalPrice = modal.querySelector('#total-price');
const counterAmount = modal.querySelector('#counter-amount');
const modalCounter = modal.querySelector('#modal-counter');

const toggleModal = () => {
  modal.classList.toggle('visible');
};

const closeModal = (event) => {
  if (
    event.target.closest('#modal-close')
    || event.target.closest('#cancel-btn')
    || !event.target.closest('#modal-inner')
  ) {
    toggleModal();
  }
};

const countTotalPrice = () => {
  totalPrice.textContent = `${parseInt(itemPrice.textContent, 10) * counterAmount.textContent} ₽`;
};

const changeCount = (event) => {
  let count = Number(counterAmount.textContent);

  if (event.target.closest('#counter-minus') && counterAmount.textContent > 1) {
    count -= 1;
  } else if (event.target.closest('#counter-plus') && counterAmount.textContent < 9) {
    count += 1;
  }

  counterAmount.textContent = count;
  countTotalPrice();
};

buyBtn.addEventListener('click', () => {
  toggleModal();
  countTotalPrice();
});
modal.addEventListener('click', closeModal);
modalCounter.addEventListener('click', changeCount);
