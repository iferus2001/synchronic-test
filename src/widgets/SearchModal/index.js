import { SlotCard } from "@/shared/ui/SlotCard";
import { GAMES } from "@/shared/config/games";
import styles from "./SearchModal.module.scss";
import findIcon from "@/assets/images/search.svg";

export class SearchModal {
  constructor() {
    this.isOpen = false;
    this.searchQuery = "";
    this.root = null;
    this.searchInput = null;
    this.clearBtn = null;
    this.searchGamesGrid = null;
    this.sectionTitle = null;
  }

  open() {
    this.isOpen = true;
    if (this.root) {
      this.root.classList.add(styles.isOpen);
      document.body.style.overflow = "hidden";
    }
  }

  close() {
    this.isOpen = false;
    if (this.root) {
      this.root.classList.remove(styles.isOpen);
      document.body.style.overflow = "";
    }
    this.clearSearch();
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  handleSearch(query) {
    this.searchQuery = query.toLowerCase().trim();

    if (this.sectionTitle) {
      this.sectionTitle.style.display = this.searchQuery ? "none" : "block";
    }

    this.renderGames();
  }

  clearSearch() {
    this.searchQuery = "";
    if (this.searchInput) {
      this.searchInput.value = "";
    }
    if (this.clearBtn) {
      this.clearBtn.style.display = "none";
    }
    if (this.sectionTitle) {
      this.sectionTitle.style.display = "block";
    }
    this.renderGames();
  }

  filterGames() {
    if (!this.searchQuery) {
      return GAMES.filter((game) => game.top);
    }
    return GAMES.filter(
      (game) => game.top && game.name.toLowerCase().includes(this.searchQuery),
    );
  }

  renderGames() {
    if (!this.searchGamesGrid) return;

    this.searchGamesGrid.innerHTML = "";
    const filteredGames = this.filterGames();

    if (filteredGames.length === 0) {
      this.searchGamesGrid.innerHTML = `<p class="${styles.noResults}">No games found</p>`;
      return;
    }

    // Используем DocumentFragment для более быстрого добавления множества элементов
    const fragment = document.createDocumentFragment();

    filteredGames.forEach((game) => {
      const card = new SlotCard(game);
      fragment.appendChild(card.render());
    });

    this.searchGamesGrid.appendChild(fragment);
  }

  render() {
    const modal = document.createElement("div");
    modal.className = styles.modal;

    modal.innerHTML = `
      <div class="${styles.overlay}"></div>
      <div class="${styles.content}">
        <div class="${styles.header}">
          <h2 class="${styles.title}">Search</h2>
          <button class="${styles.closeBtn}" aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <div class="${styles.body}">
          <p class="${styles.subtitle}">Enter the game title in the search below</p>

          <div class="${styles.searchContainer}">
            <label class="${styles.helperLabel}">helper label</label>
            <div class="${styles.searchInputWrapper}">
              <img class="${styles.searchIcon}" src="${findIcon}" />
              <input
                type="text"
                id="searchInput"
                class="${styles.searchInput}"
                placeholder="Search"
              />
              <button id="searchClearBtn" class="${styles.clearBtn}" style="display: none;" aria-label="Clear search">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          <h3 class="${styles.sectionTitle}">Top games</h3>
          <div id="searchGamesGrid" class="${styles.gamesGrid}"></div>
        </div>
      </div>
    `;

    this.root = modal;

    const overlay = modal.querySelector(`.${styles.overlay}`);
    const closeBtn = modal.querySelector(`.${styles.closeBtn}`);
    this.searchInput = modal.querySelector(`#searchInput`);
    this.clearBtn = modal.querySelector(`#searchClearBtn`);
    this.searchGamesGrid = modal.querySelector(`#searchGamesGrid`);
    this.sectionTitle = modal.querySelector(`.${styles.sectionTitle}`);

    overlay.addEventListener("click", () => this.close());

    closeBtn.addEventListener("click", () => this.close());

    this.searchInput.addEventListener("input", (e) => {
      const query = e.target.value;
      this.handleSearch(query);

      if (this.clearBtn) {
        this.clearBtn.style.display = query ? "flex" : "none";
      }
    });

    if (this.clearBtn) {
      this.clearBtn.addEventListener("click", () => this.clearSearch());
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close();
      }
    });

    this.renderGames();

    return modal;
  }
}
