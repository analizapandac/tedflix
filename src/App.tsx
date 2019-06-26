import React from "react";
import debounce from "lodash.debounce";
import "./App.css";
import { Channel, ChannelRequestProps } from "./interfaces/Channel";
import {
  Video as VideoInterface,
  VideoSelectionArgs
} from "./interfaces/Video";
import { fetchChannelVideos, QUOTA_EXCEEDED_ERROR } from "./api/youtube";
import { AppProvider } from "./contexts/AppContext";
import { SearchBar } from "./components/SearchBar";
import { HomePage } from "./components/HomePage";
import { VideoPage } from "./components/VideoPage";

const DEFAULT_CHANNELS = [
  {
    channelId: "UCsT0YIqwnpJCM-mx7-gSA4Q",
    defaultVideoId: "52lZmIafep4"
  }
];

// {
//   channelId: "UCsT0YIqwnpJCM-mx7-gSA4Q",
//   defaultVideoId: "52lZmIafep4"
// },

// {
//   channelId: 'UCnUYZLuoy1rq1aVMwx4aTzw'
// }

const DEBOUNCE_TIME = 500;

const App: React.FC = () => {
  const [channels, setChannels] = React.useState<Channel[]>([]);
  const [
    selectedVideo,
    setSelectedVideo
  ] = React.useState<VideoInterface | null>(null);
  const [relatedVideos, setRelatedVideos] = React.useState<VideoInterface[]>();
  const [errorMessage, setErrorMessage] = React.useState<string>();

  const fetchVideos: (searchQuery?: string) => void = (
    searchQuery?: string
  ) => {
    Promise.all(
      DEFAULT_CHANNELS.map(
        ({ channelId, defaultVideoId = "" }: ChannelRequestProps) => {
          return fetchChannelVideos({ channelId, defaultVideoId, searchQuery })
            .then((channel) => {
              return channel;
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
      )
    )
      .then(function(channelResponses) {
        setChannels(channelResponses);
      })
      .catch((err) => {
        console.log("error", err);
        setErrorMessage(err);
      });
  };

  React.useEffect(() => {
    console.log("running useEffect", channels.length);
    fetchVideos();
  }, [channels.length]);

  const onVideoSelect: ({ channelId, videoId }: VideoSelectionArgs) => void = ({
    channelId,
    videoId
  }: VideoSelectionArgs) => {
    const channel = channels.find(
      (channel) => channel.channelId === channelId
    ) || { videos: [] };
    const video = channel.videos.find(
      (video: VideoInterface) => video.videoId === videoId
    );
    const newRelatedVideos = channel.videos.filter(
      (video: VideoInterface) => video.videoId !== videoId
    );

    setSelectedVideo(video || null);
    setRelatedVideos(newRelatedVideos);
  };

  const onVideoSearch: (searchQuery: string) => void = (
    searchQuery: string
  ) => {
    fetchVideos(searchQuery);
  };

  const debouncedSearchVideoFunc = debounce(onVideoSearch, DEBOUNCE_TIME);

  const backToHomepage: () => void = () => {
    setSelectedVideo(null);
    setRelatedVideos([]);
  };

  const renderPage = () => {
    if (!!selectedVideo) {
      return <VideoPage video={selectedVideo} relatedVideos={relatedVideos} />;
    }
    return <HomePage key={channels.length} channels={channels} />;
  };

  // const renderBackButton: () => React.ReactNode | void = () => {
  //   if (!!selectedVideo) {
  //     return (
  //       <p className="back-button-wrapper">
  //         <a onClick={backToHomepage}>Back to homepage</a>
  //       </p>
  //     );
  //   }
  // };

  const renderErrorMessage: () => React.ReactNode = () => {
    if (!!errorMessage) {
      return (
        <div className="error-message">
          <p>{errorMessage}</p>
          <p className="error-emoticon" />
        </div>
      );
    }
  };

  return (
    <div className="App">
      <h2 className="app-name"><a onClick={backToHomepage}>Tedx Talks Player</a></h2>
      <AppProvider
        value={{
          onVideoSelect,
          onVideoSearch: debouncedSearchVideoFunc
        }}
      >
        <SearchBar />
        {renderErrorMessage()}
        {renderPage()}
      </AppProvider>
      <footer>
        <div>
          <span>Made with</span> <span className="icon-love" />{" "}
          <span>
            by <a href="https://github.com/analizapandac" target="_blank">Ana Liza Pandac</a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
