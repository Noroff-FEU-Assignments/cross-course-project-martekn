import { createHTML } from "../util/createHTML.js";

/**
 * Creates text based error message
 * @param {String} elementId
 * @param {HTMLElement} element - input
 * @param {String} message
 * @returns HTMLElement: error
 */
export const textError = (elementId, element, message) => {
  element.classList.add("text-alert", "error");
  const alert = createHTML("div", ["alert", "error", "flex"], null, { id: elementId });
  const icon = createHTML("span", "material-symbols-outlined", "error", { "aria-hidden": "true" });
  const errorMessage = createHTML("span", "message", message);
  alert.append(icon, errorMessage);
  return alert;
};

/**
 * Displays text error message if validation is false and there is no error displayed
 * @param {Boolean} validated
 * @param {HTMLElement} element - input
 * @param {String} errorMessage
 * @param {String} id - id of error element
 */
export const displayTextError = (validated, element, errorMessage, id) => {
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

/**
 * Removes text error if it exists and the input is validated
 * @param {Boolean} validated
 * @param {HTMLElement} element - input element
 * @param {String} id - the id of the error element
 */
export const clearTextError = (validated, element, id) => {
  const errorMessageElement = document.querySelector(`#${id}`);
  if (validated && errorMessageElement) {
    errorMessageElement.remove();
    element.classList.remove("text-alert", "error");
  }
};

/**
 * Creates error message with box styling
 * @param {String} errorMessage
 * @param {String} errorType
 * @returns HTMLElement: error
 */
export const createBoxError = (errorMessage, errorType) => {
  const error = createHTML("div", ["alert-dialog", "container", errorType, "flex"]);
  let errorIcon = "error";
  if (errorType === "warning") {
    errorIcon = "warning";
  }

  const icon = createHTML("span", ["material-symbols-outlined", "icon"], errorIcon, { "aria-hidden": "true" });
  const message = createHTML("span", "message", errorMessage);
  error.append(icon, message);
  return error;
};
