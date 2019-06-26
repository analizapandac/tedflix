export interface Video  {
  publishedAt: string;
  title: string;
  description: string;
  smallThumbnailURL: string;
  mediumThumbnailURL:string;
  videoId: string;
  channelName: string;
  channelId: string;
}

export interface VideoSelectionArgs {
  channelId: string;
  videoId: string;
}
