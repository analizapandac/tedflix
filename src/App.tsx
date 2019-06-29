import React from "react";
import debounce from "lodash.debounce";
import "./App.scss";
import { Video } from "./interfaces/Video";
import { fetchChannelVideos } from "./api/youtube";
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
  const [lastSearchQuery, setLastSearchQuery] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);

  const getDefaultVideos: () => void = () => {
    fetchChannelVideos({
      shouldUseDefaultVideos: true
    })
      .then(function(channelVideos) {
        setVideos(channelVideos);
        setSelectedVideo(channelVideos.length > 0 ? channelVideos[0] : null);
        setLoaded(true);
        setIsSearching(false);
        setErrorMessage("");
      })
      .catch((err) => {
        setErrorMessage(err);
        setLoaded(false);
        setIsSearching(false);
      });
  };

  const searchVideos: (searchQuery?: string) => void = (
    searchQuery?: string
  ) => {
    fetchChannelVideos({
      searchQuery
    })
      .then(function(channelVideos) {
        setVideos(channelVideos);
        setIsSearching(false);
        setErrorMessage("");
      })
      .catch((err: string) => {
        setErrorMessage(err);
        setVideos([]);
        setIsSearching(false);
      });
  };

  React.useEffect(() => {
    getDefaultVideos();
  }, []);

  const onVideoClick: (videoId: string) => void = (videoId: string) => {
    const video = videos.find((video: Video) => video.videoId === videoId);

    setSelectedVideo(video || null);

    try {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      if (isMobile) {
        window.scrollTo({
          top: 100,
          left: 0,
          behavior: 'smooth'
        });
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  const onVideoSearch: (searchQuery: string) => void = (
    searchQuery: string
  ) => {
    if (
      lastSearchQuery.trim().toUpperCase() === searchQuery.trim().toUpperCase()
    )
      return;
    if (searchQuery.trim().length === 0 && lastSearchQuery.trim().length > 0) {
      getDefaultVideos();
    } else {
      setIsSearching(true);
      setLastSearchQuery(searchQuery);
      searchVideos(searchQuery);
      try {
        const isMobile = window.matchMedia("(max-width: 767px)").matches;
        if (isMobile) {
          setSelectedVideo(null);
        }
      } catch (err) {
        console.log("err", err);
      }
    }
  };

  const debouncedSearchVideoFunc = debounce(onVideoSearch, DEBOUNCE_TIME);

  const renderErrorMessage: () => React.ReactNode = () => {
    if (!!errorMessage) {
      return (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      );
    }
  };

  return (
    <div>
      <TedxBackground />
      {loaded ? (
        <div className="app-wrapper">
          {renderErrorMessage()}
          <div className="app-content">
            {selectedVideo ? <VideoPlayer video={selectedVideo} /> : null}
            <div className="sidebar">
              <SearchBar onSearch={debouncedSearchVideoFunc} />
              <VideoList
                videos={videos}
                selectedVideo={selectedVideo}
                onVideoClick={onVideoClick}
                isSearching={isSearching}
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
