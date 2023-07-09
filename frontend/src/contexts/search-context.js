import { createContext, useState } from "react"
import SearchDataService from "../services/search-data-service.js"

export const SearchContext = createContext()

export const SearchContextProvider = (props) => {
  const [searchTerm, setSearchTerm] = useState(sessionStorage.getItem("searchTerm") || null)
  const [items, setItems] = useState([])

  async function fetchData () {
    const pathname = window.location.pathname
    let fetchFunction

    if (pathname === "/") fetchFunction = SearchDataService.fetchAllUsers
    else if (pathname.startsWith("/s/")) fetchFunction = SearchDataService.searchByQuery

    if (fetchFunction) {
      try {
        const result = await fetchFunction(searchTerm)
        setItems(result.data)
      } catch (error) {
      }
    }
  }

  return (
    <SearchContext.Provider value = {{ searchTerm, setSearchTerm, items, fetchData }}>
      {props.children}
    </SearchContext.Provider>
  )
}
