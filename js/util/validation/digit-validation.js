import { displayError, clearError } from "../../components/text-error.js";

export const digitValidation = (value, isMinimumValue, amountOfDigits) => {
  let regexPattern;
  if (isMinimumValue) {
    regexPattern = new RegExp(`.\{${amountOfDigits}\}`);
  } else {
    regexPattern = new RegExp(`^.\{${amountOfDigits}\}$`);
  }

  const validated = regexPattern.test(value);
  return validated;
};

export const setupDigitEventListener = (input, errorMessage, id, isMinimumAmount, amountOfDigits) => {
  let timeout;

  input.addEventListener("focusout", function (e) {
    const validated = digitValidation(input.value.trim(), isMinimumAmount, amountOfDigits);
    displayError(validated, input, errorMessage, id);
  });

  input.addEventListener("input", function (e) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = 0;
    }

    timeout = setTimeout(() => {
      const validated = digitValidation(input.value.trim(), isMinimumAmount, amountOfDigits);
      displayError(validated, input, errorMessage, id);
    }, 1000);

    const validated = digitValidation(input.value.trim(), isMinimumAmount, amountOfDigits);
    clearError(validated, input, id);
  });
};
