import { validateDetails } from "./validate-details.js";
import { createEditDetails, createShortDetails } from "../../components/user-component.js";
import { editUser } from "./updateUser.js";

export const setupUserDetails = (user, container) => {
  const validated = validateDetails(user);
  const editButton = document.querySelector("#edit-details");

  editButton.addEventListener("click", (e) => {
    editUser(e, user);
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
