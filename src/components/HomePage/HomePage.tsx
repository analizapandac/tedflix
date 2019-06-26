import React from "react";
import { Channel as ChannelInterface } from "../../interfaces/Channel";
import { Channel } from '../Channel';
import './HomePage.css';

interface HomePageProps {
  channels: ChannelInterface[]
}

export const HomePage: React.FC<HomePageProps> = ({
  channels
}: HomePageProps) => {
  return (
    <div className='home-page-component'>
      {channels.map(({ channelName, channelId, videos }: ChannelInterface) => {
        return <Channel key={channelId} channelName={channelName} videos={videos} />
      })}
    </div>
  );
};