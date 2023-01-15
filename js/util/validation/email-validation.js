import { displayError, clearError } from "../../components/text-error.js";

export const emailValidation = (email) => {
  const regexPattern = /\S+\@\S+\.\S+/;
  const validated = regexPattern.test(email);
  return validated;
};

export const setupEmailEventListener = (emailInput) => {
  let timeout;

  emailInput.addEventListener("focusout", function (e) {
    const validated = emailValidation(emailInput.value.trim());
    displayError(validated, emailInput, "Please enter valid email address", "email-error");
  });

  emailInput.addEventListener("input", function (e) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = 0;
    }

    timeout = setTimeout(() => {
      const validated = emailValidation(emailInput.value.trim());
      displayError(validated, emailInput, "Please enter valid email address", "email-error");
    }, 1000);

    const validated = emailValidation(emailInput.value.trim());
    clearError(validated, emailInput, "email-error");
  });
};
