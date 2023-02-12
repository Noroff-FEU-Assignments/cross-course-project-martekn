const order = new URLSearchParams(window.location.search).get("order");
const orderTag = document.querySelector("#order-number");
export const setupConfirmationLink = (type) => {
  let link;
  if (type === "sale") {
    link = `./sale-details.html?order=${order}`;
  } else {
    link = `./purchase-details.html?order=${order}`;
  }
  orderTag.setAttribute("href", link);
  orderTag.innerText = order;
};
