import React from "react";
import { Video } from "../../interfaces/Video";
import './HomePage.css';

interface HomePageProps {
  videos: Video[]
}

export const HomePage: React.FC<HomePageProps> = ({
  videos
}: HomePageProps) => {
  console.log('videos', videos);
  return (
    <div className='home-page-component'>
      Fetched {videos.length} videos.
    </div>
  );
};