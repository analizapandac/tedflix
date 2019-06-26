import React from "react";
import { VideoSelectionArgs } from "../interfaces/Video";

const AppContext = React.createContext({
  onVideoSelect: ({ channelId, videoId }: VideoSelectionArgs) => {},
  onVideoSearch: (q: string) => {}
});

export const AppProvider = AppContext.Provider;
export const AppConsumer = AppContext.Consumer;
