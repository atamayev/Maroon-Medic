import { useEffect, useState } from "react"
import SearchResults from "./search-results"
import fetchDoctorHomeList from "src/helper-functions/search"

export default function HomeDoctorsList() {
	const [doctorData, setDoctorData] = useState<DoctorData[]>([])

	const retrieveData = async () => {
		try {
			const data = await fetchDoctorHomeList()
			setDoctorData(data)
		} catch (error) {

		}
	}

	useEffect(() => {
		retrieveData()
	}, [])

	return <SearchResults data = {doctorData}/>
}
