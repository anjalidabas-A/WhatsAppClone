// import { useState } from "react";

// function SearchBar({search, setSearch}){

//   return (
//     <div className="search-box">
//       <input type="text" placeholder="Search Here..." value={search} onChange={(e) => setSearch(e.target.value)}/>
//     </div>
//   );
// }

// export default SearchBar;

function SearchBar({search, handleSearchChange}){

  return (
    <div className="search-box">
      <input type="text" placeholder="Search Here..." value={search} onChange={handleSearchChange}/>
    </div>
  );
}

export default SearchBar;



