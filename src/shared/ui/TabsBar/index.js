import styles from "./TabsBar.module.scss";

export class TabsBar {
  constructor(config = {}) {
    this.title = config.title;
  }

  render() {
    const element = document.createElement("div");

    let leftContent = "";
    if (this.title) {
      leftContent = `<h2 class="${styles.title}">${this.title}</h2>`;
    } else {
      leftContent = `
            <button class="${styles.tab} ${styles.active}">Recent</button>
            <button class="${styles.tab}">Favourite</button>
        `;
    }

    element.innerHTML = `
      <div class="${styles.container}">
        <div class="${styles.leftSection}">
          ${leftContent}
        </div>

        <div class="${styles.rightSection}">
          <button class="${styles.controlBtn}" aria-label="Previous">&lt;</button>
          <button class="${styles.controlBtn}" aria-label="Next">&gt;</button>
          <button class="${styles.showAllBtn}">Show all</button>
        </div>
      </div>
    `;

    return element.firstElementChild;
  }
}
