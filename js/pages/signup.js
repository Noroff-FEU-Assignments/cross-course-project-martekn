import { setupEmailEventListener, emailValidation } from "../util/validation/email-validation.js";
import { displayError } from "../components/text-error.js";
import {
  setupPasswordEventListener,
  passwordValidation,
  hideShowPasswordError,
} from "../util/validation/password-validation.js";

import { passwordVisibilityToggle } from "../features/auth.js";

const form = document.querySelector("#signup-form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const button = document.querySelector("#signup");

const previousPage = new URLSearchParams(window.location.search).get("from");
const previousPageExists = Boolean(previousPage);

if (previousPageExists) {
  const login = document.querySelector("#login");
  login.setAttribute("href", `./auth-login.html?from=${previousPage}`);
}

const submitForm = (emailValidationStatus, passwordValidationStatus) => {
  if (emailValidationStatus && passwordValidationStatus.isPasswordValid) {
    form.reset();
    localStorage.setItem("auth", JSON.stringify("true"));
    if (previousPageExists) {
      location.href = `./${previousPage}`;
    } else {
      location.href = "./index.html";
    }
  } else {
    const emailError = document.querySelector("#email-error");
    const passwordError = document.querySelector("#password-error");
    if (!emailValidationStatus && !emailError) {
      displayError(emailValidationStatus, email, "Please enter valid email address", "email-error");
    }
    if (!passwordValidationStatus.isPasswordValid && !passwordError) {
      hideShowPasswordError(password);
    }
  }
};

export const setupSignup = () => {
  setupEmailEventListener(email);

  setupPasswordEventListener(password);

  passwordVisibilityToggle(password);

  button.addEventListener("click", function (e) {
    e.preventDefault();
    const emailValidated = emailValidation(email.value.trim());
    const passwordValidated = passwordValidation(password.value.trim());

    submitForm(emailValidated, passwordValidated);
  });
};
