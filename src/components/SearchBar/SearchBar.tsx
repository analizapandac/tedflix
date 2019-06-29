import React from "react";
import "./SearchBar.scss";

interface SearchBarProps {
  onSearch: (searchQuery: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const onSubmit: (event: React.FormEvent<HTMLFormElement>) => void = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="search-component">
      <form className="search-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="search-field">Search Tedx talks from Youtube</label>
          <input
            id="search-field"
            onChange={(event) => setSearchQuery(event.target.value)}
            type="text"
            placeholder="Search talks"
          />
        </div>
        <button type="submit">
          <img src="./icon-search.png" alt="Search" />
        </button>
      </form>
    </div>
  );
};
