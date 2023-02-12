import { setupUserDetails, displayDetailsErrors, validateDetails, updateUserFromInput } from "../util/user-details.js";
import { displayTextError } from "../components/error.js";
import { setupDigitEventListener, digitValidation } from "../util/validation.js";

const id = new URLSearchParams(window.location.search).get("id");
const detailsContainer = document.querySelector("#details-container");
const user = JSON.parse(localStorage.getItem("user"));
const game = user.ownedGames.find((game) => game.id == id);

if (game === undefined) {
  location.href = "./library.html";
}

document.querySelector("#title").innerText = `Sell ${game.name}`;
document.querySelector("#game-name").innerText = game.name;
document.querySelector("#purchase-price").innerText = `$${game.price.purchasePrice}`;
const saleCut = 15;
document.querySelector("#sale-cut").innerText = `%${saleCut}`;
document.querySelector("#users-cut").innerText = `$${((game.price.purchasePrice / 100) * saleCut).toFixed(2)}`;
const accountnr = document.querySelector("#accountnr");
const button = document.querySelector("#sell-btn");

const submitForm = () => {
  if (document.querySelector("#save-button")) {
    updateUserFromInput(user);
  }

  const detailsValidationResults = validateDetails(user);
  const accountnrValidated = digitValidation(accountnr.value.trim(), true, 5);

  if (detailsValidationResults.detailsValidated && accountnrValidated) {
    const newDate = new Date();
    const today = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`;

    const orderNr = new Date().valueOf();
    const order = {
      order: orderNr,
      status: "complete",
      date: today,
      id: game.id,
      name: game.name,
      price: {
        purchasePrice: game.price.originalPrice,
        sellPrice: game.price.purchasePrice,
      },
    };

    user.sale.push(order);
    user.ownedGames = user.ownedGames.filter((game) => game.id != id);
    localStorage.setItem("user", JSON.stringify(user));
    location.href = `./sale-confirmation.html?order=${orderNr}`;
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
