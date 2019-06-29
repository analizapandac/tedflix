import React from "react";
import debounce from "lodash.debounce";
import "./App.scss";
import { Video } from "./interfaces/Video";
import { fetchChannelVideos, fetchDefaultVideos } from "./api/youtube";
import { TedxBackground } from "./components/TedxBackground";
import { SearchBar } from "./components/SearchBar";
import { VideoList } from "./components/VideoList";
import { Footer } from "./components/Footer";
import { VideoPlayer } from "./components/VideoPlayer";
import { LoadingPage } from "./components/LoadingPage";

const DEBOUNCE_TIME = 500;

const App: React.FC = () => {
  const [videos, setVideos] = React.useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = React.useState<Video | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [loaded, setLoaded] = React.useState(false);

  const getDefaultVideos: () => void = () => {
    fetchDefaultVideos()
      .then(function(channelVideos) {
        setVideos(channelVideos);
        setSelectedVideo(channelVideos.length > 0 ? channelVideos[0] : null);
        setLoaded(true);
      })
      .catch((err) => {
        console.log("error", err);
        setErrorMessage(err);
        setLoaded(false);
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
  }, []);

  const onVideoClick: (videoId: string) => void = (videoId: string) => {
    const video = videos.find((video: Video) => video.videoId === videoId);

    setSelectedVideo(video || null);
  };

  const onVideoSearch: (searchQuery: string) => void = (
    searchQuery: string
  ) => {
    fetchVideos(searchQuery);
  };

  const debouncedSearchVideoFunc = debounce(onVideoSearch, DEBOUNCE_TIME);

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
    <div>
      <TedxBackground />
      {loaded ? (
        <div className="app-wrapper">
          <div className="app-content">
            {selectedVideo ? <VideoPlayer video={selectedVideo} /> : null}
            <div className="sidebar">
              <SearchBar onSearch={debouncedSearchVideoFunc} />
              <VideoList
                videos={videos}
                selectedVideo={selectedVideo}
                onVideoClick={onVideoClick}
              />
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        <LoadingPage />
      )}
    </div>
  );
};

export default App;
