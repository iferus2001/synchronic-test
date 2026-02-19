import winner from "@assets/images/winner1.jpg";
import styles from "./WinnerCard.module.scss";
export class WinnerCard {
  render() {
    const element = document.createElement("div");

    element.innerHTML = `
      <div class="${styles.card}">
        <img src="${winner}" alt="Game name" class="${styles.image}" />
        <div class="${styles.info}">
          <span class="${styles.gameName}">Game name</span>
          <span class="${styles.price}">$ 400</span>
          <span class="${styles.user}">User***_</span>
        </div>
      </div>
      `;

    return element.firstElementChild;
  }
}
