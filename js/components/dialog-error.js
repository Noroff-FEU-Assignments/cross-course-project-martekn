import { createHTML } from "../util/createHTML.js";

export const createErrorDialog = (errorMessage, errorType) => {
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
