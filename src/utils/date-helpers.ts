import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

export const humanizeDate: (date: string) => string = (date: string) => {
  const parsedDate = dayjs(date);
  return `${dayjs().from(parsedDate, true)} ago`;
};
