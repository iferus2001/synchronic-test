import { SlotCard } from "@/shared/ui/SlotCard";
import { TabsBar } from "@/shared/ui/TabsBar";
import { GAMES } from "@/shared/config/games";
import styles from "./MiniGamesList.module.scss";

export class MiniGamesList {
  render() {
    const container = document.createElement("div");

    const bar = new TabsBar({ title: "Mini Games" });
    container.appendChild(bar.render());

    const grid = document.createElement("div");
    grid.className = styles.gameGrid;

    const miniGames = GAMES.filter((game) => game.mini);

    miniGames.forEach((game) => {
      const card = new SlotCard(game);
      grid.appendChild(card.render());
    });

    container.appendChild(grid);

    return container;
  }
}
