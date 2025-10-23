import "../styles/styles.scss";
import FormValidator from "./components/FormValidator";
import MobileMenu from "./components/MobileMenu";
import Modal from "./components/Modal";
import ScrollTopButton from "./components/ScrollTopButton";
import SmoothScroll from "./components/SmoothScroll";
import StatusPopup from "./components/StatusPopup";

import.meta.glob("../styles/blocks/*.scss", { eager: true });

document.addEventListener("DOMContentLoaded", () => {
  new MobileMenu("#headerMenuBtn", "#headerNav");

  const contactModal = new Modal("#contactModal", {
    onClose: () => {
      const forms = document.querySelectorAll("#contactModal form");
      forms.forEach((form) => {
        form.reset();
        form.querySelectorAll(".error").forEach((input) => input.classList.remove("error"));
        form.querySelectorAll("[data-error-for]").forEach((span) => (span.textContent = ""));
      });
    },
  });

  const statusPopup = new StatusPopup("#statusPopup");

  const letsTalkButton = document.getElementById("letsTalkButton");
  if (letsTalkButton) {
    letsTalkButton.addEventListener("click", contactModal.open);
  }

  new FormValidator("#contactForm", {
    onSuccess: () => {
      contactModal.close();
      statusPopup.open({
        message: "Your message successfully sent",
        type: "success",
      });
    },
    onError: () => {
      contactModal.close();
      statusPopup.open({
        message: "Something went wrong. Please try again later.",
        type: "error",
      });
    },
  });

  new SmoothScroll('a[href^="#"]');
  new ScrollTopButton("#scrollTopBtn", "[data-scroll-trigger]");
});
