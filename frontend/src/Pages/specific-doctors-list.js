import React, {useContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import { SearchContext } from '../Contexts/SearchContext';
import SearchResults from '../Components/search-results';
import Header from './header';

export default function SpecificDoctorsList() {
  const {searchTerm, items, setSearchTerm, fetchData} = useContext(SearchContext)
  
  let { query } = useParams(); //the id of the current site (which user) --> used to set User
  console.log(query)
 
  if (!query){
      window.location.href = '/';
  }
  useEffect(()=>{
    console.log('1)In Specific Doctors List')
    setSearchTerm(query)
    fetchData()
  }, [searchTerm])

  if (!items || items === 'User not found'){
    return (
        <div> 
          <Header search = {true} className = "d-flex align-items-center justify-content-center w-100"/>
          No results
          </div>
    );
  }

  else{
    const data = items.slice(0, 1000); // This has no function rn, since there are less than 1000 vets. once there are more, only the first 100 will be returned

    return (
      <>
      <Header search = {true} className = "d-flex align-items-center justify-content-center w-100"/>
      <SearchResults data = {data}/>
      </>
    );
  }
}