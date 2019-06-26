import { Video } from './Video';

export interface Channel {
  channelId: string;
  channelName: string;
  videos: Video[];
}

export interface ChannelRequestProps {
  channelId: string;
  defaultVideoId?: string;
  searchQuery?:string;
}