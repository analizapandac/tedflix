import axios from "axios";
import { Channel, ChannelRequestProps } from "../interfaces/Channel";

export const QUOTA_EXCEEDED_ERROR =
  "Youtube API Error: Maximum quota limit exceeded for today. Try again tomorrow.";

export const GENERAL_REQUEST_ERROR =
  "Youtube API Error: An error occured while reaching out to Youtube for this request.";

export const NOT_FOUND_ERROR =
  "Youtube API Error: The video you are looking for does not exist in Youtube.";

// const API_KEY = "AIzaSyCGRxIYK1plx4jjpi_NgbAS2BMIReqkaSQ";
const API_KEY = "AIzaSyDcWWnc8Av0kdMy3O3us6BE3fxoVy1Y538";

interface YoutubeVideo {
  id: { videoId: string };
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: { medium: { url: string }; default: { url: string } };
    channelTitle: string;
    channelId: string;
  };
}

export const fetchChannelVideos: ({
  channelId,
  defaultVideoId,
  searchQuery
}: ChannelRequestProps) => Promise<Channel> = async ({
  channelId,
  defaultVideoId,
  searchQuery
}: ChannelRequestProps) => {
  let requestURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&key=${API_KEY}&maxResults=10&videoEmbeddable=true`;
  if (!!searchQuery) {
    requestURL += `&q=${searchQuery}`;
  }
  if (!!defaultVideoId && !searchQuery) {
    requestURL += `&relatedToVideoId=${defaultVideoId}`;
  }

  try {
    const response = (await axios.get(requestURL)) as {
      data: { items: YoutubeVideo[] };
    };
    const {
      data: { items = [] }
    } = response;

    const channel: Channel = {
      channelName: "",
      videos: [],
      channelId: channelId
    };

    items.forEach(({ id, snippet }: YoutubeVideo) => {
      if (channel.channelName === "")
        channel.channelName = snippet.channelTitle;

      channel.videos.push({
        videoId: (id || {}).videoId || "",
        publishedAt: snippet.publishedAt || "",
        title: snippet.title || "",
        description: snippet.description || "",
        smallThumbnailURL: ((snippet.thumbnails || {}).default || {}).url || "",
        mediumThumbnailURL: ((snippet.thumbnails || {}).medium || {}).url || "",
        channelName: snippet.channelTitle || "",
        channelId: snippet.channelId || ""
      });
    });

    return channel;
  } catch (e) {
    if (e.response.status === 403) {
      return Promise.reject(QUOTA_EXCEEDED_ERROR);
    } else if (e.response.status === 400) {
      return Promise.reject(GENERAL_REQUEST_ERROR);
    } else if (e.response.status === 404) {
      return Promise.reject(NOT_FOUND_ERROR);
    }
    return Promise.reject("Whoops something went wrong. Please contact Ana.");
  }
};
