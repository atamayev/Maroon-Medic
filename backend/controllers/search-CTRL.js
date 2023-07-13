import _ from "lodash"
import SearchDB from "../db/search-DB.js"
import FetchAllLists from "../utils/fetch-all-lists.js"

/** searchByQuery returns all users that fit the client's search
 * @param {String} req Query is passed in
 * @param {Array} res
 * @returns Returns an array of users, depending on the outcome of the query
 */
export async function searchByQuery (req, res) {
  const userQuery = req.params.query
  try {
    const searchResults = await SearchDB.retrieveDoctorsFromSearchTerm(userQuery)
    if (_.isEmpty(searchResults)) return res.json("User not found")
    else return res.json(searchResults)
  } catch (error) {
    return res.json({ error: "Search by Query Error" })
  }
}

/** fetchUsers returns all records from the Doctor_credentials table
 *  fetchUsers is not directly called. It is called within the searchByQuery function in searchCTRL.js, if no query is received
 *  Used to fill the home screen, only selects doctors that are verified, and publicly available
 * @param {*} req - N/A
 * @param {Array} res Array of Doctor Data Objects
 * @returns Either an array of results, or a message with an error
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function fetchUsers (req, res) {
  try {
    const doctorsList = await SearchDB.retrieveAllDoctors()
    return res.json(doctorsList)
  } catch (error) {
    return res.json({ error: "Fetch Users Error" })
  }
}

// The following three functions are here for filtering purposes. In the future, pts will be able to filter for docs by language_spoken, insurances, etc.
export async function fetchAllLanguages (req, res) {
  try {
    const LanguageList = FetchAllLists.fetchAllLanguages()
    return res.status(200).json(LanguageList)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export async function fetchAllServicesAndCategories (req, res) {
  try {
    const ServicesList = FetchAllLists.fetchAllServicesAndCategories()
    return res.status(200).json(ServicesList)
  } catch (error) {
    return res.status(500).json(error)
  }
}

export async function fetchAllInsurances (req, res) {
  try {
    const InsurancesList = FetchAllLists.fetchAllInsurances()
    return res.status(200).json(InsurancesList)
  } catch (error) {
    return res.status(500).json(error)
  }
}
