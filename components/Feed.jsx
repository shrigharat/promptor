'use client';

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import PromptCardList from "./PromptCardList";

const Feed = () => {

  const [allPrompts, setAllPrompts] = useState([]);

  const fetchPrompts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setAllPrompts(data);
  }

  useEffect(() => {
    fetchPrompts();
  }, [])

  //search result states
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPrompts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  }

  const handleSearchInput = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const results = filterPrompts(searchText);
        setSearchResults(results);
      }, 500)
    );
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const results = filterPrompts(tagName);
    setSearchResults(results);
  }

  return (
    <section className="feed">
      <form className="w-full relative flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchInput}
          className="search_input peer"
          required
        />
      </form>

      {
        searchText ? (
          <PromptCardList 
            data={searchResults}
            handleTagClick={handleTagClick}
          />
        ) : (
          <PromptCardList 
            data={allPrompts}
            handleTagClick={handleTagClick}
          />
        )
      }
    </section>
  )
}

export default Feed;