import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { SearchContext } from "../contexts/search-context"
import SearchResults from "../components/search-results"
import Header from "./header"

export default function SpecificDoctorsList() {
  const {searchTerm, items, setSearchTerm, fetchData} = useContext(SearchContext)

  const { query } = useParams() //the id of the current site (which user) --> used to set User

  if (!query) window.location.href = "/"

  useEffect(() => {
    setSearchTerm(query)
    fetchData()
  }, [searchTerm])

  const renderSearchResults = () => {
    if (!items || items === "User not found") return <div> No results</div>
    else {
      const data = items.slice(0, 1000) // This has no function rn, since there are less than 1000 vets. once there are more, only the first 100 will be returned
      return <SearchResults data = {data}/>
    }
  }

  return (
    <>
      <Header search = {true} dropdown = {true}/>
      {renderSearchResults()}
    </>
  )
}