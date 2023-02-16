import { setupLogoutButton } from "../features/auth.js";

export const setupAccount = () => {
  const button = document.querySelector("#logout");
  setupLogoutButton(button);
};
