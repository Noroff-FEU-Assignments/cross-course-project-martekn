import { setupDigitEventListener, digitValidation } from "../util/validation/digit-validation.js";
import { setupUserDetails } from "../util/set-user-details/setupUserDetails.js";
import { displayDetailsErrors, validateDetails } from "../util/set-user-details/validate-details.js";
import { users } from "../../data/users.js";
import { updateUserFromInput } from "../util/set-user-details/updateUser.js";
import { displayError } from "../components/text-error.js";

const detailsContainer = document.querySelector("#details-container");
const userId = 1;
const user = users.find((users) => users.id === userId);

const accountnr = document.querySelector("#accountnr");
const button = document.querySelector("#sell-btn");

const submitForm = () => {
  if (document.querySelector("#save-button")) {
    updateUserFromInput(user);
  }

  const detailsValidationResults = validateDetails(user);
  const accountnrValidated = digitValidation(accountnr.value.trim(), false, 5);

  if (detailsValidationResults.detailsValidated && accountnrValidated) {
    location.href = "./sale-confirmation.html";
  } else {
    if (!accountnrValidated) {
      displayError(accountnrValidated, accountnr, "Please enter account number, minimum 5 digits", "accountnr-error");
    }
    displayDetailsErrors(detailsValidationResults);
  }
};

export const setupSaleCheckout = () => {
  setupUserDetails(user, detailsContainer);
  setupDigitEventListener(accountnr, "Please enter your account number, minimum 5 digits", "accountnr-error", true, 5);

  button.addEventListener("click", (e) => {
    e.preventDefault();

    submitForm();
  });
};
