import React from "react";
import { Video } from "../../interfaces/Video";
import { AppConsumer } from "../../contexts/AppContext";
import { humanizeDate } from "../../utils/date-helpers";
import "./VideoList.css";

interface VideoListProps {
  videos: Video[];
  showSmallThumbnails?: boolean;
}

export const VideoList: React.SFC<VideoListProps> = ({
  videos,
  showSmallThumbnails = false
}: VideoListProps) => {
  return (
    <ul className="video-list-component">
      <AppConsumer>
        {({ onVideoSelect }) =>
          videos.map(
            ({
              videoId,
              title,
              publishedAt,
              smallThumbnailURL,
              mediumThumbnailURL,
              channelId
            }) => {
              return (
                <li key={videoId}>
                  <a onClick={() => onVideoSelect({ channelId, videoId })}>
                    <img
                      src={
                        showSmallThumbnails
                          ? smallThumbnailURL
                          : mediumThumbnailURL
                      }
                      alt=""
                    />
                    <div className="video-details">
                      <h5 className="video-title">{title}</h5>
                      <p className="published-date">
                        published {humanizeDate(publishedAt)}
                      </p>
                    </div>
                  </a>
                </li>
              );
            }
          )
        }
      </AppConsumer>
    </ul>
  );
};
