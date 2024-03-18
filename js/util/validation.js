import { displayTextError, clearTextError } from "../components/error.js";
import { createHTML } from "./createHTML.js";

/**
 * Checks if characters is equal to or more than amountOfChar
 * @param {String} value
 * @param {Number} [amountOfChar]
 * @returns Boolean
 */
export const characterValidation = (value, amountOfChar = 1) => value.length >= amountOfChar;

/**
 * Checks if month and year is in the future
 * @param {*} monthValue
 * @param {*} yearValue
 * @returns Boolean
 */
export const dateValidation = (monthValue, yearValue) => {
  monthValue = Number(monthValue);
  yearValue = Number(yearValue);
  const thisMonth = new Date().getMonth() + 1;
  const thisYear = Number(new Date().getFullYear().toString().slice(-2));
  if (yearValue > thisYear) {
    return true;
  } else if (yearValue === thisYear && monthValue > thisMonth) {
    return true;
  } else {
    return false;
  }
};

/**
 * Sets the event listeners for the date selector
 * @param {HTMLElement} parent
 * @param {HTMLElement} select
 * @param {HTMLElement} month
 * @param {HTMLElement} year
 * @param {String} id - Wanted id for the error message
 */
export const setupDateEventListener = (parent, select, month, year, id) => {
  select.addEventListener("change", (e) => {
    const validated = dateValidation(month.value, year.value);
    if (validated) {
      clearTextError(validated, parent, id);
    }
  });
  select.addEventListener("click", (e) => {
    select.classList.remove("placeholder");
  });
};

/**
 * Checks if the amount of numbers contains the correct amount of digits. Either equal to amountOfDigits if isMinimumValue is true, or atleast equal or above amountOfDigits if isMinimumValue is false
 * @param {String} value
 * @param {Boolean} isMinimumValue
 * @param {Number} amountOfDigits
 * @returns Boolean
 */
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

/**
 * Sets up event listeners for the digit validation to the added input.
 * @param {HTMLElement} input
 * @param {String} errorMessage
 * @param {String} id
 * @param {Boolean} isMinimumAmount
 * @param {Number} amountOfDigits
 */
export const setupDigitEventListener = (input, errorMessage, id, isMinimumAmount, amountOfDigits) => {
  let timeout;

  input.addEventListener("focusout", function (e) {
    const validated = digitValidation(input.value.trim(), isMinimumAmount, amountOfDigits);
    displayTextError(validated, input, errorMessage, id);
  });

  input.addEventListener("input", function (e) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = 0;
    }

    timeout = setTimeout(() => {
      const validated = digitValidation(input.value.trim(), isMinimumAmount, amountOfDigits);
      displayTextError(validated, input, errorMessage, id);
    }, 1000);

    const validated = digitValidation(input.value.trim(), isMinimumAmount, amountOfDigits);
    clearTextError(validated, input, id);
  });
};

/**
 * Validates the email based on regex pattern
 * @param {String} email
 * @returns Boolean
 */
export const emailValidation = (email) => {
  const regexPattern = /\S+\@\S+\.\S+/;
  const validated = regexPattern.test(email);
  return validated;
};

/**
 * Sets up event listeners for the email input element.
 * @param {HTMLElement} emailInput
 */
export const setupEmailEventListener = (emailInput) => {
  let timeout;

  emailInput.addEventListener("focusout", function (e) {
    const validated = emailValidation(emailInput.value.trim());
    displayTextError(validated, emailInput, "Please enter valid email address", "email-error");
  });

  emailInput.addEventListener("input", function (e) {
    if (timeout) {
      clearTimeout(timeout);
      timeout = 0;
    }

    timeout = setTimeout(() => {
      const validated = emailValidation(emailInput.value.trim());
      displayTextError(validated, emailInput, "Please enter valid email address", "email-error");
    }, 1000);

    const validated = emailValidation(emailInput.value.trim());
    clearTextError(validated, emailInput, "email-error");
  });
};

/**
 * Validates password and returns an object with properties for each validation check and its boolean status.
 * @param {String} password
 * @returns Object
 */
