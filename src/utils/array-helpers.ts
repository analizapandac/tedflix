import { Video } from "../interfaces/Video";
/**
 * Randomly shuffle an array
 * https://stackoverflow.com/a/2450976/1293256
 * @param  {Array} array The array to shuffle
 * @return {String}      The first item in the shuffled array
 */
export const shuffleVideos: (videos: Video[]) => Video[] = (videos) => {
  let currentIndex = videos.length;
  let temporaryValue: Video;
  let randomIndex: number;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = videos[currentIndex];
    videos[currentIndex] = videos[randomIndex];
    videos[randomIndex] = temporaryValue;
  }

  return videos;
};
