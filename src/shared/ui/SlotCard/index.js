import styles from "./SlotCard.module.scss";
import play from "@/assets/images/play_button.svg";
export class SlotCard {
  constructor(gameData) {
    this.game = gameData;
  }

  render() {
    const element = document.createElement("div");

    element.innerHTML = `
      <div class="${styles.card}">
        <div class="${styles.media}">
          <img src="${this.game.image}" alt="${this.game.name}" class="${styles.image}">
          <div class="${styles.overlay}">
            <button class="${styles.btn} ${styles.btnPlay}">Play</button>
            <button class="${styles.btn} ${styles.btnDemo}">Demo</button>
          </div>
        </div>

        <div class="${styles.footer}">
          <div class="${styles.icon}">
            <img src="${play}" alt="playBtn" />

          </div>
          <span class="${styles.title}">${this.game.name}</span>
        </div>
      </div>
    `;

    const cardNode = element.firstElementChild;
    const mediaNode = cardNode.querySelector(`.${styles.media}`);
    const playBtn = cardNode.querySelector(`.${styles.btnPlay}`);
    const demoBtn = cardNode.querySelector(`.${styles.btnDemo}`);

    mediaNode.addEventListener("click", (e) => {
      if (e.target.closest(`.${styles.btn}`)) return;
      mediaNode.classList.toggle(styles.isActive);
    });

    playBtn.addEventListener("click", () => {
      console.log(`Playing: ${this.game.name}`);
    });

    demoBtn.addEventListener("click", () => {
      console.log(`Demo: ${this.game.name}`);
    });

    return cardNode;
  }
}