export const passwordValidation = (password) => {
  const upperCaseRegex = /[A-Z]/;
  const lowerCaseRegex = /[a-z]/;
  const numberRegex = /\d/;

  const lengthValidated = characterValidation(password, 6);
  const caseValidated = upperCaseRegex.test(password) && lowerCaseRegex.test(password);
  const numberValidated = numberRegex.test(password);

  let validated = lengthValidated && caseValidated && numberValidated;

  return {
    isPasswordValid: validated,
    isLengthValidated: lengthValidated,
    isCaseValidated: caseValidated,
    isNumberValidated: numberValidated,
  };
};

/**
 * Creates password validation item to put inside list.
 * @param {Boolean} boolean
 * @param {String} listId
 * @param {String} message
 * @returns HTMLElement
 */
const createPasswordListItem = (boolean, listId, message) => {
  const item = createHTML("li", "flex");
  item.setAttribute("id", listId);
  const icon = createHTML("span", "material-symbols-outlined", null, { "aria-hidden": "true" });
  const text = createHTML("span", null, message);
  if (boolean) {
    item.classList.add("success");
    icon.innerText = "done";
  } else {
    item.classList.add("error");
    icon.innerText = "close";
  }

  item.append(icon, text);
  return item;
};

/**
 * Updates the li with the id based on password validation
 * @param {Boolean} status
 * @param {String} id
 */
const updateListStatus = (status, id) => {
  const item = document.querySelector(`#${id}`);
  if (status) {
    item.classList.add("success");
    item.classList.remove("error");
    item.children[0].innerText = "done";
  } else {
    item.classList.add("error");
    item.classList.remove("success");
    item.children[0].innerText = "close";
  }
};

/**
 * Creates and return the password error element with the validation of each type
 * @param {Boolean} lengthBoolean
 * @param {Boolean} caseBoolean
 * @param {Boolean} numberBoolean
 * @returns HTMLElement
 */
const passwordError = (lengthBoolean, caseBoolean, numberBoolean) => {
  const error = createHTML("div", ["alert", "error", "flex"], null, { id: "password-error" });
  const icon = createHTML("span", "material-symbols-outlined", "error", { "aria-hidden": "true" });
  const textContainer = createHTML("div", "message");
  const title = createHTML("span", "title", "Your password has to");
  const ul = createHTML("ul");
  const item1 = createPasswordListItem(lengthBoolean, "length-validation", "be at least 6 characters long.");
  const item2 = createPasswordListItem(caseBoolean, "case-validation", "include lower and upper case characters.");
  const item3 = createPasswordListItem(numberBoolean, "number-validation", "include at least one number.");

  ul.append(item1, item2, item3);
  textContainer.append(title, ul);
  error.append(icon, textContainer);
  return error;
};

/**
 * Hides and displays the password error depending on validation status
 * @param {HTMLElement} input
 */
export const hideShowPasswordError = (input) => {
  const validated = passwordValidation(input.value.trim());

  const errorMessageElement = document.querySelector("#password-error");

  if (!validated.isPasswordValid && !errorMessageElement) {
    input.classList.add("text-alert", "error");
    const error = passwordError(validated.isLengthValidated, validated.isCaseValidated, validated.isNumberValidated);
    input.parentNode.parentNode.insertBefore(error, input.parentNode.nextSibling);
  }
  if (errorMessageElement) {
    updateListStatus(validated.isLengthValidated, "length-validation");
    updateListStatus(validated.isCaseValidated, "case-validation");
    updateListStatus(validated.isNumberValidated, "number-validation");
  }

  if (validated.isPasswordValid && errorMessageElement) {
    input.classList.remove("text-alert", "error");
    errorMessageElement.remove();
  }
};

/**
 * Sets event listeners for the password input
 * @param {HTMLElement} passwordInput
 */
export const setupPasswordEventListener = (passwordInput) => {
  passwordInput.addEventListener("focusout", (e) => {
    hideShowPasswordError(passwordInput);
  });
  passwordInput.addEventListener("input", (e) => {
    hideShowPasswordError(passwordInput);
  });
};
