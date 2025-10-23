/**
 * Открытие навигации
 */
export default class MobileMenu {

  constructor(buttonSelector, menuSelector) {
    this.button = document.querySelector(buttonSelector);
    this.menu = document.querySelector(menuSelector);

    if (!this.button || !this.menu) {
      return; 
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeOnClickOutside = this.closeOnClickOutside.bind(this);
    this.closeOnScroll = this.closeOnScroll.bind(this);

    this.button.addEventListener("click", this.toggleMenu);
    document.addEventListener("click", this.closeOnClickOutside);
    window.addEventListener("scroll", this.closeOnScroll);
  }

  open() {
    this.menu.classList.add("active");
  }

  close() {
    this.menu.classList.remove("active");
  }

  toggleMenu(event) {
    event.stopPropagation();
    this.menu.classList.toggle("active");
  }

  closeOnClickOutside(event) {
    if (!this.menu.contains(event.target) && event.target !== this.button) {
      this.close();
    }
  }

  closeOnScroll() {
    if (this.button.getBoundingClientRect().bottom < 0) {
      this.close();
    }
  }

  destroy() {
    this.button.removeEventListener("click", this.toggleMenu);
    document.removeEventListener("click", this.closeOnClickOutside);
    window.removeEventListener("scroll", this.closeOnScroll);
  }

}
