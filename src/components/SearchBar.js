import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
      setInput('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for songs or artists"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;