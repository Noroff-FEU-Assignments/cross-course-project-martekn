import { createHTML } from "../../util/createHTML.js";
import { removeFromCart } from "../../features/cart.js";

export const displayEmptyCartError = () => {
  const container = createHTML("div", "empty-cart", "There are no products in your cart");
  document.querySelector("#cart").appendChild(container);
};

const createCartItem = (productDetails) => {
  const li = createHTML("li", "grid", null, { id: productDetails.productId });
  const img = createHTML("img", null, null, { src: productDetails.image, alt: productDetails.title });
  const title = createHTML("span", null, productDetails.title);
  const priceContainer = createHTML("div", ["price", "flex", "flex--col"]);
  if (productDetails.price.oldPrice !== productDetails.price.currentPrice) {
    const priceOld = createHTML("s");
    const helpText = createHTML("span", "visually-hidden", "Original price");
    const price = createHTML("span", null, `$${productDetails.price.oldPrice}`);
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
