import { logout } from "../features/auth.js";

export const setupAccount = () => {
  const button = document.querySelector("#logout");
  logout(button);
};
