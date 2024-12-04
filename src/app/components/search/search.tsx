"use client";

import { useState, KeyboardEvent } from "react";
import styled from "styled-components";

const SearchBar = styled.div`
  display: flex;
  background-color: transparent;
  border: 1px solid var(--color-light-gray);
  border-radius: 5px;
  padding: 5px;
  color: var(--color-light-gray);

  &:focus-within {
    color: var(--color-secondary);
    border-color: var(--color-secondary);
    box-shadow: 0 0 4px var(--color-secondary); /* Optional: Add shadow for emphasis */
  }
`;

const SearchInput = styled.input`
  background-color: transparent;
  width: 100%;
  border: 0;
  &:focus {
    outline: none;
  }
`;

interface InputProps {
  disabled?: boolean;
  onSearch: (searchTerm: string) => void; // TODO: Define the type for the onSearch callback
}

export default function Search({
  onSearch,
  disabled,
}: InputProps): JSX.Element {
  const [inputVal, setInputVal] = useState<string>("");

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (!disabled && event.key === "Enter") {
      onSearch(inputVal); // Emit the event and send the input data
    }
  };

  return (
    <SearchBar aria-label="Search bar" role="search">
      <div data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
        </svg>
      </div>
      <SearchInput
        placeholder="Search for publications"
        value={inputVal}
        disabled={disabled}
        onChange={(e) => setInputVal(e.target.value)}
        onKeyDown={handleKeyDown}
        aria-label="Search for publications"
        aria-describedby="search-instructions"
      />
      <span id="search-instructions" style={{ display: "none" }}>
        Type your search term and press Enter to search.
      </span>
    </SearchBar>
  );
}
