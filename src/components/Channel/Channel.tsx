import React from 'react';
import { Channel as ChannelInterface } from '../../interfaces/Channel';
import { VideoList } from '../VideoList';
import './Channel.css';

export const Channel: React.FC<ChannelInterface> = ({ channelName, videos }: ChannelInterface) => {
  return (
    <div className="channel-component">
      {/* <h4 className="channel-name">{channelName}</h4> */}
      <VideoList videos={videos} />
    </div>
  );
}