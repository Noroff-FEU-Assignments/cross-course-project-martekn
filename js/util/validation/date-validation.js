import { clearError } from "../../components/text-error.js";
export const dateValidation = (monthValue, yearValue) => {
  const thisMonth = new Date().getMonth() + 1;
  const thisMonthPad = thisMonth.toString();
  const thisYear = new Date().getFullYear().toString().slice(-2);

  if (yearValue > thisYear) {
    return true;
  } else if (yearValue === thisYear && monthValue > thisMonthPad) {
    return true;
  } else {
    return false;
  }
};

export const setupDateEventListener = (parent, select, month, year, id) => {
  select.addEventListener("change", (e) => {
    const validated = dateValidation(month.value, year.value);
    if (validated) {
      clearError(validated, parent, id);
    }
  });
  select.addEventListener("click", (e) => {
    select.classList.remove("placeholder");
  });
};
