import {connection, useDB} from "../dbAndSecurity/connect.js";
import Crypto from "../dbAndSecurity/crypto.js";
import { UUID_to_ID } from "../dbAndSecurity/UUID.js";

export async function headerData (req, res){ // for both pateints, and docs -- just fetches the name - to set in the dropdown menu
    const cookies = req.cookies
    let UUID;
    let type;
    if("DoctorAccessToken" in cookies){
        UUID = req.cookies.DoctorUUID
        type = 'Doctor';
    }else if("PatientAccessToken" in cookies){
        UUID = req.cookies.PatientUUID
        type = 'Patient';
    }
    else{
        return res.send('Invalid User Type') // If Type not Doctor or Patient
    }
    const table_name1 = `${type}_credentials`; // will not work bc doctor/patient not the same case( uppercase vs lowercase) in credentials vsdata 
    const table_name2 = `basic_${type}_info`;
    const DB_name = `${type}DB`;
    const sql = `SELECT ${table_name2}.FirstName FROM ${table_name2} JOIN ${table_name1} ON ${table_name2}.${type}_ID = ${table_name1}.${type}ID WHERE ${table_name1}.${type}ID = ?`
    const ID = await UUID_to_ID(UUID, type)

    const values = [ID];
    await useDB(headerData.name, DB_name, table_name1)
    
    try{
        const [results] = await connection.execute(sql, values)
         if (results.length === 0) {
            console.log('User does not exist')
            res.send('User does not exist');
        } else {
            const decrypted = Crypto.decryptSingle(results[0])
            return res.status(200).json(decrypted);
        }
    }catch(error){
        console.log('error encountered in catching UUIDtoID')
        return res.send('User does not exist')
        // return res.status(500).send({ error: 'proprietaryHomePageData Error' });
    }
}

/** UUIDtoDoctorID takes in the UUID, and searches for it's complementary DoctorID, returning to user
 * Note, this is practically the same function as DoctorUUID_to_DoctorID in UUID.js. The reason for having two similar functions is that this one returns data to the user, in the form of a JSON
 * DoctorUUID_to_DoctorID in UUID.js is soley a back-end function, used to return the Doctor's UUID as a string.
 * @param {*} req UUID, Type (type = patient or Doctor)
 * @param {*} res JSON
 * @returns Corresponding ID
 */
export async function UUIDtoID (req, res){
    try{
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

        const table_name = `${type}UUID_reference`;
        const DB_name = `${type}DB`;
        const sql = `SELECT ${type}_ID FROM ${table_name} WHERE ${type}UUID = ?`;
        const values = [UUID];

        await useDB(UUIDtoID.name, DB_name, table_name)
        
        try{
            const [results] = await connection.execute(sql, values)
            return res.status(200).json(results)
        }catch(error){
            console.log('error encountered in catching UUIDtoID')
            return res.send('User does not exist')
            // return res.status(500).send({ error: 'proprietaryHomePageData Error' });
        }
    }catch(error){
        console.log('error in UUIDtoID ', error);
        return res.send('User does not exist')
    }
};

// export async function checkUUID (req, res){
//     const cookies = req.cookies
//     let response = {
//         isValid: false,
//         cookieValue: '',
//         type: ''
//     };

//     if("DoctorAccessToken" in cookies){
//         response.type = 'Doctor';
//     }else if("PatientAccessToken" in cookies){
//         response.type = 'Patient';
//     }
//     else{
//         return res.send('Invalid User Type') // If Type not Doctor or Patient
//     }

//     const UUID = req.cookies[`${response.type}UUID`]
//     const table_name = `${response.type}UUID_reference`;
//     const DB_name = `${response.type}DB`;
//     const sql = `SELECT * FROM ${table_name} WHERE ${response.type}UUID = ?`;

//     try{
//         const values = [UUID];
//         await useDB(checkUUID.name, DB_name, table_name)

//         const [results] = await connection.execute(sql, values)
//         if(results.length === 1){
//             response.isValid = true;
//             response.cookieValue = UUID;
//             return res.status(200).json(response);
//         }
//         else{
//             console.log('Invalid UUID')
//             return res.status(500).json(error);     
//         }
//     }catch(error){
//         console.log('error encountered in trying checkUUID')
//         return res.status(500).json(error);
//     }
// };
