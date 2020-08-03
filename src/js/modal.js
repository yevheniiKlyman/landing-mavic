const buyBtn = document.getElementById('buy-btn');
const modal = document.getElementById('modal');
const orderBtn = modal.querySelector('#order-btn');
const itemPrice = modal.querySelector('#item-price');
const totalPrice = modal.querySelector('#total-price');
const counterAmount = modal.querySelector('#counter-amount');
const modalCounter = modal.querySelector('#modal-counter');

const toggleModal = () => {
  modal.classList.toggle('visible');
};

const closeModal = (event) => {
  if (
    event.target.closest('#modal-close') ||
    event.target.closest('#cancel-btn') ||
    !event.target.closest('#modal-inner')
  ) {
    toggleModal();
  }
};

const countTotalPrice = () => {
  totalPrice.textContent =
    parseInt(itemPrice.textContent) * counterAmount.textContent + ' ₽';
};

const changeCount = (event) => {
  if (event.target.closest('#counter-minus') && counterAmount.textContent > 1) {
    counterAmount.textContent--;
    countTotalPrice();
  }
  if (event.target.closest('#counter-plus') && counterAmount.textContent < 9) {
    counterAmount.textContent++;
    countTotalPrice();
  }
};

buyBtn.addEventListener('click', () => {
  toggleModal();
  countTotalPrice();
});
modal.addEventListener('click', closeModal);
modalCounter.addEventListener('click', changeCount);
