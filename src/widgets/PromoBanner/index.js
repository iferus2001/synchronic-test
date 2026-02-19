import styles from "./PromoBanner.module.scss";
import bannerSrc from "@assets/images/banner.jpg";
import mobileBannerSrc from "@assets/images/mobile_banner.jpg";

export class PromoBanner {
  render() {
    const container = document.createElement("div");
    container.className = styles.container;

    container.innerHTML = `
      <a href="https://example.com" target="_blank" class="${styles.link}">
        <picture>
          <source media="(max-width: 768px)" srcset="${mobileBannerSrc}">
          <img src="${bannerSrc}" alt="Promo Banner" class="${styles.image}" />
        </picture>
      </a>
    `;

    return container;
  }
}
