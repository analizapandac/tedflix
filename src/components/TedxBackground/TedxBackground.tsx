import React from "react";
import "./TedxBackground.scss";

export const TedxBackground: React.FC = () => {
  const appBackground = React.useRef(null);
  const appBgThumbnail = React.useRef(null);

  React.useEffect(() => {
    const appBackgroundElement = appBackground.current as (HTMLImageElement | null);
    const appImageThumbnailEl = appBgThumbnail.current as (HTMLImageElement | null);

    if (appImageThumbnailEl !== null && appBackgroundElement !== null) {
      // 1: load small image and show it
      const img = new Image();
      img.src = appImageThumbnailEl.src;
      img.onload = () => {
        appImageThumbnailEl.classList.add("loaded");
      };

      // 2: load large image
      const imgLarge = new Image();
      imgLarge.src = appBackgroundElement.dataset.large || "";
      imgLarge.setAttribute("alt", "Tedx background");
      imgLarge.onload = () => {
        imgLarge.classList.add("loaded");
        appImageThumbnailEl.classList.remove("loaded");
      };
      appBackgroundElement.appendChild(imgLarge);
      appBackgroundElement.classList.add("loaded");
    }
  }, []);

  return (
    <div
      ref={appBackground}
      className="app-background-component"
      data-large="./background.jpeg"
    >
      <img
        ref={appBgThumbnail}
        src="./background-thumbnail.jpg"
        className="img-small"
        alt="Tedx background thumbnail"
      />
    </div>
  );
};
