import { SlotCard } from "@/shared/ui/SlotCard";
import { TabsBar } from "@/shared/ui/TabsBar";
import { GAMES } from "@/shared/config/games";
import styles from "./GameList.module.scss";

export class GameList {
  render() {
    const container = document.createElement("div");

    // Add TabsBar
    const tabsBar = new TabsBar();
    container.appendChild(tabsBar.render());

    // Create Grid Container
    const grid = document.createElement("div");
    grid.className = styles.gameGrid;

    GAMES.forEach((game) => {
      const card = new SlotCard(game);
      grid.appendChild(card.render());
    });

    container.appendChild(grid);

    return container;
  }
}
