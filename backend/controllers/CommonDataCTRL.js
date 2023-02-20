import { UUID_to_ID } from "../dbAndSecurity/UUID.js";


/** UUIDtoDoctorID takes in the UUID, and searches for it's complementary DoctorID, returning to user
 * Note, this is practically the same function as DoctorUUID_to_DoctorID in UUID.js. The reason for having two similar functions is that this one returns data to the user, in the form of a JSON
 * DoctorUUID_to_DoctorID in UUID.js is soley a back-end function, used to return the Doctor's UUID as a string.
 * @param {*} req UUID, Type (type = patient or Doctor)
 * @param {*} res JSON
 * @returns Corresponding ID
 */
export async function UUIDtoID (req, res){
    // console.log('in uuid to id')
    const cookies = req.cookies
    let UUID;
    let type;
    if("DoctorAccessToken" in cookies){
        UUID = req.cookies.DoctorUUID
        type = 'Doctor';
    } else if("PatientAccessToken" in cookies){
        UUID = req.cookies.PatientUUID
        type = 'Patient';
    } else{
        return res.send('Invalid User Type') // If Type not Doctor or Patient
    }
    try{
        const results = await UUID_to_ID(UUID, type)
        return res.status(200).json(results)
    }catch(error){
        return res.send('Error in User ID conversion')
    }
};
