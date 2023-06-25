import { DB_Operation, connection } from "../db-and-security-and-helper-functions/connect.js";
import FetchPublicDoctorData from "../db-and-security-and-helper-functions/fetch-data/fetch-public-doctor-data.js";
import FetchDoctorAccountData from "../db-and-security-and-helper-functions/fetch-data/fetch-doctor-account-data.js";

/** returnDoctorPageData searches for a particular Doctor's data
 *  Used to fill in doctor screen (particular doctor)
 *  Doctor_credentials & basic_Doctor_info are joined on the DocID, the data returned back to the client
 * @param {int} req: DocID is passed in
 * @param {*} res: The user's specific information from Doctor_credentials & basic_Doctor_info is joined and returned
 * @returns Doctor data from the db
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function returnDoctorPageData (req, res) {
    const NVI = req.params.id;
    const Doctor_specific_info = 'Doctor_specific_info';
    const sql = `SELECT Doctor_ID FROM ${Doctor_specific_info} WHERE NVI = ?`;
    const values = [NVI];
    let DoctorID;

    await DB_Operation(returnDoctorPageData.name, Doctor_specific_info);
    try {
        const [results] = await connection.execute(sql, values);
        DoctorID = results[0].Doctor_ID
    } catch(error) {
        return res.status(400).json();
    }
   
    try {
        let response = {};
        response.doctorLanguages           = await FetchPublicDoctorData.fetchDoctorLanguages(DoctorID);
        response.doctorServices            = await FetchDoctorAccountData.fetchDoctorServices(DoctorID);
        response.doctorSpecialties         = await FetchPublicDoctorData.fetchDoctorSpecialties(DoctorID);
        response.doctorPreVetEducation     = await FetchDoctorAccountData.fetchPreVetEducation(DoctorID);
        response.doctorVetEducation        = await FetchDoctorAccountData.fetchVetEducation(DoctorID);
        response.doctorAddressData         = await FetchPublicDoctorData.fetchDoctorAddressData(DoctorID);
        response.description               = await FetchDoctorAccountData.fetchDescriptionData(DoctorID);
        //response.doctorPictures            = await FetchDoctorAccountData.fetchDoctorPictures(DoctorID);
        response.doctorPersonalInfo        = await FetchPublicDoctorData.fetchDoctorPersonalInfo(DoctorID);
        response.doctorPersonalInfo['NVI'] = NVI;
        return res.status(200).json(response);
    } catch(error) {
        const emptyResponse = [];
        return res.status(400).json(emptyResponse);
    }
};
