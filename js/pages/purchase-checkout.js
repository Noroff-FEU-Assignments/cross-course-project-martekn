import { setupCheckoutCart, cartArray, lsKey } from "../features/cart.js";
import { displayTextError, clearTextError } from "../components/error.js";
import {
  dateValidation,
  setupDateEventListener,
  digitValidation,
  setupDigitEventListener,
} from "../util/validation.js";
import { setupUserDetails, displayDetailsErrors, validateDetails, updateUserFromInput } from "../features/user.js";

const user = JSON.parse(localStorage.getItem("user"));
const detailsContainer = document.querySelector("#details-container");
const card = document.querySelector("#cardnr");
const dateSelector = document.querySelector("#date-selector");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const cvv = document.querySelector("#security-code");
const button = document.querySelector("#purchase-btn");
const auth = JSON.parse(localStorage.getItem("auth"));

if (cartArray.length === 0) {
  location.href = "./index.html";
}
if (auth === "true") {
  for (const product of cartArray) {
    for (const ownedGame of user.ownedGames) {
      if (product.productId === ownedGame.id) {
        location.href = "./shopping-cart.html";
      }
    }
  }
}

const submitForm = () => {
  if (document.querySelector("#save-button")) {
    updateUserFromInput(user);
  }

  const detailsValidationResults = validateDetails(user);
  const cardValidated = digitValidation(card.value.trim(), false, 16);
  const dateValidated = dateValidation(month.value, year.value);
  const cvvValidated = digitValidation(cvv.value.trim(), false, 3);

  if (detailsValidationResults.detailsValidated && cardValidated && dateValidated && cvvValidated) {
    const orderNr = new Date().valueOf();
    const newDate = new Date();
    const emptyCart = [];
    const today = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`;
    const gamesArray = cartArray.map((product) => {
      return {
        id: product.productId,
        name: product.title,
        price: {
          originalPrice: product.price.originalPrice,
          purchasePrice: product.price.currentPrice,
        },
      };
    });

    user.ownedGames.push(...gamesArray);

    user.purchase.push({ order: orderNr, status: "complete", date: today, games: gamesArray });

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem(lsKey, JSON.stringify(emptyCart));

    location.href = `./purchase-confirmation.html?order=${orderNr}`;
  } else {
    if (!cardValidated) {
      displayTextError(cardValidated, card, "Please enter valid card number with 16 digits", "card-error");
    }
    if (!dateValidated) {
      displayTextError(dateValidated, dateSelector, "This date has expired", "date-error");
    } else {
      clearTextError(dateValidated, dateSelector, "date-error");
    }
    if (!cvvValidated) {
      displayTextError(cvvValidated, cvv, "Enter the 3 digit code at the back of your card", "cvv-error");
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
