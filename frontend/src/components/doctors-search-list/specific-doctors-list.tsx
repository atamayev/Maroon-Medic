import _ from "lodash"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import SearchResults from "./search-results"
import fetchDoctorHomeList from "src/helper-functions/search"

export default function SpecificDoctorsList() {
	const [doctorData, setDoctorData] = useState<DoctorData[]>([])
	const { query } = useParams()

	if (!query) window.location.href = "/"

	const retrieveData = async (searchQuery: string) => {
		const data = await fetchDoctorHomeList(searchQuery)
		setDoctorData(data)
	}

	useEffect(() => {
		if (_.isUndefined(query)) {
			window.location.href = "/"
			return
		}
		retrieveData(query)
	}, [query])

	if (_.isEmpty(doctorData)) return <div> No results</div>

	return <SearchResults data = {doctorData}/>
}
