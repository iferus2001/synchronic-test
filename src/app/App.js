import { Header, setSearchClickHandler } from "@/widgets/Header";
import { PromoBanner } from "@/widgets/PromoBanner";
import { Home } from "@/pages/Home";
import { SearchModal } from "@/widgets/SearchModal";

export class App {
  constructor() {
    this.root = document.getElementById("root") || document.body;
    this.searchModal = null;
  }

  run() {
    const header = new Header();
    this.root.appendChild(header.render());

    const banner = new PromoBanner();
    this.root.appendChild(banner.render());

    const home = new Home();
    this.root.appendChild(home.render());

    this.searchModal = new SearchModal();
    this.root.appendChild(this.searchModal.render());

    setSearchClickHandler(() => {
      this.searchModal.open();
    });
  }
}
