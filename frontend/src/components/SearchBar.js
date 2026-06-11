function SearchBar({ search, handleSearchChange }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search Here..."
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default SearchBar;
