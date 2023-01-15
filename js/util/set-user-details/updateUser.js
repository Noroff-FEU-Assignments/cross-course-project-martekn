import { validateDetails } from "./validate-details.js";
import { createShortDetails, createEditDetails } from "../../components/user-component.js";
import { displayDetailsErrors } from "./validate-details.js";

const editButton = document.querySelector("#edit-details");
const detailsContainer = document.querySelector("#details-container");

export const updateUserFromInput = (user) => {
  user.fullName = document.querySelector("#full-name").value.trim();
  user.email = document.querySelector("#email").value.trim();
  user.addressOne = document.querySelector("#address-one").value.trim();
  user.addressTwo = document.querySelector("#address-two").value.trim();
  user.zip = document.querySelector("#zipcode").value.trim();
  user.city = document.querySelector("#city").value.trim();
  user.country = document.querySelector("#country").value.trim();
};
export const saveUser = (e, user) => {
  e.preventDefault();
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

export const editUser = (e, user) => {
  e.preventDefault();
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
