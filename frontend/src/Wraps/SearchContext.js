import React, { createContext, useEffect, useState } from 'react';
import VetDataService from "../Services/vet-service.js"
export const SearchContext = createContext();

export const SearchContextProvider = (props) => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem("searchTerm")|| null);
  const [items, setItems] = useState([]);
  const pathname = window.location.pathname;

  async function fetchData (){
    if(pathname === '/' || pathname.startsWith('/s/')){
      try{
        const result = await VetDataService.find(searchTerm);
        setItems(result.data);
      }
      catch(error){
        console.log('error in search context',error)
      }
    }
  }

  useEffect(()=>{
    localStorage.setItem("searchTerm", searchTerm)
    fetchData()
  }, [searchTerm]);
  
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, items, fetchData}}>
      {props.children}
    </SearchContext.Provider>
  );
};

