/**
 * Реализация плавной прокрутки до якорных ссылок
 */
export default class SmoothScroll {

  constructor(linksSelector) {
    this.links = document.querySelectorAll(linksSelector);
    if (!this.links.length) {
      return; 
    }

    this.scrollToSection = this.scrollToSection.bind(this);
    this.links.forEach((link) => link.addEventListener("click", (e) => this.scrollToSection(e, link)));
  }

  scrollToSection(event, link) {
    event.preventDefault();

    const targetId = link.getAttribute("href").substring(1);
    const targetElem = document.getElementById(targetId);

    if (!targetElem) {
      return; 
    }

    targetElem.scrollIntoView({ behavior: "smooth" });
  }

}
