import { createContext, useState } from "react"
import SearchDataService from "../services/search-data-service"

interface Props {
  children: JSX.Element | JSX.Element[]
}

type DoctorData = {
  NVI: number
  FirstName: string
  LastName: string
}

interface SearchContextType {
  searchTerm: string
  setSearchTerm: (value: string) => void
  items: DoctorData[]
  fetchData: () => void
}

const defaultSearchContext: SearchContextType = {
  searchTerm: "",
  setSearchTerm: () => {},
  items: [],
  fetchData: () => {},
}

export const SearchContext = createContext<SearchContextType>(defaultSearchContext)

export const SearchContextProvider = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState(sessionStorage.getItem("searchTerm") || "")
  const [items, setItems] = useState([])

  async function fetchData () {
    const pathname = window.location.pathname

    try {
      let result
      if (pathname === "/") {
        result = await SearchDataService.fetchAllUsers()
      } else if (pathname.startsWith("/s/")) {
        result = await SearchDataService.searchByQuery(searchTerm)
      }
      if (result) setItems(result.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <SearchContext.Provider value = {{ searchTerm, setSearchTerm, items, fetchData }}>
      {props.children}
    </SearchContext.Provider>
  )
}
