import { createHTML } from "../util/createHTML.js";
import { saveUser } from "../util/user-details.js";
import { displayTextError, clearTextError } from "./error.js";
import { characterValidation } from "../util/validation.js";
import { setupEmailEventListener } from "../util/validation.js";

const createLabelAndInput = (idName, label, data, parent, required, validationType, errorId, errorMessage) => {
  const labelElement = createHTML("label", null, label, { for: idName });
  const inputElement = createHTML("input", null, null, {
    type: "text",
    id: idName,
    value: data ? data : "",
    required: "true",
  });
  if (required === true) {
    inputElement.setAttribute("required", "true");
    labelElement.innerText = `${label} *`;
  }

  if (validationType === "character") {
    inputElement.addEventListener("focusout", (e) => {
      const validated = characterValidation(inputElement.value);
      displayTextError(validated, inputElement, errorMessage, errorId);
    });
    inputElement.addEventListener("input", (e) => {
      const validated = characterValidation(inputElement.value);
      if (validated && inputElement.classList.contains("error")) {
        clearTextError(validated, inputElement, errorId);
      }
    });
  }
  if (validationType === "email") {
    setupEmailEventListener(inputElement);
  }

  parent.append(labelElement, inputElement);
};

export const createEditDetails = (user) => {
  const element = createHTML("div", ["main", "flow-content", "flow-form"], null, { id: "details-content" });
  createLabelAndInput(
    "full-name",
    "Full name",
    user.fullName,
    element,
    true,
    "character",
    "name-error",
    "Please enter your full name"
  );
  createLabelAndInput("email", "Email", user.email, element, true, "email");
  createLabelAndInput(
    "address-one",
    "Address field 1",
    user.addressOne,
    element,
    true,
    "character",
    "address-one-error",
    "Please enter your address"
  );
  createLabelAndInput("address-two", "Address field 2", user.addressTwo, element, false);

  const wrapper = createHTML("div", ["form-section", "flow-content", "flow-form", "grid"]);
  const zipContainer = createHTML("div", ["section-group", "form-section", "flow-content", "flow-form"]);
  createLabelAndInput(
    "zipcode",
    "Zip code",
    user.zip,
    zipContainer,
    true,
    "character",
    "zip-error",
    "Please enter your zip code"
  );
  const cityContainer = createHTML("div", ["section-group", "form-section", "flow-content", "flow-form"]);
  createLabelAndInput(
    "city",
    "City",
    user.city,
    cityContainer,
    true,
    "character",
    "city-error",
    "Please enter your city"
  );
  wrapper.append(zipContainer, cityContainer);
  element.appendChild(wrapper);

  createLabelAndInput(
    "country",
    "Country",
    user.country,
    element,
    true,
    "character",
    "country-error",
    "Please enter your country"
  );

  const button = createHTML("button", "btn", "Save details", { id: "save-button" });

  element.appendChild(button);
  button.addEventListener("click", (e) => {
    saveUser(user);
  });
  return element;
};

export const createShortDetails = (user) => {
  const element = createHTML("div", ["main", "flow-content", "flow-form"], null, { id: "details-content" });
  const infoContainer = createHTML("div");
  const nameContainer = createHTML("div", "text-bold");
  const nameAria = createHTML("span", "visually-hidden", "Full name:");
  const name = createHTML("span", null, user.fullName, { id: "full-name" });
  nameContainer.append(nameAria, name);

  const emailContainer = createHTML("div");
  const emailAria = createHTML("span", "visually-hidden", "Email:");
  const email = createHTML("span", null, user.email, { id: "email" });
  emailContainer.append(emailAria, email);
  infoContainer.append(nameContainer, emailContainer);
  const addressContainer = createHTML("div", "address");
  const addressAria = createHTML("span", "visually-hidden", "Address:");
  const address = createHTML("div");
  addressContainer.append(addressAria, address);

  const addressOne = createHTML("div", null, user.addressOne, { id: "address-one" });

  const container = createHTML("div", null);
  const zip = createHTML("span", null, `${user.zip}, `, { id: "zipcode" });
  const city = createHTML("span", null, user.city, { id: "city" });
  container.append(zip, city);
  const country = createHTML("div", null, user.country, { id: "country" });

  if (user.addressTwo) {
    const addressTwo = createHTML("div", null, user.addressTwo, { id: "address-two" });
    address.append(addressOne, addressTwo, container, country);
  } else {
    address.append(addressOne, container, country);
  }
  element.append(infoContainer, addressContainer);
  return element;
};
