import { createContext, useState } from "react"
import SearchDataService from "../services/search-data-service"

interface Props {
	children: JSX.Element | JSX.Element[]
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

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SearchContext = createContext<SearchContextType>(defaultSearchContext)

export function SearchContextProvider (props: Props) {
	const [searchTerm, setSearchTerm] = useState(sessionStorage.getItem("searchTerm") || "")
	const [items, setItems] = useState<DoctorPersonalData[]>([])

	async function fetchData () {
		const pathname = window.location.pathname

		try {
			let result: DoctorPersonalData[] = []
			if (pathname === "/") {
				result = (await SearchDataService.fetchAllUsers()).data
			} else if (pathname.startsWith("/s/")) {
				result = (await SearchDataService.searchByQuery(searchTerm)).data
			}
			setItems(result)
		} catch (error) {
		}
	}

	return (
		<SearchContext.Provider value = {{ searchTerm, setSearchTerm, items, fetchData }}>
			{props.children}
		</SearchContext.Provider>
	)
}
