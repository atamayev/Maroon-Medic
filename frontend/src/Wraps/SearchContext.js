import React, { createContext, useState } from 'react';
import VetDataService from "../Services/data-service.js"
export const SearchContext = createContext();

export const SearchContextProvider = (props) => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm")|| null);
  const [items, setItems] = useState([]);
  const pathname = window.location.pathname;

  async function fetchData (){
    console.log('in fetch data')

    if(pathname === '/'){
      console.log('3.5)fetching data')
      try{
        const result = await VetDataService.fetchAllUsers();
        setItems(result.data);
      }
      catch(error){
        console.log('error in search context',error)
      }
    }

    if(pathname.startsWith('/s/')){
      console.log('3)fetching data')
      try{
        console.log('4)searchTerm in fetchData', searchTerm)
        const result = await VetDataService.find(searchTerm);
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

