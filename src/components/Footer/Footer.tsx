import React from "react";
import "./Footer.scss";

export const Footer: React.FC = () => {
  return (
    <footer className="footer-component">
      <div className="footer-content">
        <div>
          All videos are taken from the official&nbsp;
          <a
            href="https://www.youtube.com/channel/UCsT0YIqwnpJCM-mx7-gSA4Q"
            target="_blank"
            rel="noopener noreferrer"
            className="link--tedx-talks"
          >
            Tedx Talks
          </a>
          &nbsp;Youtube channel.
        </div>
        <div>
          Content copyright belongs to&nbsp;
          <a
            href="https://www.ted.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            TED
          </a>
          .
        </div>
        <div>
          Made with <span className="icon-love">&#10084;</span> by&nbsp;
          <a
            href="https://github.com/analizapandac"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ana Liza Pandac
          </a>
          &nbsp;using TypeScript and React
        </div>
      </div>
    </footer>
  );
};
