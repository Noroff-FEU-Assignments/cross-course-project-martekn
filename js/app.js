import { setupTheme } from "./features/theme.js";
import { setupMobileNav } from "./features/mobile-nav.js";
import { setupAuth } from "./features/auth.js";
import { setupGameSearch } from "./features/search.js";
import { setCartCounter } from "./features/cart.js";
import { user } from "../data/user.js";

if (!JSON.parse(localStorage.getItem("user"))) {
  localStorage.setItem("user", JSON.stringify(user));
}

setupMobileNav();
setupTheme();
setupAuth();
setupGameSearch();
setCartCounter();
