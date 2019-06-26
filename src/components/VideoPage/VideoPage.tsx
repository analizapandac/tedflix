import React from 'react';
import { Video as VideoInterface } from '../../interfaces/Video';
import { VideoList } from '../VideoList';
import './VideoPage.css';

interface VideoPageProps {
  video: VideoInterface;
  relatedVideos: VideoInterface[]
}

export const VideoPage: React.FC<VideoPageProps> = ({ video, relatedVideos }) => {
  const { title, description, videoId } = video;
  return (
    <div className="video-page-component">
      <div className="video">
        <iframe width="640" height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"></iframe>
          <h2>{title}</h2>
          <p>{description}</p>
      </div>
      <div className="related-videos">
        <h4 className="section-title">Related videos</h4>
        <VideoList videos={relatedVideos} showSmallThumbnails />
      </div>
    </div>
  );
}