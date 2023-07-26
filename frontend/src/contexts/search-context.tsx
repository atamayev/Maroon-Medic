import { createContext, useState } from "react"
import SearchDataService from "../services/search-data-service.js"

interface Props {
  children: JSX.Element | JSX.Element[]
}

type DoctorData = {
  NVI: number
  FirstName: string
  LastName: string
}

interface SearchContextType {
  searchTerm: string | null
  setSearchTerm: (value: string | null) => void
  items: DoctorData[]
  fetchData: () => void
}

const defaultSearchContext: SearchContextType = {
  searchTerm: null,
  setSearchTerm: () => {},
  items: [],
  fetchData: () => {},
};

export const SearchContext = createContext<SearchContextType>(defaultSearchContext);

export const SearchContextProvider = (props: Props) => {
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
        console.log(error)
      }
    }
  }

  return (
    <SearchContext.Provider value = {{ searchTerm, setSearchTerm, items, fetchData }}>
      {props.children}
    </SearchContext.Provider>
  )
}
