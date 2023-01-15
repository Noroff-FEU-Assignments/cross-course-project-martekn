const mobileScreenSize = window.matchMedia("(max-width: 50em)");
const navElements = "#mobile-close, #primary-navigation a";
const nav = document.querySelector("#primary-navigation-wrapper");
const mobileOpenNav = document.querySelector("#mobile-hamburger");
const mobileCloseNav = document.querySelector("#mobile-close");
let navContent;
let firstNavElement;
let lastNavElement;

if (nav) {
  navContent = nav.querySelectorAll(navElements);
  firstNavElement = navContent[0];
  lastNavElement = navContent[navContent.length - 1];
}

const setNavTrapFocus = (e) => {
  const tabPressed = e.key === "Tab";

  if (e.key === "Shift" || e.key === "Enter") {
    return;
  }

  if (e.shiftKey && tabPressed) {
    if (document.activeElement === firstNavElement) {
      lastNavElement.focus();
      e.preventDefault();
    }
  } else if (tabPressed) {
    if (document.activeElement === lastNavElement) {
      firstNavElement.focus();
      e.preventDefault();
    }
  } else {
    closeNav(mobileCloseNav, mobileOpenNav);
  }
};

const openNav = () => {
  nav.setAttribute("data-visible", true);
  mobileOpenNav.setAttribute("aria-expanded", true);
  mobileCloseNav.setAttribute("aria-expanded", true);
  document.body.classList.add("mobile-modal-open");

  firstNavElement.focus();
  document.addEventListener("keydown", setNavTrapFocus);
};

const closeNav = () => {
  nav.setAttribute("data-visible", false);
  mobileCloseNav.setAttribute("aria-expanded", false);
  mobileOpenNav.setAttribute("aria-expanded", false);
  document.body.classList.remove("mobile-modal-open");
  mobileOpenNav.focus();
  document.removeEventListener("keydown", setNavTrapFocus);
};

export const setupMobileNav = () => {
  if (!mobileScreenSize.matches) {
    document.removeEventListener("keydown", setNavTrapFocus);
  }

  mobileScreenSize.addEventListener("change", (e) => {
    if (!mobileScreenSize.matches) {
      document.removeEventListener("keydown", setNavTrapFocus);
    }
  });

  if (mobileOpenNav) {
    mobileOpenNav.addEventListener("click", (e) => {
      openNav();
    });
  }

  if (mobileCloseNav) {
    mobileCloseNav.addEventListener("click", (e) => {
      closeNav();
    });
  }

  if (nav) {
    document.addEventListener("click", (e) => {
      if (
        nav.getAttribute("data-visible") === "true" &&
        e.target.closest("nav") !== nav &&
        e.target.closest("button") !== mobileOpenNav
      ) {
        closeNav();
      }
    });
  }
};
