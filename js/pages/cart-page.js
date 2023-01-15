import { setupCart } from "../features/cart.js";

const cartContainer = document.querySelector("#cart");
export const setupCartPage = () => {
  setupCart(cartContainer);
};
