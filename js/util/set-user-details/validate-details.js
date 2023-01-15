import { characterValidation } from "../validation/character-validation.js";
import { emailValidation } from "../validation/email-validation.js";
import { displayError } from "../../components/text-error.js";

export const displayDetailsErrors = (objValidated) => {
  if (!objValidated.nameValidated) {
    displayError(
      objValidated.nameValidated,
      document.querySelector("#full-name"),
      "Please enter your full name",
      "name-error"
    );
  }
  if (!objValidated.emailValidated) {
    displayError(
      objValidated.emailValidated,
      document.querySelector("#email"),
      "Please enter valid email address",
      "email-error"
    );
  }
  if (!objValidated.addressOneValidated) {
    displayError(
      objValidated.addressOneValidated,
      document.querySelector("#address-one"),
      "Please enter your address",
      "address-one-error"
    );
  }
  if (!objValidated.zipValidated) {
    displayError(
      objValidated.zipValidated,
      document.querySelector("#zipcode"),
      "Please enter your zip code",
      "zip-error"
    );
  }
  if (!objValidated.cityValidated) {
    displayError(objValidated.cityValidated, document.querySelector("#city"), "Please enter your city", "city-error");
  }
  if (!objValidated.countryValidated) {
    displayError(
      objValidated.countryValidated,
      document.querySelector("#country"),
      "Please enter your country",
      "country-error"
    );
  }
};

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
