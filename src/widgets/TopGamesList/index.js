import { SlotCard } from "@/shared/ui/SlotCard";
import { TabsBar } from "@/shared/ui/TabsBar";
import { GAMES } from "@/shared/config/games";
import styles from "./TopGamesList.module.scss";

export class TopGamesList {
  render() {
    const container = document.createElement("div");

    const bar = new TabsBar({ title: "Top Games" });
    container.appendChild(bar.render());

    const grid = document.createElement("div");
    grid.className = styles.gameGrid;

    const topGames = GAMES.filter((game) => game.top);

    topGames.forEach((game) => {
      const card = new SlotCard(game);
      grid.appendChild(card.render());
    });

    container.appendChild(grid);

    return container;
  }
}
