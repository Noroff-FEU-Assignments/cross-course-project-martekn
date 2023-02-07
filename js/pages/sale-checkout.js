import { setupUserDetails, displayDetailsErrors, validateDetails, updateUserFromInput } from "../util/user-details.js";
import { users } from "../../data/users.js";
import { displayTextError } from "../components/error.js";
import { setupDigitEventListener, digitValidation } from "../util/validation.js";

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
      displayTextError(
        accountnrValidated,
        accountnr,
        "Please enter account number, minimum 5 digits",
        "accountnr-error"
      );
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
