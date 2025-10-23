/**
 * Валидация формы и отправка данных
 */
export default class FormValidator {

  constructor(formSelector, { onSuccess, onError } = {}) {
    this.form = document.querySelector(formSelector);
    if (!this.form) {
      return; 
    }

    this.onSuccess = onSuccess;
    this.onError = onError;
    this.submitButton = this.form.querySelector("#contactFormSubmit");
    this.handleSubmit = this.handleSubmit.bind(this);
    this.form.addEventListener("submit", this.handleSubmit);
  }

  validateInput(input) {
    const errorSpan = this.form.querySelector(`[data-error-for="${input.name}"]`);
    const value = input.value.trim();
    let isValid = true;

    if (!value) {
      this.showError(input, errorSpan, "This field is required");
      isValid = false;
    } else if (input.type === "email" && !this.isValidEmail(value)) {
      this.showError(input, errorSpan, "Enter a valid email");
      isValid = false;
    } else {
      this.clearError(input, errorSpan);
    }

    return isValid;
  }

  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showError(input, errorSpan, message) {
    input.classList.add("error");
    if (errorSpan) {
      errorSpan.textContent = message; 
    }
  }

  clearError(input, errorSpan) {
    input.classList.remove("error");
    if (errorSpan) {
      errorSpan.textContent = ""; 
    }
  }

  validateAllFields() {
    return Array.from(this.form.querySelectorAll("input, textarea"))
      .map((input) => this.validateInput(input))
      .every(Boolean);
  }

  async sendFormData(formData) {
    try {
      const dataObj = Object.fromEntries(formData.entries());
      dataObj.timestamp = new Date().toISOString();

      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataObj),
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`); 
      }

      await response.json();
      return true;
    } catch {
      return false;
    }
  }

  setButtonState(loading) {
    if (!this.submitButton) {
      return; 
    }
    this.submitButton.disabled = loading;
    this.submitButton.textContent = loading ? "Sending..." : "SUBMIT";
  }

  async handleSubmit(event) {
    event.preventDefault();

    const allFieldsValid = this.validateAllFields();
    if (!allFieldsValid) {
      return; 
    }

    this.setButtonState(true);

    const formData = new FormData(this.form);
    const sendSuccess = await this.sendFormData(formData);

    this.setButtonState(false);

    if (sendSuccess) {
      this.form.reset();
      if (typeof this.onSuccess === "function") {
        this.onSuccess();
      }
    } else {
      if (typeof this.onError === "function") {
        this.onError();
      }
    }
  }

}
