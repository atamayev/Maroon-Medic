import http from "../http-common"

export default new class SearchDataService {
	async searchByQuery(query) {
		return await http.get(`search/s/${query}`);
	}
	async fetchAllUsers() {
		return await http.get('search/fetchAllUsers');
	}
}();
