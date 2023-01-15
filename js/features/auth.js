// This is just to mimic the idea of a proper login / account system
export const passwordVisibilityToggle = (input) => {
  const inputId = input.getAttribute("id");
  const button = document.querySelector(`#${inputId} + button`);
  button.addEventListener("click", function (e) {
    e.preventDefault();
    const visibilityStatus = button.getAttribute("data-visible");
    if (visibilityStatus === "false") {
      input.setAttribute("type", "text");
      button.setAttribute("data-visible", "true");
      this.children[0].innerText = "visibility_off";
    } else {
      input.setAttribute("type", "password");
      button.setAttribute("data-visible", "false");
      this.children[0].innerText = "visibility";
    }
  });
};

export const login = (button) => {
  const from = new URLSearchParams(window.location.search).get("from");
  const previousPage = Boolean(from);
  button.addEventListener("click", (e) => {
    localStorage.setItem("auth", JSON.stringify("true"));

    if (previousPage) {
      location.href = `./${from}`;
    } else {
      location.href = "./index.html";
    }
  });
};

export const logout = (button) => {
  button.addEventListener("click", (e) => {
    localStorage.setItem("auth", JSON.stringify("false"));
    location.href = "./index.html";
  });
};

const isLoggedIn = () => {
  const authStatus = JSON.parse(localStorage.getItem("auth"));
  const url = location.href.split("/");
  const page = url[url.length - 1];
  if (authStatus === "true") {
    const authPages = ["auth-login.html", "auth-signup.html", "auth-forgot.html"];

    if (authPages.includes(page)) {
      location.href = "./account.html";
    }
  } else {
    const accountPages = [
      "account.html",
      "account-settings.html",
      "library.html",
      "purchase-history.html",
      "sale-history.html",
      "purchase-checkout.html",
      "sale-checkout.html",
      "purchase-details.html",
      "sale-details.html",
      "sale-checkout.html",
    ];
    if (accountPages.includes(page)) {
      location.href = `./auth-login.html?from=${page}`;
    }
  }
};

export const setupAuth = () => {
  isLoggedIn();
  const authLink = document.querySelector("#auth");
  const authIcon = document.querySelector("#auth-icon");
  const authText = document.querySelector("#auth-text");

  const authStatus = JSON.parse(localStorage.getItem("auth"));
  if (authLink) {
    if (authStatus === "true") {
      authLink.setAttribute("href", "./account.html");
      authIcon.innerText = "person";
      authText.innerText = "Account";
    } else {
      authLink.setAttribute("href", "./auth-login.html");
      authIcon.innerText = "login";
      authText.innerText = "log in";
    }
  }
};
