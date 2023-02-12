import { createHTML } from "../util/createHTML.js";
import { removeFromCart } from "../features/cart.js";
import { getSummaryPrices } from "../features/cart.js";

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
