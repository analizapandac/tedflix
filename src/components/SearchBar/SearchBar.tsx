import React from "react";
import "./SearchBar.css";
import { AppConsumer } from "../../contexts/AppContext";

export const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');

  const onSearchQueryChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: Function
  ) => void = (
    event: React.ChangeEvent<HTMLInputElement>,
    callback: Function
  ) => {
    setSearchQuery(event.target.value);
    callback();
  };

  return (
    <div className="search-component">
      <AppConsumer>
        {({ onVideoSearch }) => (
          <div className="search-bar">
            <input
              type="text"
              onChange={(e) =>
                onSearchQueryChange(e, () => onVideoSearch(e.target.value))
              }
              placeholder="Search Tedx talks from Youtube"
            />
            <button onClick={(e) => onVideoSearch(searchQuery)}>
              Search
            </button>
          </div>
        )}
      </AppConsumer>
    </div>
  );
};
