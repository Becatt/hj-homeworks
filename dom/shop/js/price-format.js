function getPriceFormatted(value) {
  return  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

let cartCount = 0;
let totalPrice = 0;
function SumPrice(event) {
   totalPrice += parseInt(this.dataset.price)
   document.querySelector('#cart-total-price').innerHTML = getPriceFormatted(totalPrice);
   cartCount++;
   document.querySelector('#cart-count').innerHTML = cartCount;
}

document.addEventListener('DOMContentLoaded', () => {
  const btns = document.querySelectorAll('button.add');
  for(let btn of btns) {
    btn.addEventListener('click', SumPrice);
  }
});
