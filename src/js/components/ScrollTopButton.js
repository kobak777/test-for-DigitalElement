/**
 * Логика для стрелки прокрутки
 */
export default class ScrollTopButton {

  constructor(buttonSelector, triggerSelector) {
    this.button = document.querySelector(buttonSelector);
    this.trigger = document.querySelector(triggerSelector);

    if (!this.button || !this.trigger) {
      return; 
    }

    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);

    window.addEventListener("scroll", this.toggleVisibility);
    this.button.addEventListener("click", this.scrollToTop);
  }

  toggleVisibility() {
    const triggerHeight = this.trigger.offsetHeight || 0;
    this.button.classList.toggle("active", window.scrollY > triggerHeight);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  destroy() {
    window.removeEventListener("scroll", this.toggleVisibility);
    this.button.removeEventListener("click", this.scrollToTop);
  }

}
