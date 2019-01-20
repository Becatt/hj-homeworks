'use strict';

const container = document.querySelector('.items-list');
container.addEventListener('click', event => {
  const el = event.target;
  if (!el.classList.contains('add-to-cart')) {
    return;
  } else {
    const product = {
      'title': el.getAttribute('data-title'),
      'price': el.getAttribute('data-price')
    }
    addToCart(product);
  }
});
