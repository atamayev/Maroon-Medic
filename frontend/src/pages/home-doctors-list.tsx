import { useContext, useEffect } from "react"
import { SearchContext } from "../contexts/search-context"
import SearchResults from "../components/search-results"
import Header from "./header"

export default function HomeDoctorsList() {
  const {items, fetchData, setSearchTerm } = useContext(SearchContext)

  useEffect(() => {
    setSearchTerm("")
    fetchData()
  }, [])

  // This has no function rn, since there are less than 1000 users. once there are more, only the first 100 will be returned
  const data = items.slice(0, 1000)

  return (
    <>
      <Header search = {true} dropdown = {true}/>
      <SearchResults data = {data}/>
    </>
  )
}
