'use strict';

const swatches = document.querySelector('.swatches');
const colors = document.querySelector('#colorSwatch');
const sizes = document.querySelector('#sizeSwatch');
const cart = document.querySelector('#quick-cart');
const addButton = document.querySelector('#AddToCart');

function getRequest(node = '', param = '') {

  const request = new XMLHttpRequest();
  request.addEventListener('load', onLoad);
  request.open('GET', `https://neto-api.herokuapp.com/cart/${param}`);
  request.send();

  function onLoad() {
    const response = JSON.parse(request.responseText);
    getSnippents(response, node, param);
  }

  function getSnippents(response, node, param) {

    if(param === '') {
      getCart(response);
      return;
    }

    let lastChildren = node.children[node.children.length - 1];
    for(let item of response) {
      const isAvailable = item.isAvailable ? 'available' : 'soldout';
      const disabled = item.isAvailable ? '' : 'disabled';
      let isChecked;
      const clone = lastChildren.cloneNode(true);
      node.appendChild(clone);
      lastChildren = node.children[node.children.length - 1]

      switch(param) {
        case 'colors':
          isChecked = item.type === localStorage.color ? 'checked' : '';
          lastChildren.outerHTML = `<div data-value="${item.type}" class="swatch-element color ${item.type} ${isAvailable}">
                                     <div class="tooltip">${item.title}</div>
                                      <input quickbeam="color" id="swatch-1-${item.type}" type="radio" name="color" value="${item.type}" ${disabled} ${isChecked}>
                                      <label for="swatch-1-${item.type}" style="border-color: ${item.code};">
                                        <span style="background-color: ${item.code};"></span>
                                        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                                      </label>
                                    </div>`;
          break;

        case 'sizes':
          isChecked = item.type === localStorage.size ? 'checked' : '';
          lastChildren.outerHTML = `<div data-value="${item.type}" class="swatch-element plain ${item.type} ${isAvailable}">
                                      <input id="swatch-0-${item.type}" type="radio" name="size" value="${item.type}" ${disabled} ${isChecked}>
                                      <label for="swatch-0-${item.type}">
                                        ${item.title}
                                        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
                                      </label>
                                    </div>`;
          break;
      }
    }
  }

}

function getCart(response) {
  let fullPrice = 0;
  let quantity = 0;
  let snippets = '';

  for(let item of response) {
    fullPrice += item.quantity * item.price;
    quantity += item.quantity;
    snippets += `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.id}" style="opacity: 1;">
                    <div class="quick-cart-product-wrap">
                      <img src="${item.pic}" title="${item.title}">
                      <span class="s1" style="background-color: #000; opacity: .5">$${item.price}</span>
                      <span class="s2"></span>
                    </div>
                    <span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span>
                    <span class="quick-cart-product-remove remove" data-id="${item.id}"></span>
                  </div>`;

  }

  const isOpen = quantity ? 'open' : '';
  snippets += `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${isOpen}">
                  <span>
                    <strong class="quick-cart-text">Оформить заказ<br></strong>
                    <span id="quick-cart-price">$${fullPrice}</span>
                  </span>
                </a>`;
  cart.innerHTML = snippets;
  const removeButtons = document.querySelectorAll('.quick-cart-product-remove');
  Array.from(removeButtons).forEach(el => el.addEventListener('click', updateCart));
}


getRequest(sizes, 'sizes');
getRequest(colors, 'colors');
getRequest();


swatches.addEventListener('click', updateSwatches);

function updateSwatches(event) {
  const elem = event.target;
  if(elem.tagName !== 'INPUT') {
    return;
  }
  const type = elem.getAttribute('name');
  localStorage[`${type}`] = elem.getAttribute('value');
}


addButton.addEventListener('click', updateCart);

function updateCart(event) {
  event.preventDefault();
  const currentTarget = event.currentTarget;
  const form = document.querySelector('#AddToCartForm');
  const xhr = new XMLHttpRequest();
  const formData = new FormData(form);
  if(currentTarget.id === 'AddToCart') {
    formData.append('productId', form.getAttribute('data-product-id'))
    xhr.open('POST', `https://neto-api.herokuapp.com/cart`);
  } else if(currentTarget.classList.contains('remove')){
    formData.append('productId', currentTarget.getAttribute('data-id'));
    xhr.open('POST', `https://neto-api.herokuapp.com/cart/remove`);
  }
  xhr.send(formData);

  xhr.addEventListener('load', () => {
    const response = JSON.parse(xhr.response);
    if(response.error) {
      console.log(response.message);
      return;
    }
    getCart(response);
  });

  //  let objFormData = {};
  //   for (const [k, v] of formData) {
  //     objFormData[k] = v;
  //   }
  // console.log(objFormData);
}
