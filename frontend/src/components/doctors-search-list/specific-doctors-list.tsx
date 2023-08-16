import _ from "lodash"
import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { SearchContext } from "src/contexts/search-context"
import SearchResults from "./search-results"
import Header from "../header/header"

export default function SpecificDoctorsList() {
  const {searchTerm, items, setSearchTerm, fetchData} = useContext(SearchContext)
  const { query } = useParams()

  if (!query) window.location.href = "/"

  useEffect(() => {
    setSearchTerm(query || "")
    fetchData()
  }, [searchTerm])

  const RenderSearchResults = () => {
    if (_.isEmpty(items)) return <div> No results</div>
    // This has no function rn, since there are less than 1000 vets. once there are more, only the first 100 will be returned
    const data = items.slice(0, 1000)
    return <SearchResults data = {data}/>
  }

  return (
    <>
      <Header search = {true} dropdown = {true}/>
      <RenderSearchResults />
    </>
  )
}
