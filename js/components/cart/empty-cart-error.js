import { createHTML } from "../../util/createHTML.js";

export const displayEmptyCartError = () => {
  const container = createHTML(
    "div",
    ["empty-cart", "bg-card", "border-radius", "flex"],
    "There are no products in your cart"
  );
  document.querySelector("#cart").appendChild(container);
};
