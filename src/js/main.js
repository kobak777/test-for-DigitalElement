import "../styles/styles.scss";
import FormValidator from "./components/FormValidator";
import MobileMenu from "./components/MobileMenu";
import Modal from "./components/Modal";
import ScrollTopButton from "./components/ScrollTopButton";
import SmoothScroll from "./components/SmoothScroll";

document.addEventListener("DOMContentLoaded", () => {
  new MobileMenu(".header__menu", ".header__nav");

  const contactModal = new Modal("#contactModal");
  const successPopup = new Modal("#successPopup");

  const letsTalkButton = document.getElementById("letsTalkButton");
  if (letsTalkButton) {
    letsTalkButton.addEventListener("click", contactModal.open);
  }

  new FormValidator("#contactForm", {
    onSuccess: () => {
      contactModal.close();
      successPopup.open();
    },
  });

  new SmoothScroll('a[href^="#"]');
  new ScrollTopButton("#scrollTopBtn", ".hero");
});