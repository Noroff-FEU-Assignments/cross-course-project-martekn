import { createHTML } from "../util/createHTML.js";
import { displayTextError, clearTextError } from "../components/error.js";
import { characterValidation, emailValidation, setupEmailEventListener } from "../util/validation.js";

const editButton = document.querySelector("#edit-details");
const detailsContainer = document.querySelector("#details-container");

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

const createEditDetails = (user) => {
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

const createShortDetails = (user) => {
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

/**
 * Validates a group of details
 * @param {Object} user
 * @returns Object with validation status for all and for individual parts
 */
export const validateDetails = (user) => {
  const fullName = characterValidation(user.fullName);
  const email = emailValidation(user.email);
  const addressOne = characterValidation(user.addressOne);
  const zip = characterValidation(user.zip);
  const city = characterValidation(user.city);
  const country = characterValidation(user.country);

  const detailsValidated = fullName && email && addressOne && zip && city && country;
  return {
    detailsValidated: detailsValidated,
    nameValidated: fullName,
    emailValidated: email,
    addressOneValidated: addressOne,
    zipValidated: zip,
    cityValidated: city,
    countryValidated: country,
  };
};

/**
 * Gets values from the inputs and updated the user Object
 * @param {Object} user
 */
export const updateUserFromInput = (user) => {
  user.fullName = document.querySelector("#full-name").value.trim();
  user.email = document.querySelector("#email").value.trim();
  user.addressOne = document.querySelector("#address-one").value.trim();
  user.addressTwo = document.querySelector("#address-two").value.trim();
  user.zip = document.querySelector("#zipcode").value.trim();
  user.city = document.querySelector("#city").value.trim();
  user.country = document.querySelector("#country").value.trim();
  localStorage.setItem("user", JSON.stringify(user));
};

/**
 * If inputs are valid it saves and shows the shorthand version, or it displays errors
 * @param {Object} user
 */
const saveUser = (user) => {
  updateUserFromInput(user);

  const validated = validateDetails(user);
  if (validated.detailsValidated) {
    document.querySelector("#details-content").remove();
    const element = createShortDetails(user);
    editButton.classList.remove("hide");
    detailsContainer.appendChild(element);
  } else {
    displayDetailsErrors(validated);
  }
};

/**
 * Creates fields for the user to edit their information
 * @param {Object} user
 */
const editUser = (user) => {
  const addressTwoElement = document.querySelector("#address-two");

  user.fullName = document.querySelector("#full-name").innerText;
  user.email = document.querySelector("#email").innerText;
  user.addressOne = document.querySelector("#address-one").innerText;
  user.addressTwo = addressTwoElement ? addressTwoElement.innerText : "";
  user.zip = document.querySelector("#zipcode").innerText.split(",").join("").trim();
  user.city = document.querySelector("#city").innerText;
  user.country = document.querySelector("#country").innerText;

  document.querySelector("#details-content").remove();
  const element = createEditDetails(user);
  editButton.classList.add("hide");
  detailsContainer.appendChild(element);
};

/**
 * Displays details error for all the input fields that isn't valid
 * @param {Object} objValidated
 */
export const displayDetailsErrors = (objValidated) => {
  if (!objValidated.nameValidated) {
    displayTextError(
      objValidated.nameValidated,
      document.querySelector("#full-name"),
      "Please enter your full name",
      "name-error"
    );
  }
  if (!objValidated.emailValidated) {
    displayTextError(
      objValidated.emailValidated,
      document.querySelector("#email"),
      "Please enter valid email address",
      "email-error"
    );
  }
  if (!objValidated.addressOneValidated) {
    displayTextError(
      objValidated.addressOneValidated,
      document.querySelector("#address-one"),
      "Please enter your address",
      "address-one-error"
    );
  }
  if (!objValidated.zipValidated) {
    displayTextError(
      objValidated.zipValidated,
      document.querySelector("#zipcode"),
      "Please enter your zip code",
      "zip-error"
    );
  }
  if (!objValidated.cityValidated) {
    displayTextError(
      objValidated.cityValidated,
      document.querySelector("#city"),
      "Please enter your city",
      "city-error"
    );
  }
  if (!objValidated.countryValidated) {
    displayTextError(
      objValidated.countryValidated,
      document.querySelector("#country"),
      "Please enter your country",
      "country-error"
    );
  }
};

/**
 * Checks if the user needs to add user info or not.
 * Displays correct version of the component.
 * Adds eventListener for button
 * @param {Object} user
 * @param {HTMLElement} container
 */
export const setupUserDetails = (user, container) => {
  const validated = validateDetails(user);
  const editButton = document.querySelector("#edit-details");

  editButton.addEventListener("click", (e) => {
    e.preventDefault();
    editUser(user);
  });
  let element;

  if (validated.detailsValidated) {
    element = createShortDetails(user);
    editButton.classList.remove("hide");
  } else {
    element = createEditDetails(user);
    editButton.classList.add("hide");
  }

  container.appendChild(element);
};
