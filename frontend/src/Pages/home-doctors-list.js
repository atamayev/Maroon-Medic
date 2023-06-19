import React, {useContext, useEffect} from 'react';
import { SearchContext } from '../contexts/search-context';
import SearchResults from '../components/search-results';
import Header from './header';

export default function HomeDoctorsList() {
  const {items, fetchData, setSearchTerm } = useContext(SearchContext)
  
  useEffect(() => {
    setSearchTerm("")
    fetchData();
  }, [])
  
  if (!items || items === "Vet not found") return <div> No results</div>
  
  const data = items.slice(0, 1000); // This has no function rn, since there are less than 1000 users. once there are more, only the first 100 will be returned

  return (
    <>
      <Header search = {true} dropdown = {true}/>
      <SearchResults data = {data}/>
    </>
  );
};
