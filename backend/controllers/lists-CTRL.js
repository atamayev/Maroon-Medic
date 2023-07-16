import FetchAllLists from "../utils/fetch-all-lists.js"

/** fetchAccountDetails creates a list of objects contains all of the Lists from the DB
 *  Doctors fill in their personal details using options from these lists.
 * @param {N/A} req
 * @param {Array} res An Array of objects, filled with all possible list data
 * @returns Objects from List data
 * DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function fetchDoctorLists (req, res) {
  try {
    let response = {}
    response.languages             = await FetchAllLists.fetchAllLanguages()
    response.servicesAndCategories = await FetchAllLists.fetchAllServicesAndCategories()
    response.specialties           = await FetchAllLists.fetchAllSpecialties()
    response.preVetSchools         = await FetchAllLists.fetchAllPreVetSchools()
    response.preVetEducationTypes  = await FetchAllLists.fetchAllPreVetEducationTypes()
    response.majors                = await FetchAllLists.fetchAllMajors()
    response.vetSchools            = await FetchAllLists.fetchAllVetSchools()
    response.vetEducationTypes     = await FetchAllLists.fetchAllVetEducationTypes()
    response.pets                  = await FetchAllLists.fetchAllPets()
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json([])
  }
}

/** Returns a list of insurances and languages
 * @param {} req
 * @param {Array} res Array of 2 Arrays: Insurances, Languages
 * @returns
 */
export async function fetchPatientLists (req, res) {
  try {
    let response = {}
    response.languages  = await FetchAllLists.fetchAllLanguages()
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json([])
  }
}

/** fetchPetTypes retrieves a list of all the petTypes from the DB
 * @param {} req N/A
 * @param {Array} res PetTypes or nothing (if error)
 * @returns PetTypes
 * DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function fetchPetTypes (req, res) {
  try {
    const response = await FetchAllLists.fetchAllPets()
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json([])
  }
}

export async function fetchInsurances (req, res) {
  try {
    const response = await FetchAllLists.fetchAllInsurances()
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json([])
  }
}
