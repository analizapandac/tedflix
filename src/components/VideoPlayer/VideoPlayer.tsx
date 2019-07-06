import React from "react";
import { Video } from "../../interfaces/Video";
import "./VideoPlayer.scss";

interface VideoPlayerProps {
  video: Video;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  video
}) => {
  const { title, videoId, description } = video;
  return (
    <div className="video-player-component">
      <div className="video-wrapper">
        <div className="video-content">
          <h1 className="video-title">{title}</h1>
          <div className="embedded-video">
            <div className="embed-container">
              <iframe
                frameBorder="0"
                title="YouTube video player"
                src={`https://www.youtube.com/embed/${videoId}?feature=oembed&controls=1&hd=1&modestbranding=1&autohide=1&showinfo=0&fs=1`}
              />
            </div>
          </div>
          <article className="video-description">{description}</article>
        </div>
      </div>
    </div>
  );
};
