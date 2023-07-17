import CalendarDB from "../db/calendar-DB.js"
import OperationHandler from "../utils/operation-handler.js"
import FetchPublicDoctorData from "../utils/fetch-account-and-public-data/fetch-public-doctor-data.js"
import FetchDoctorAccountData from "../utils/fetch-account-and-public-data/fetch-doctor-account-data.js"

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
  const DoctorID = await OperationHandler.executeAsyncAndReturnValue(res, CalendarDB.retrieveDoctorIDFromNVI, NVI)

  try {
    let response = {}
    response.doctorLanguages           = await FetchPublicDoctorData.fetchDoctorLanguages(DoctorID)
    response.doctorServices            = await FetchDoctorAccountData.fetchDoctorServices(DoctorID)
    response.doctorSpecialties         = await FetchPublicDoctorData.fetchDoctorSpecialties(DoctorID)
    response.doctorPreVetEducation     = await FetchPublicDoctorData.fetchPreVetEducation(DoctorID)
    response.doctorVetEducation        = await FetchPublicDoctorData.fetchVetEducation(DoctorID)
    response.doctorAddressData         = await FetchPublicDoctorData.fetchDoctorAddressData(DoctorID)
    response.description               = await FetchDoctorAccountData.fetchDescriptionData(DoctorID)
    response.servicedPets              = await FetchPublicDoctorData.fetchServicedPets(DoctorID)
    //response.doctorPictures            = await FetchDoctorAccountData.fetchDoctorPictures(DoctorID)
    response.doctorPersonalInfo        = await FetchPublicDoctorData.fetchDoctorPersonalInfo(DoctorID)
    response.doctorPersonalInfo["NVI"] = NVI
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json([])
  }
}
