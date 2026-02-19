import styles from "./Home.module.scss";
import { Winners } from "@/widgets/Winners";
import { TopGamesList } from "@/widgets/TopGamesList";
import { MiniGamesList } from "@/widgets/MiniGamesList";
import { GameList } from "@/widgets/MainGamesList";

export class Home {
  render() {
    const main = document.createElement("main");
    main.className = styles.main;

    const winners = new Winners();
    main.appendChild(winners.render());

    const gameList = new GameList();
    main.appendChild(gameList.render());

    const topGamesList = new TopGamesList();
    main.appendChild(topGamesList.render());

    const miniGamesList = new MiniGamesList();
    main.appendChild(miniGamesList.render());

    return main;
  }
}
