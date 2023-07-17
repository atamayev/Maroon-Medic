import _ from "lodash"
import SearchDB from "../db/search-DB.js"
import FetchAllLists from "../utils/fetch-all-lists.js"
import OperationHandler from "../utils/operation-handler.js"

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
  const operation = async () => {
    return await SearchDB.retrieveAllDoctors()
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

// The following three functions are here for filtering purposes. In the future, pts will be able to filter for docs by language_spoken, insurances, etc.
export async function fetchAllLanguages (req, res) {
  const operation = async () => {
    return await FetchAllLists.fetchAllLanguages()
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchAllServicesAndCategories (req, res) {
  const operation = async () => {
    return await FetchAllLists.fetchAllServicesAndCategories()
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchAllInsurances (req, res) {
  const operation = async () => {
    return await FetchAllLists.fetchAllInsurances()
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}
