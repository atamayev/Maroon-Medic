import FetchPublicDoctorData from "./fetchPublicDoctorData.js";
import FetchDoctorAccountData from "../privateDoctorData/fetchDoctorAccountData.js";
import { DB_Operation, connection } from "../../dbAndSecurityAndHelperFunctions/connect.js";

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
        console.log(`error in ${returnDoctorPageData.name}:`, error);
        return res.status(400).json();
    }
   
    let response = [];
    try {
        response.push(await FetchPublicDoctorData.FetchDoctorInsurances(DoctorID));
        response.push(await FetchPublicDoctorData.FetchDoctorLanguages(DoctorID));
        response.push(await FetchDoctorAccountData.FetchDoctorServices(DoctorID));
        response.push(await FetchPublicDoctorData.FetchDoctorSpecialties(DoctorID));
        response.push(await FetchDoctorAccountData.FetchPreVetEducation(DoctorID));
        response.push(await FetchDoctorAccountData.FetchVetEducation(DoctorID));
        response.push(await FetchPublicDoctorData.FetchDoctorAddressData(DoctorID));
        response.push(await FetchDoctorAccountData.FetchDescriptionData(DoctorID)); 
        response.push(await FetchDoctorAccountData.FetchDoctorPictures(DoctorID));
        response.push(await FetchPublicDoctorData.FetchDoctorPersonalInfo(DoctorID));
        response[9]['NVI'] = NVI;
        return res.status(200).json(response);
    } catch(error) {
        console.log('error in returnDoctorPageData', error);
        const emptyResponse = [];
        return res.status(400).json(emptyResponse);
    }
};
