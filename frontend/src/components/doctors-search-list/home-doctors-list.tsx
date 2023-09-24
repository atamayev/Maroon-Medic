import { useEffect, useState } from "react"
import SearchResults from "./search-results"
import fetchDoctorHomeList from "src/helper-functions/search"

export default function HomeDoctorsList() {
	const [doctorData, setDoctorData] = useState<DoctorData[]>([])

	const retrieveData = async () => {
		const data = await fetchDoctorHomeList()
		setDoctorData(data)
	}

	useEffect(() => {
		retrieveData()
	}, [])

	return <SearchResults data = {doctorData}/>
}
