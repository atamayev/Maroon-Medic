import React, { createContext, useState } from 'react';

const SearchContext = createContext();

const SearchContextProvider = (props) => {
  const [SearchTerm, setSearchTerm] = useState(null);

  function Search () {
  }

  return (
    <SearchContext.Provider value={{ Search, SearchTerm }}>
      {props.children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
