import _ from "lodash"
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
dayjs.extend(customParseFormat) // extend Day.js with the plugin
import { UUID_to_ID } from "../../db-and-security-and-helper-functions/UUID.js"
import {connection, DB_Operation} from "../../db-and-security-and-helper-functions/connect.js"
import { clearCookies } from "../../db-and-security-and-helper-functions/cookie-operations.js"

/** savePersonalData is self-explanatory in name
 *  First, checks if the patient already has saved data in the DB.
 *  If there is no data saved, the data is added. If there is data, then it is updated
 * @param {Array} req Contains Patient's UUID as a cookie, and the personalInfo
 * @param {*} res 200/400 status code
 * @returns 200/400 status code
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function savePersonalData (req, res) {
    const PatientUUID = req.cookies.PatientUUID
    let PatientID
    try {
        PatientID = await UUID_to_ID(PatientUUID)
    } catch (error) {
        clearCookies(res, "Patient")
        return res.status(401).json({ shouldRedirect: true, redirectURL: "/patient-login" })
    }

    const personalInfo = req.body.personalInfo

    const basic_user_info = "basic_user_info"
    const sql = `SELECT basic_user_infoID FROM  ${basic_user_info} WHERE User_ID = ?`
    const values = [PatientID]
    let results

    await DB_Operation(savePersonalData.name, basic_user_info)
    try {
        [results] = await connection.execute(sql, values)
    } catch(error) {
        return res.status(400).json()
    }

    // Combine date parts into a single string
    const dateOfBirthStr = `${personalInfo.DOB_month} ${personalInfo.DOB_day} ${personalInfo.DOB_year}`

    // Convert the string to a Date object and format it
    const dateOfBirth = dayjs(dateOfBirthStr, "MMMM D YYYY").format("YYYY-MM-DD")

    const values1 = [personalInfo.FirstName, personalInfo.LastName, personalInfo.Gender, dateOfBirth, PatientID]

    if (_.isEmpty(results)) {// if no results, then insert.
        const sql1 = `INSERT INTO ${basic_user_info} (FirstName, LastName, Gender, DOB, User_ID) VALUES (?, ?, ?, ?, ?)`
        try {
            await connection.execute(sql1, values1)
            return res.status(200).json()
        } catch(error) {
            return res.status(400).json()
        }
    } else {// if there are results, that means that the record exists, and needs to be altered
        const sql2 = `UPDATE ${basic_user_info} SET FirstName = ?, LastName = ?, Gender = ?, DOB = ? WHERE User_ID = ?`
        try {
            await connection.execute(sql2, values1)
            return res.status(200).json()
        } catch(error) {
            return res.status(400).json()
        }
    }
}

/** saveLanguageData saves either Language
 *  First, converts from PatientUUID to PatientID. Then, performs operations depending on the operationType
 *  The mapping file is chosen based on the DataType (can either be Specialty, or Language)
 * @param {String} req Cookie from client, type of data, list of data (ie list of languages, or insurances)
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function saveLanguageData (req, res) {
    const PatientUUID = req.cookies.PatientUUID
    let PatientID
    try {
        PatientID = await UUID_to_ID(PatientUUID)
    } catch (error) {
        clearCookies(res, "Patient")
        return res.status(401).json({ shouldRedirect: true, redirectURL: "/patient-login" })
    }

    const operationType = req.body.operationType

    const patientData = req.body.Data // The Data is an array of the ID of the DataType ([6]), which is a specific Language_ID)

    const language_mapping = "language_mapping"

    await DB_Operation(saveLanguageData.name, language_mapping)

    if (operationType === "add") {
        const sql = `INSERT INTO ${language_mapping} (Language_ID, User_ID) VALUES (?, ?)`
        const values = [patientData, PatientID]
        try {
            await connection.execute(sql, values)
            return res.status(200).json()
        } catch(error) {
            return res.status(400).json()
        }
    } else if (operationType === "delete") {
        const sql = `DELETE FROM ${language_mapping} WHERE Language_ID = ? AND User_ID = ?`
        const values = [patientData, PatientID]
        try {
            await connection.execute(sql, values)
            return res.status(200).json()
        } catch(error) {
            return res.status(400).json()
        }
    } else {
        return res.status(400).json()
    }
}

/** savePetData is self-explanatory in name
 *  First, converts from PatientUUID to PatientID. Then, performs operations depending on the operationType
 * @param {String} req Cookie from client, type of data, list of data (ie list of languages, or insurances)
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 6/4/23
 */
export async function savePetData (req, res) {
    const PatientUUID = req.cookies.PatientUUID
    let PatientID
    try {
        PatientID = await UUID_to_ID(PatientUUID)
    } catch (error) {
        clearCookies(res, "Patient")
        return res.status(401).json({ shouldRedirect: true, redirectURL: "/patient-login" })
    }

    let PetData = req.body.PetData
    const operationType = req.body.operationType//adding, deleting, updating

    const pet_info = "pet_info"
    const insurance_mapping = "insurance_mapping"

    await DB_Operation(savePetData.name, pet_info)

    if (operationType === "add") {
        const sql = `INSERT INTO ${pet_info} (Name, Gender, DOB, Patient_ID, pet_ID, isActive) VALUES (?, ?, ?, ?, ?, ?)`
        const values = [PetData.Name, PetData.Gender, PetData.DOB, PatientID, PetData.pet_listID, 1]
        let result
        try {
            [result] = await connection.execute(sql, values)
            PetData.pet_infoID = result.insertId
        } catch(error) {
            return res.status(400).json()
        }

        await DB_Operation(savePetData.name, insurance_mapping)

        const sql1 = `INSERT INTO ${insurance_mapping} (Insurance_ID, pet_info_ID) VALUES (?, ?)`
        const values1 = [PetData.insurance_listID, PetData.pet_infoID]
        try {
            await connection.execute(sql1, values1)
            return res.status(200).json(PetData.pet_infoID)
        } catch(error) {
            return res.status(400).json()
        }
    } else if (operationType === "delete") {
        const sql = `UPDATE ${pet_info} SET isActive = 0 WHERE pet_infoID = ?`
        const values = [PetData]
        await DB_Operation(savePetData.name, insurance_mapping)

        try {
            await connection.execute(sql, values)
            return res.status(200).json()
        } catch(error) {
            return res.status(400).json()
        }
    } else {
        return res.status(400).json()
    }
}
