import { displayTextError, clearTextError } from "../components/error.js";
import { emailValidation, setupEmailEventListener, characterValidation } from "../util/validation.js";
import { passwordVisibilityToggle } from "../features/auth.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const button = document.querySelector("#login");
const form = document.querySelector("#login-form");
const previousPage = new URLSearchParams(window.location.search).get("from");
const previousPageExists = Boolean(previousPage);

if (previousPageExists) {
  const signUp = document.querySelector("#sign-up");
  const forgotPassword = document.querySelector("#forgot-password");
  signUp.setAttribute("href", `./auth-signup.html?from=${previousPage}`);
  forgotPassword.setAttribute("href", `./auth-forgot.html?from=${previousPage}`);
}

const submitForm = (emailValidationStatus, passwordValidationStatus) => {
  if (emailValidationStatus && passwordValidationStatus) {
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
      displayTextError(emailValidationStatus, email, "Please enter valid email address", "email-error");
    }
    if (!passwordValidationStatus && !passwordError) {
      displayTextError(passwordValidationStatus, password, "Password is required", "password-error");
    }
  }
};

export const setupLogin = () => {
  setupEmailEventListener(email);

  password.addEventListener("focusout", function (e) {
    const validated = characterValidation(password.value.trim());
    displayTextError(validated, password, "Password is required", "password-error");
  });

  password.addEventListener("input", function (e) {
    const validated = characterValidation(password.value.trim());
    clearTextError(validated, password, "password-error");
  });

  passwordVisibilityToggle(password);

  button.addEventListener("click", function (e) {
    e.preventDefault();
    const emailValidated = emailValidation(email.value.trim());
    const passwordValidated = characterValidation(password.value.trim());

    submitForm(emailValidated, passwordValidated);
  });
};
