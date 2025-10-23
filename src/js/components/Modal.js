/**
 * Модальное окно
 */
export default class Modal {

  constructor(modalSelector, { onClose } = {}) {
    this.modal = document.querySelector(modalSelector);
    this.onClose = onClose;

    if (!this.modal) {
      return;
    }

    this.scrollPosition = 0;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.modal
      .querySelectorAll("[data-modal-close], [data-modal-overlay], [data-success-close], [data-success-overlay]")
      .forEach((el) => el.addEventListener("click", this.close));


    this.modal.setAttribute("inert", "");
    this.modal.setAttribute("aria-hidden", "true");
  }

  open() {
    this.scrollPosition = window.scrollY || window.pageYOffset;

    document.body.style.position = "fixed";
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.width = "100%";

    this.modal.classList.add("active");
    this.modal.removeAttribute("inert");
    this.modal.setAttribute("aria-hidden", "false");

    const focusable = this.modal.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable) {
      focusable.focus(); 
    }
  }

  close() {
    const activeElem = document.activeElement;
    if (this.modal.contains(activeElem)) {
      activeElem.blur();
    }

    this.modal.classList.remove("active");
    this.modal.setAttribute("aria-hidden", "true");
    this.modal.setAttribute("inert", "");

    if (typeof this.onClose === "function") {
      this.onClose();
    }

    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, this.scrollPosition);
  }

}
