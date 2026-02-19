import styles from "./Header.module.scss";
import findIcon from "@assets/images/find.svg";

let onSearchClick = null;

export function setSearchClickHandler(handler) {
  onSearchClick = handler;
}

export class Header {
  render() {
    const element = document.createElement("header");

    element.innerHTML = `
      <header class="${styles.header}">
        <a href="/" class="${styles.logo}">Logo</a>
        <button class="${styles.finder}">
          <img src="${findIcon}" alt="Search" />
        </button>
      </header>
    `;

    const button = element.querySelector(`.${styles.finder}`);
    button.addEventListener("click", () => {
      if (onSearchClick) {
        onSearchClick();
      }
    });

    return element.firstElementChild;
  }
}

export default Header;
