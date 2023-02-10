import React, { createContext, useState } from 'react';
import VetDataService from "../Services/data-service.js"
export const SearchContext = createContext();

export const SearchContextProvider = (props) => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm")|| null);
  const [items, setItems] = useState([]);
  const pathname = window.location.pathname;

  async function fetchData (){
    if(pathname === '/' || pathname.startsWith('/s/')){
      console.log('fetching data')
      try{
        const result = await VetDataService.find(searchTerm);
        setItems(result.data);
        // Important: do not uncomment until figure out why they log different things
        // console.log(result.data);
        // console.log(items)
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

