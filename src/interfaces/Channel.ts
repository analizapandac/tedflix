import { Video } from './Video';

export interface Channel {
  channelId: string;
  channelName: string;
  videos: Video[];
}

export interface ChannelRequestProps {
  searchQuery?:string;
}