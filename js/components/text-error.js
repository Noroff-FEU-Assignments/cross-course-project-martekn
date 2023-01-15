import { createHTML } from "../util/createHTML.js";

export const textError = (elementId, element, message) => {
  element.classList.add("text-alert", "error");
  const alert = createHTML("div", ["alert", "error", "flex"], null, { id: elementId });
  const icon = createHTML("span", "material-symbols-outlined", "error", { "aria-hidden": "true" });
  const errorMessage = createHTML("span", "message", message);
  alert.append(icon, errorMessage);
  return alert;
};

export const displayError = (validated, element, errorMessage, id) => {
  const errorMessageElement = document.querySelector(`#${id}`);
  if (!validated && !errorMessageElement) {
    const error = textError(id, element, errorMessage);
    if (element.parentNode.classList.contains("input-container")) {
      element.parentNode.parentNode.insertBefore(error, element.parentNode.nextSibling);
    } else {
      element.parentNode.insertBefore(error, element.nextSibling);
    }
  }
};

export const clearError = (validated, element, id) => {
  const errorMessageElement = document.querySelector(`#${id}`);
  if (validated && errorMessageElement) {
    errorMessageElement.remove();
    element.classList.remove("text-alert", "error");
  }
};
