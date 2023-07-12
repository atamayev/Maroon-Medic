import CalendarDB from "../db/calendar-DB.js"
import FetchPublicDoctorDataDB from "../db/fetch-public-doctor-data-DB.js"
import FetchDoctorAccountDataDB from "../db/private-doctor-data/fetch-doctor-account-data-DB.js"

/** returnDoctorPageData searches for a particular Doctor's data
 *  Used to fill in doctor screen (particular doctor)
 *  Doctor_credentials & basic_Doctor_info are joined on the DocID, the data returned back to the client
 * @param {int} req: DocID is passed in
 * @param {*} res: The user's specific information from Doctor_credentials & basic_Doctor_info is joined and returned
 * @returns Doctor data from the db
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function returnDoctorPageData (req, res) {
  const NVI = req.params.id
  let DoctorID

  try {
    DoctorID = await CalendarDB.retrieveDoctorIDFromNVI(NVI)
  } catch (error) {
    return res.status(400).json()
  }

  try {
    let response = {}
    response.doctorLanguages           = await FetchPublicDoctorDataDB.fetchDoctorLanguages(DoctorID)
    response.doctorServices            = await FetchDoctorAccountDataDB.fetchDoctorServices(DoctorID)
    response.doctorSpecialties         = await FetchPublicDoctorDataDB.fetchDoctorSpecialties(DoctorID)
    response.doctorPreVetEducation     = await FetchPublicDoctorDataDB.fetchPreVetEducation(DoctorID)
    response.doctorVetEducation        = await FetchPublicDoctorDataDB.fetchVetEducation(DoctorID)
    response.doctorAddressData         = await FetchPublicDoctorDataDB.fetchDoctorAddressData(DoctorID)
    response.description               = await FetchDoctorAccountDataDB.fetchDescriptionData(DoctorID)
    response.servicedPets              = await FetchPublicDoctorDataDB.fetchServicedPets(DoctorID)
    //response.doctorPictures            = await FetchDoctorAccountDataDB.fetchDoctorPictures(DoctorID)
    response.doctorPersonalInfo        = await FetchPublicDoctorDataDB.fetchDoctorPersonalInfo(DoctorID)
    response.doctorPersonalInfo["NVI"] = NVI
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json([])
  }
}
