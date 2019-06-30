import axios from "axios";
import { Video } from "../interfaces/Video";
import { shuffleVideos } from "../utils/array-helpers";

const API_KEY = process.env.REACT_APP_API_KEY || "";

if (!API_KEY) {
  console.warn(
    "Don't forget to set your environment variable in your .environment files (.env.local, .env.production.local, etc)"
  );
}

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

interface FetchVideosInterface {
  shouldUseDefaultVideos?: boolean;
  searchQuery?: string;
}

const GENERAL_ERROR_MESSAGE =
  "Whoops something went wrong. Please contact Ana: https://github.com/analizapandac.";

export const fetchChannelVideos: (
  FetchVideosInterface: FetchVideosInterface
) => Promise<Video[]> = async ({
  shouldUseDefaultVideos = false,
  searchQuery
}: FetchVideosInterface) => {
  let requestURL = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCsT0YIqwnpJCM-mx7-gSA4Q&type=video&key=${API_KEY}&maxResults=5&videoEmbeddable=true`;
  if (!!searchQuery) {
    requestURL += `&q=${searchQuery}`;
  }

  if (shouldUseDefaultVideos) requestURL = "/default-videos.json";

  try {
    const response = (await axios.get(requestURL)) as {
      data: { items: YoutubeVideo[] };
    };
    const {
      data: { items = [] }
    } = response;

    const videos: Video[] = [];

    items.forEach(({ id, snippet }: YoutubeVideo) => {
      videos.push({
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

    if (shouldUseDefaultVideos) {
      const shuffled = shuffleVideos(videos);
      return shuffled.slice(0, 6);
    }
    return videos;
  } catch (e) {
    const errorData = ((e.response || {}).data || {}).error || {};
    if (Object.prototype.hasOwnProperty.call(errorData, "errors")) {
      try {
        const error = errorData.errors[0];
        if (error && error.reason && error.message) {
          return Promise.reject(error.message);
        } else if (errorData.message) {
          return Promise.reject(errorData.message);
        }
      } catch (err) {
        console.log("err", err);
      }
    }
    return Promise.reject(GENERAL_ERROR_MESSAGE);
  }
};
