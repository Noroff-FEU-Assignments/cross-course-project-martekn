import { createHTML } from "../createHTML.js";
import { characterValidation } from "./character-validation.js";

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

export const setupPasswordEventListener = (passwordInput) => {
  passwordInput.addEventListener("focusout", (e) => {
    hideShowPasswordError(passwordInput);
  });
  passwordInput.addEventListener("input", (e) => {
    hideShowPasswordError(passwordInput);
  });
};
