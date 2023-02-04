import React, { createContext, useEffect, useState } from 'react';
import VetDataService from "../Services/vet-service.js"
const SearchContext = createContext();

const SearchContextProvider = (props) => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [items, setItems] = useState([]);
  
  useEffect(()=>{
    fetchData();
  }, []);
  
  async function fetchData (searchTerm){
    try{
      const result = await VetDataService.find(searchTerm);
      console.log(result.data)
      setItems(result.data);
    }
    catch(error){
      console.log('error in search context',error)
    }
  }

  // useEffect(()=>{
  //   const fetchData = async (searchTerm) => {
  //     // Fetch all items from the database
  //     try{
  //       const result = await VetDataService.find(searchTerm);
  //       console.log(result.data)
  //       setItems(result.data);
  //     }
  //     catch(error){
  //       console.log('error in search context',error)
  //     }
  //   }
  //   fetchData();
  // }, []);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, items, fetchData}}>
      {props.children}
    </SearchContext.Provider>
  );
};

export { SearchContext, SearchContextProvider };
