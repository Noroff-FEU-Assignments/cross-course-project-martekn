import { logout } from "../features/auth.js";
import { passwordVisibilityToggle } from "../features/auth.js";
import { setupUserDetails } from "../util/user-details.js";

import { displayTextError, clearTextError } from "../components/error.js";
import { characterValidation, setupPasswordEventListener, passwordValidation } from "../util/validation.js";

const logoutButton = document.querySelector("#logout");

const detailsContainer = document.querySelector("#details-container");
const user = JSON.parse(localStorage.getItem("user"));

const form = document.querySelector("#password-form");

const currentPassword = document.querySelector("#current-password");
const newPassword = document.querySelector("#new-password");
const passwordButton = document.querySelector("#save-password");

const updatePassword = (currentP, newP) => {
  if (currentP && newP.isPasswordValid) {
    passwordButton.disabled = true;
    passwordButton.innerText = "Password is updated";
    form.reset();
  }
};

export const setupAccountSettings = () => {
  logout(logoutButton);

  passwordVisibilityToggle(currentPassword);
  passwordVisibilityToggle(newPassword);

  setupUserDetails(user, detailsContainer);
  setupPasswordEventListener(newPassword);

  currentPassword.addEventListener("focusout", function (e) {
    const validated = characterValidation(currentPassword.value.trim());
    displayTextError(validated, currentPassword, "Password is required", "current-password-error");
  });

  currentPassword.addEventListener("input", function (e) {
    const validated = characterValidation(currentPassword.value.trim());
    clearTextError(validated, currentPassword, "current-password-error");
  });

  passwordButton.addEventListener("click", (e) => {
    e.preventDefault();

    const currentValidated = characterValidation(currentPassword.value.trim());
    const newValidated = passwordValidation(newPassword.value.trim());
    updatePassword(currentValidated, newValidated);
  });
};
