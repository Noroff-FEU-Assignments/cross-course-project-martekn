import { setupEmailEventListener, emailValidation } from "../util/validation/email-validation.js";
import { displayError } from "../components/text-error.js";

const email = document.querySelector("#email");
const button = document.querySelector("#recovery-btn");
const previousPage = new URLSearchParams(window.location.search).get("from");
const previousPageExists = Boolean(previousPage);

if (previousPageExists) {
  const login = document.querySelector("#log-in");
  login.setAttribute("href", `./auth-login.html?from=${previousPage}`);
}

export const setupForgotPassword = () => {
  setupEmailEventListener(email);

  button.addEventListener("click", (e) => {
    e.preventDefault();

    const emailValidated = emailValidation(email.value.trim());
    if (emailValidated) {
      button.disabled = true;
      button.innerText = "Recovery email has been sent";
      form.reset();
    }
    const emailError = document.querySelector("#email-error");
    if (!emailValidated && !emailError) {
      displayError(emailValidated, email, "Please enter valid email address", "email-error");
    }
  });
};
