/**
 * Pop up для отображения результата отправки формы
 */
export default class StatusPopup {

  constructor(selector) {
    this.popup = document.querySelector(selector);
    if (!this.popup) {
      return; 
    }

    this.overlay = this.popup.querySelector("[data-status-overlay]");
    this.closeButton = this.popup.querySelector("[data-status-close]");
    this.messageElement = this.popup.querySelector("[data-status-message]");
    this.iconElement = this.popup.querySelector("[data-status-icon]");

    this.bindEvents();
  }

  bindEvents() {
    if (this.overlay) {
      this.overlay.addEventListener("click", () => this.close());
    }

    if (this.closeButton) {
      this.closeButton.addEventListener("click", (e) => {
        e.stopPropagation();
        this.close();
      });
    }
  }

  setMessage(message = "", type = "success") {
    if (!this.popup || !this.messageElement || !this.iconElement) {
      return; 
    }

    this.messageElement.textContent = message;
    this.popup.classList.toggle("status-popup--error", type === "error");

    this.iconElement.textContent = type === "error" ? "✕" : "✓";
  }

  open({ message = "", type = "success" }) {
    this.setMessage(message, type);

    this.scrollPosition = window.scrollY || window.pageYOffset;
    document.body.style.position = "fixed";
    document.body.style.top = `-${this.scrollPosition}px`;
    document.body.style.width = "100%";

    this.popup.classList.add("active");
    this.popup.setAttribute("aria-hidden", "false");
  }

  close() {
    this.popup.classList.remove("active");
    this.popup.setAttribute("aria-hidden", "true");

    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, this.scrollPosition);
  }

}
