import { setupCheckoutCart } from "../features/cart.js";
import { displayError, clearError } from "../components/text-error.js";
import { dateValidation, setupDateEventListener } from "../util/validation/date-validation.js";
import { setupDigitEventListener, digitValidation } from "../util/validation/digit-validation.js";
import { setupUserDetails } from "../util/set-user-details/setupUserDetails.js";
import { displayDetailsErrors, validateDetails } from "../util/set-user-details/validate-details.js";
import { users } from "../../data/users.js";
import { updateUserFromInput } from "../util/set-user-details/updateUser.js";

const detailsContainer = document.querySelector("#details-container");
const userId = 1;
const user = users.find((users) => users.id === userId);

const card = document.querySelector("#cardnr");
const dateSelector = document.querySelector("#date-selector");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const cvv = document.querySelector("#security-code");
const button = document.querySelector("#purchase-btn");

const submitForm = () => {
  if (document.querySelector("#save-button")) {
    updateUserFromInput(user);
  }

  const detailsValidationResults = validateDetails(user);

  const cardValidated = digitValidation(card.value.trim(), false, 16);
  const dateValidated = dateValidation(month.value, year.value);
  const cvvValidated = digitValidation(cvv.value.trim(), false, 3);
  if (detailsValidationResults.detailsValidated && cardValidated && dateValidated && cvvValidated) {
    location.href = "./purchase-confirmation.html";
  } else {
    if (!cardValidated) {
      displayError(cardValidated, card, "Please enter valid card number with 16 digits", "card-error");
    }
    if (!dateValidated) {
      displayError(dateValidated, dateSelector, "This date has expired", "date-error");
    } else {
      clearError(dateValidated, dateSelector, "date-error");
    }
    if (!cvvValidated) {
      displayError(cvvValidated, cvv, "Enter the 3 digit code at the back of your card", "cvv-error");
    }
    displayDetailsErrors(detailsValidationResults);
  }
};

export const setupPurchaseCheckout = () => {
  setupCheckoutCart();
  setupUserDetails(user, detailsContainer);
  setupDigitEventListener(card, "Please enter valid card number with 16 digits", "card-error", false, 16);
  setupDateEventListener(dateSelector, month, month, year, "date-error");
  setupDateEventListener(dateSelector, year, month, year, "date-error");
  setupDigitEventListener(cvv, "Enter the 3 digit code at the back of your card", "cvv-error", false, 3);

  button.addEventListener("click", (e) => {
    e.preventDefault();

    submitForm();
  });
};
