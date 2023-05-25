import React, { createContext, useState } from 'react';
import SearchDataService from '../Services/search-data-service.js';

export const SearchContext = createContext();

export const SearchContextProvider = (props) => {
  const [searchTerm, setSearchTerm] = useState(sessionStorage.getItem("searchTerm")|| null);
  const [items, setItems] = useState([]);
  const pathname = window.location.pathname;

  async function fetchData (){
    if(pathname === '/'){
      try{
        const result = await SearchDataService.fetchAllUsers();
        setItems(result.data);
      }
      catch(error){
        console.log('error in search context',error)
      }
    }

    if(pathname.startsWith('/s/')){
      try{
        const result = await SearchDataService.find(searchTerm);
        setItems(result.data);
      }
      catch(error){
        console.log('error in search context',error)
      }
    }
  }

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, items, fetchData}}>
      {props.children}
    </SearchContext.Provider>
  );
};

