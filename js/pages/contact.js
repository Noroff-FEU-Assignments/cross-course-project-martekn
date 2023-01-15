import { setupEmailEventListener, emailValidation } from "../util/validation/email-validation.js";
import { displayError, clearError } from "../components/text-error.js";
import { characterValidation } from "../util/validation/character-validation.js";

const name = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const button = document.querySelector("#submit-btn");
const form = document.querySelector("#contact-form");
const nameErrorText = "Please enter your full name";
const nameErrorId = "name-error";
const messageErrorText = "Please enter your message";
const messageErrorId = "message-error";

const submitForm = (nameValidationStatus, emailValidationStatus, messageValidationStatus) => {
  if (nameValidationStatus && emailValidationStatus && messageValidationStatus) {
    button.disabled = true;
    button.innerText = "Message is sent";
    form.reset();
    location.href = "./message-success.html";
  } else {
    const nameError = document.querySelector(`#${nameErrorId}`);
    const emailError = document.querySelector("#email-error");
    const messageError = document.querySelector(`#${messageErrorId}`);

    if (!nameValidationStatus && !nameError) {
      displayError(nameValidationStatus, name, nameErrorText, nameErrorId);
    }

    if (!emailValidationStatus && !emailError) {
      displayError(emailValidationStatus, email, "Please enter valid email address", "email-error");
    }

    if (!messageValidationStatus && !messageError) {
      displayError(messageValidationStatus, message, messageErrorText, messageErrorId);
    }
  }
};

export const setupContact = () => {
  name.addEventListener("focusout", function (e) {
    const validated = characterValidation(name.value.trim());
    displayError(validated, name, nameErrorText, nameErrorId);
  });

  name.addEventListener("input", function (e) {
    const validated = characterValidation(name.value.trim());
    clearError(validated, name, nameErrorId);
  });

  setupEmailEventListener(email);

  message.addEventListener("focusout", function (e) {
    const validated = characterValidation(message.value.trim());
    displayError(validated, message, messageErrorText, messageErrorId);
  });

  message.addEventListener("input", function (e) {
    const validated = characterValidation(message.value.trim());
    clearError(validated, message, messageErrorId);
  });

  button.addEventListener("click", function (e) {
    e.preventDefault();
    const nameValidated = characterValidation(name.value.trim());
    const emailValidated = emailValidation(email.value.trim());
    const messageValidated = characterValidation(message.value.trim());
    submitForm(nameValidated, emailValidated, messageValidated);
  });
};
