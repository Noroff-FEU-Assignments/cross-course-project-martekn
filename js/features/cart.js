import { createHTML } from "../util/createHTML.js";

export const lsKey = "cartItems";
export let cartArray = [];
const counterContainer = document.querySelector("#counter-container");
const countContainer = document.querySelector("#count");

/**
 * Creates list item for cart with the relevant information
 * @param {Object} productDetails
 * @returns List item
 */
const createCartItem = (productDetails) => {
  const li = createHTML("li", "grid", null, { id: productDetails.productId });
  const img = createHTML("img", null, null, { src: productDetails.image, alt: productDetails.title });
  const title = createHTML("span", null, productDetails.title);
  const priceContainer = createHTML("div", ["price", "flex", "flex--col"]);
  if (productDetails.price.originalPrice !== productDetails.price.currentPrice) {
    const priceOld = createHTML("s");
    const helpText = createHTML("span", "visually-hidden", "Original price");
    const price = createHTML("span", null, `$${productDetails.price.originalPrice}`);
    priceOld.append(helpText, price);
    priceContainer.appendChild(priceOld);
  }
  const priceCurrent = createHTML("span");
  const helpText = createHTML("span", "visually-hidden", "Current price");
  const price = createHTML("span", null, `$${productDetails.price.currentPrice}`);
  priceCurrent.append(helpText, price);
  priceContainer.appendChild(priceCurrent);

  const button = createHTML("button", "btn--transparent");
  const iconHelp = createHTML("span", "visually-hidden", "Remove from cart");
  const icon = createHTML("span", "material-symbols-outlined", "remove_shopping_cart", { "aria-hidden": "true" });

  button.addEventListener("click", removeFromCart);
  button.append(iconHelp, icon);

  li.append(img, title, priceContainer, button);
  return li;
};

/**
 * Creates the cart component with each product added
 * @param {Array} array - Array containing the products in cart
 * @returns HTMLElement
 */
export const createCart = (array) => {
  const container = createHTML("div", ["shopping-cart", "bg-card", "rounded-corners", "shadow"], null, {
    id: "cart-container",
  });
  const header = createHTML("div", ["header", "grid"], null, { "aria-hidden": "true" });
  const productTitle = createHTML("span", "h3", "Product(s)");
  const priceTitle = createHTML("span", "h3", "Price");
  const removeTitle = createHTML("span", "h3", "Remove");
  header.append(productTitle, priceTitle, removeTitle);

  const cartList = createHTML("ul", null, null, {
    "aria-label": "Products in cart with price and remove from cart option",
  });

  container.append(header, cartList);

  for (const product of array) {
    const item = createCartItem(product);
    cartList.appendChild(item);
  }

  return container;
};

/**
 * Creates and displays cart error
 */
export const displayEmptyCartError = () => {
  const container = createHTML(
    "div",
    ["empty-cart", "bg-card", "border-radius", "flex"],
    "There are no products in your cart"
  );
  document.querySelector("#cart").appendChild(container);
};

/**
 * Creates summary, the overall pricing
 * @returns HTMLElement
 */
export const createSummary = () => {
  const prices = getSummaryPrices();
  const summary = createHTML(
    "div",
    ["summary", "flow-content", "flow-form", "bg-card", "rounded-corners", "shadow"],
    null,
    {
      id: "summary-container",
    }
  );
  const main = createHTML("div", ["main", "flow-content", "flow-form"]);

  const dl = createHTML("dl", "grid");
  const sumTitle = createHTML("dt", null, "Price");
  const sumContent = createHTML("dd", null, `$${prices.price}`, { id: "summary-price" });
  const discountTitle = createHTML("dt", null, "Discount");
  const discountContent = createHTML("dd", null, `-$${prices.discountedPrice}`, { id: "summary-discount" });
  const totalTitle = createHTML("dt", null, "Total");
  const totalContent = createHTML("dd", null, `$${prices.totalPrice}`, { id: "summary-total" });

  const buttonContainer = createHTML("div", "flow-content");
  const button = createHTML("a", "btn", "Go to checkout", { href: "./purchase-checkout.html" });
  buttonContainer.appendChild(button);

  dl.append(sumTitle, sumContent, discountTitle, discountContent, totalTitle, totalContent);
  main.append(dl, buttonContainer);
  summary.appendChild(main);
  return summary;
};

export const setCartCounter = () => {
  if (localStorage.getItem(lsKey) !== null) {
    cartArray = JSON.parse(localStorage.getItem(lsKey));
  }
  if (countContainer) {
    countContainer.innerText = cartArray.length;
  }
};

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

const productRemovalAlert = (container) => {
  const alert = createHTML("div", ["cart-alert", "flex"]);
  const messageContainer = createHTML("div", "flex");
  const messageIcon = createHTML("span", "material-symbols-outlined", "warning");
  const message = createHTML("span", null, `Owned game(s) were removed from the cart`);
  messageContainer.append(messageIcon, message);
  const button = createHTML("button", "btn--transparent");
  const icon = createHTML("span", "material-symbols-outlined", "close");
  button.addEventListener("click", () => {
    alert.remove();
  });
  button.appendChild(icon);
  alert.append(messageContainer, button);
  container.appendChild(alert);
  setTimeout(() => {
    alert.remove();
  }, 3000);
};

export const setupCart = (container) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  const user = JSON.parse(localStorage.getItem("user"));
  if (auth === "true") {
    const ownedGamesIds = user.ownedGames.map((game) => game.id);
    const cartArrayLength = cartArray.length;

    cartArray = cartArray.filter((product) => {
      return !ownedGamesIds.includes(product.productId);
    });

    localStorage.setItem(lsKey, JSON.stringify(cartArray));

    if (cartArrayLength !== cartArray.length) {
      productRemovalAlert(container);
      setCartCounter();
    }
  }

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
