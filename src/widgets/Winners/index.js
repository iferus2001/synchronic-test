import styles from "./Winners.module.scss";
import { WinnerCard } from "../../shared/ui/WinnerCard";

export class Winners {
  render() {
    const container = document.createElement("div");
    container.className = styles.container;

    for (let i = 0; i < 30; i++) {
      const card = new WinnerCard();
      container.appendChild(card.render());
    }

    return container;
  }
}
