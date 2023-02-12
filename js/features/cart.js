import { createCart, displayEmptyCartError, createSummary } from "../components/cart.js";
import { createHTML } from "../util/createHTML.js";

export const lsKey = "cartItems";
export let cartArray = [];
const counterContainer = document.querySelector("#counter-container");
const countContainer = document.querySelector("#count");

export const setCartCounter = () => {
  if (localStorage.getItem(lsKey) !== null) {
    cartArray = JSON.parse(localStorage.getItem(lsKey));
  }
  if (countContainer) {
    countContainer.innerText = cartArray.length;
  }
};

console.log(cartArray);
const addProductToCart = (product, button) => {
  cartArray.push(product);
  localStorage.setItem(lsKey, JSON.stringify(cartArray));

  button.innerText = "Added to cart";
  button.disabled = true;

  counterContainer.classList.add("animation-pulse");
};

export const setupAddToCart = (button, productId, name, img, cPrice, oPrice, conditionStatus) => {
  const product = {
    productId: productId,
    title: name,
    image: img,
    price: {
      originalPrice: oPrice,
      currentPrice: cPrice,
    },
    condition: conditionStatus,
  };

  const productInCart = cartArray.find((product) => product.productId === productId);

  if (productInCart && productInCart.condition === conditionStatus) {
    button.innerText = "Added to cart";
    button.disabled = true;
  } else if (productInCart && productInCart.condition !== conditionStatus) {
    button.innerText = "Replace game in cart";
    button.disabled = false;

    button.addEventListener("click", (e) => {
      cartArray = cartArray.filter((product) => product.productId !== productId);

      addProductToCart(product, button);
      setCartCounter();
    });
  } else {
    button.addEventListener("click", (e) => {
      addProductToCart(product, button);
      setCartCounter();
    });
  }
};

export const getSummaryPrices = () => {
  let sum = 0;
  let discount = 0;
  let total = 0;

  sum = 0;
  total = 0;
  discount = 0;
  for (const product of cartArray) {
    if (product.price.currentPrice === product.price.originalPrice) {
      sum += Number(product.price.originalPrice);
      total += Number(product.price.originalPrice);
    } else {
      sum += Number(product.price.originalPrice);
      total += Number(product.price.currentPrice);
    }
  }
  discount = sum - total;
  sum = sum.toFixed(2);
  total = total.toFixed(2);
  discount = discount.toFixed(2);
  return { price: sum, discountedPrice: discount, totalPrice: total };
};

const updateSummaryPricing = () => {
  const priceContainer = document.querySelector("#summary-price");
  const discountContainer = document.querySelector("#summary-discount");
  const totalContainer = document.querySelector("#summary-total");
  const prices = getSummaryPrices();
  priceContainer.innerText = `$${prices.price}`;
  discountContainer.innerText = `-$${prices.discountedPrice}`;
  totalContainer.innerText = `$${prices.totalPrice}`;
};

export const removeFromCart = function (e) {
  const listElement = this.parentNode;
  cartArray = cartArray.filter((product) => product.productId != listElement.getAttribute("id"));
  localStorage.setItem(lsKey, JSON.stringify(cartArray));
  listElement.remove();

  setCartCounter();
  updateSummaryPricing();
  if (cartArray.length === 0) {
    document.querySelector("#cart-container").remove();
    document.querySelector("#summary-container").remove();

    displayEmptyCartError();
  }
};

export const setupCart = (container) => {
  if (cartArray.length === 0) {
    displayEmptyCartError();
  } else {
    const summary = createSummary();
    const cart = createCart(cartArray);

    container.append(cart, summary);
  }
};

const fillCartList = () => {
  const ul = document.querySelector("#cart-list");
  for (const product of cartArray) {
    const list = createHTML("li", "flex");
    const title = createHTML("span", null, product.title);
    const priceContainer = createHTML("span", "flex");

    if (product.price.currentPrice !== product.price.originalPrice) {
      const originalPrice = createHTML("s", null, `$${product.price.originalPrice}`);
      priceContainer.appendChild(originalPrice);
    }
    const price = createHTML("span", null, `$${product.price.currentPrice}`);
    priceContainer.appendChild(price);
    list.append(title, priceContainer);
    ul.appendChild(list);
  }
};
const fillSummaryPricing = () => {
  const prices = getSummaryPrices();

  document.querySelector("#price").innerText = `$${prices.price}`;
  document.querySelector("#discount").innerText = `-$${prices.discountedPrice}`;
  document.querySelector("#total").innerText = `$${prices.totalPrice}`;
};
export const setupCheckoutCart = () => {
  fillCartList();
  fillSummaryPricing();
};
