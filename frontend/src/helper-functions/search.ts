import SearchDataService from "src/services/search-data-service"

export default async function fetchDoctorHomeList(searchTerm?: string): Promise<DoctorData[]> {
	if (!searchTerm) {
		const result = await SearchDataService.fetchAllUsers()
		return result.data
	} else {
		const result = await SearchDataService.searchByQuery(searchTerm)
		return result.data
	}
}
