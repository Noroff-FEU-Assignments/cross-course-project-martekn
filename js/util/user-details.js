import { createEditDetails, createShortDetails } from "../components/user-component.js";
import { characterValidation, emailValidation } from "./validation.js";
import { displayTextError } from "../components/error.js";

const editButton = document.querySelector("#edit-details");
const detailsContainer = document.querySelector("#details-container");

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
 * @param {Event} e
 * @param {Object} user
 */
export const saveUser = (user) => {
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
export const editUser = (user) => {
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
