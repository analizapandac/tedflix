import React from "react";
import { Video } from "../../interfaces/Video";
import "./VideoList.scss";

interface VideoListProps {
  videos: Video[];
  selectedVideo: Video;
  isSearching: boolean;
  onVideoClick: (videoId: string) => void;
}

export const VideoList: React.FC<VideoListProps> = ({
  videos,
  selectedVideo,
  isSearching,
  onVideoClick
}: VideoListProps) => {
  const renderVideos: () => React.ReactNode = () => {
    return (
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
    );
  };

  const renderSearchingIndicator: () => React.ReactNode = () => {
    return <p className="searching-indicator">Fetching talks from Youtube, please wait...</p>;
  };

  return (
    <div className="video-list-component">
      {!isSearching ? renderVideos() : renderSearchingIndicator()}
    </div>
  );
};
