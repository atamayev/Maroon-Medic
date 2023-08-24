import { useContext, useEffect } from "react"
import { SearchContext } from "../../contexts/search-context"
import SearchResults from "./search-results"

export default function HomeDoctorsList() {
	const {items, fetchData, setSearchTerm } = useContext(SearchContext)

	useEffect(() => {
		setSearchTerm("")
		fetchData()
	}, [])

	// This has no function rn, since there are less than 1000 users. once there are more, only the first 100 will be returned
	const data = items.slice(0, 1000)

	return <SearchResults data = {data}/>
}
