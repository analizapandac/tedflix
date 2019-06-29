import React from "react";
import debounce from "lodash.debounce";
import "./App.css";
import { Video, VideoSelectionArgs } from "./interfaces/Video";
import { fetchChannelVideos, fetchDefaultVideos } from "./api/youtube";
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

const DEBOUNCE_TIME = 500;

const App: React.FC = () => {
  const [videos, setVideos] = React.useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = React.useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = React.useState<Video[]>();
  const [errorMessage, setErrorMessage] = React.useState<string>();

  const getDefaultVideos: () => void = () => {
    fetchDefaultVideos()
      .then(function(channelVideos) {
        setVideos(channelVideos);
      })
      .catch((err) => {
        console.log("error", err);
        setErrorMessage(err);
      });
  };

  const fetchVideos: (searchQuery?: string) => void = (
    searchQuery?: string
  ) => {
    fetchChannelVideos(searchQuery)
      .then(function(channelVideos) {
        setVideos(channelVideos);
      })
      .catch((err) => {
        console.log("error", err);
        setErrorMessage(err);
      });
  };

  React.useEffect(() => {
    getDefaultVideos();
  }, [videos.length]);

  // const onVideoSelect: ({ channelId, videoId }: VideoSelectionArgs) => void = ({
  //   channelId,
  //   videoId
  // }: VideoSelectionArgs) => {
  //   const channel = channels.find(
  //     (channel) => channel.channelId === channelId
  //   ) || { videos: [] };
  //   const video = channel.videos.find(
  //     (video: VideoInterface) => video.videoId === videoId
  //   );
  //   const newRelatedVideos = channel.videos.filter(
  //     (video: VideoInterface) => video.videoId !== videoId
  //   );

  //   setSelectedVideo(video || null);
  //   setRelatedVideos(newRelatedVideos);
  // };

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
    return <HomePage key={videos.length} videos={videos} />;
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
      <h2 className="app-name">
        <a onClick={backToHomepage}>Tedx Talks Player</a>
      </h2>
      <AppProvider
        value={{
          onVideoSelect: () => {},
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
            by{" "}
            <a href="https://github.com/analizapandac" target="_blank">
              Ana Liza Pandac
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default App;
