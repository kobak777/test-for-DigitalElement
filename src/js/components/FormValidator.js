/**
 * Валидация формы
 */
export default class FormValidator {

  constructor(formSelector, { onSuccess } = {}) {
    this.form = document.querySelector(formSelector);
    if (!this.form) {
      return; 
    }

    this.onSuccess = onSuccess;
    this.submitButton = this.form.querySelector(".contact-form__submit");
    this.handleSubmit = this.handleSubmit.bind(this);
    this.form.addEventListener("submit", this.handleSubmit);
  }

  validateInput(input) {
    const errorSpan = input.nextElementSibling;
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
    const inputs = this.form.querySelectorAll("input, textarea");
    let allValid = true;

    inputs.forEach((input) => {
      const isValid = this.validateInput(input);
      if (!isValid) {
        allValid = false; 
      }
    });

    return allValid;
  }

  async sendFormData(formData) {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.get("fullName"),
          email: formData.get("email"),
          message: formData.get("message"),
          timestamp: new Date().toISOString(),
        }),
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

    if (sendSuccess && typeof this.onSuccess === "function") {
      this.form.reset();
      this.onSuccess();
    }
  }

}