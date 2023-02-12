import { createHTML } from "./createHTML.js";

const user = JSON.parse(localStorage.getItem("user"));
export const setupHistory = (type) => {
  const historyContainer = document.querySelector("#history-container");
  let ordersArray = [];
  let detailsUrl;
  if (type == "sale") {
    detailsUrl = "./sale-details.html";
    ordersArray = user.sale;
  } else {
    detailsUrl = "./purchase-details.html";
    ordersArray = user.purchase;
  }

  for (const order of ordersArray) {
    const tr = createHTML("tr");
    const date = createHTML("td", "date", order.date.split("-").join("/"));

    const orderNrContainer = createHTML("td", "order-number");
    const orderNr = createHTML("a", "link", order.order, { href: `${detailsUrl}?order=${order.order}` });
    orderNrContainer.appendChild(orderNr);

    const status = createHTML("td", "status", order.status);
    const products = createHTML("td");

    let productNames = [];
    let totalPrice = 0;
    if (type === "sale") {
      totalPrice = order.price.sellPrice;
      productNames.push(createHTML("span", null, order.name));
    } else {
      for (const game of order.games) {
        totalPrice += Number(game.price.purchasePrice);
        productNames.push(createHTML("span", null, game.name));
      }
    }

    const price = createHTML("td", "price", `$${totalPrice}`);
    for (const name of productNames) {
      products.appendChild(name);
    }

    tr.append(date, orderNrContainer, status, price, products);
    historyContainer.appendChild(tr);
  }
};
export const setupDetails = (type) => {
  const orderNr = new URLSearchParams(window.location.search).get("order");
  const productContainer = document.querySelector("#products-container");
  let returnUrl;
  let order;
  if (type === "sale") {
    order = user.sale.find((order) => order.order == orderNr);
    returnUrl = "./sale-history.html";
    const tr = createHTML("tr");
    const name = createHTML("td", null, order.name);
    const price = createHTML("td", null, `$${order.price.purchasePrice}`);
    tr.append(name, price);
    productContainer.appendChild(tr);
    document.querySelector("#percentage-cut").innerText = "15%";
    document.querySelector("#total").innerText = `$${order.price.sellPrice}`;
  } else {
    order = user.purchase.find((order) => order.order == orderNr);
    returnUrl = "./purchase-history.html";
    let sum = 0;
    let discount = 0;
    let total = 0;
    for (const game of order.games) {
      const tr = createHTML("tr");
      const name = createHTML("td", null, game.name);
      let price;
      sum += Number(game.price.originalPrice);
      total += Number(game.price.purchasePrice);
      discount = sum - total;
      if (game.price.purchasePrice === game.price.originalPrice) {
        price = createHTML("td", null, `$${game.price.purchasePrice}`);
      } else {
        price = createHTML("td");
        const originalPrice = createHTML("s", "fg-low-contrast", `$${game.price.originalPrice}`);
        const purchasePrice = createHTML("span", null, `$${game.price.purchasePrice}`);
        price.append(originalPrice, purchasePrice);
      }
      tr.append(name, price);
      productContainer.appendChild(tr);
    }
    document.querySelector("#sum").innerText = `$${sum}`;
    document.querySelector("#discount").innerText = `- $${discount}`;
    document.querySelector("#total").innerText = `$${total}`;
  }

  if (!orderNr) {
    location.href = returnUrl;
  }

  document.title = `Order: #${orderNr} | GameHub`;
  const metaDesc = document.querySelector("meta[name='description'");
  metaDesc.setAttribute("content", `Information regarding your order details for order #${orderNr}`);

  document.querySelector("#breadcrumbs-current").innerText = `Order: #${orderNr}`;
  document.querySelector("#order-number").innerText = orderNr;
  document.querySelector("#date").innerText = order.date.split("-").join("/");
  document.querySelector("#status").innerText = order.status;
};
