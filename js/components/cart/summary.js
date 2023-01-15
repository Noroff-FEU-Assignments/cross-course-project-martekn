import { createHTML } from "../../util/createHTML.js";
import { getSummaryPrices } from "../../features/cart.js";

export const createSummary = () => {
  const prices = getSummaryPrices();
  const summary = createHTML(
    "div",
    ["summary", "flow-content", "flow-form", "bg-card", "rounded-corners", "shadow"],
    null,
    {
      id: "summary-container",
    }
  );
  const main = createHTML("div", ["main", "flow-content", "flow-form"]);

  const dl = createHTML("dl", "grid");
  const sumTitle = createHTML("dt", null, "Price");
  const sumContent = createHTML("dd", null, `$${prices.price}`, { id: "summary-price" });
  const discountTitle = createHTML("dt", null, "Discount");
  const discountContent = createHTML("dd", null, `-$${prices.discountedPrice}`, { id: "summary-discount" });
  const totalTitle = createHTML("dt", null, "Total");
  const totalContent = createHTML("dd", null, `$${prices.totalPrice}`, { id: "summary-total" });

  const buttonContainer = createHTML("div", "flow-content");
  const button = createHTML("a", "btn", "Go to checkout", { href: "./purchase-checkout.html" });
  buttonContainer.appendChild(button);

  dl.append(sumTitle, sumContent, discountTitle, discountContent, totalTitle, totalContent);
  main.append(dl, buttonContainer);
  summary.appendChild(main);
  return summary;
};
