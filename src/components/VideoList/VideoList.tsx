import React from "react";
import { Video } from "../../interfaces/Video";
import "./VideoList.scss";

interface VideoListProps {
  videos: Video[];
  selectedVideo: Video;
  onVideoClick: (videoId: string) => void;
}

export const VideoList: React.FC<VideoListProps> = ({
  videos,
  selectedVideo,
  onVideoClick
}: VideoListProps) => {
  return (
    <div className="video-list-component">
      <h3 className="title">Related talks</h3>
      <ul>
        {videos.map(({ title, videoId, mediumThumbnailURL }) => {
          if (selectedVideo && videoId === selectedVideo.videoId) return null;
          return (
            <li key={videoId} onClick={() => onVideoClick(videoId)}>
              <div className="thumbnail-wrapper">
                <img src={mediumThumbnailURL} alt={title} />
              </div>
              <div className="overlay">
                <h4 className="video-title">{title}</h4>
              </div>
              <div className="button-wrapper">
                <img src="./yt-play-button.png" alt="Play video" />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
