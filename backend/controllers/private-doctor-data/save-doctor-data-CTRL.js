import _ from "lodash"
import TimeUtils from "../../utils/time.js"
import { UUID_to_ID } from "../../setup-and-security/UUID.js"
import { clearCookies } from "../../utils/cookie-operations.js"
import SaveDoctorDataDB from "../../db/private-doctor-data/save-doctor-data-DB.js"
import { getUnchangedAddressRecords, getUpdatedAddressRecords } from "../../utils/address-operations.js"

/** savePersonalData is self-explanatory in name
 *  First, converts from UUID to ID. Then, checks if any records exist in basic_doctor_info.
 *  If records don't exist, then it inserts the data.
 *  if records do exist, the data is updated. depending on wheather the data is entered successfully or not, it returns 200/400
 * @param {String} req Cookie from client
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved corretly
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function savePersonalData (req, res) {
  const DoctorUUID = req.cookies.DoctorUUID
  let DoctorID
  try {
    DoctorID = await UUID_to_ID(DoctorUUID)
  } catch (error) {
    clearCookies(res, "Doctor")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
  }

  let doesRecordExist

  try {
    doesRecordExist = await SaveDoctorDataDB.checkIfPersonalDataExists(DoctorID)
  } catch (error) {
    return res.status(400).json()
  }

  const personalInfo = req.body.personalInfo

  const dateOfBirth = TimeUtils.convertDOBStringIntoMySQLDate(personalInfo.DOB_month, personalInfo.DOB_day, personalInfo.DOB_year)

  if (doesRecordExist) {
    try {
      await SaveDoctorDataDB.updatePersonalData(personalInfo, dateOfBirth, DoctorID)
      return res.status(200).json()
    } catch (error) {
      return res.status(400).json()
    }
  } else {
    try {
      await SaveDoctorDataDB.addPersonalData(personalInfo, dateOfBirth, DoctorID)
      return res.status(200).json()
    } catch (error) {
      return res.status(400).json()
    }
  }
}

/** saveDescriptionData is self-explanatory in name
 *  First, converts from UUID to ID. Then, checks if any records exist in descriptions.
 *  If records don't exist, then it inserts the data.
 *  if records do exist, the data is updated. depending on wheather the data is entered successfully or not, it returns 200/400
 * @param {String} req Cookie from client
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved corretly
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function saveDescriptionData (req, res) {
  const DoctorUUID = req.cookies.DoctorUUID
  let DoctorID
  try {
    DoctorID = await UUID_to_ID(DoctorUUID)
  } catch (error) {
    clearCookies(res, "Doctor")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
  }

  const description = req.body.Description

  let doesDescriptionExist

  try {
    doesDescriptionExist = await SaveDoctorDataDB.checkIfDescriptionExists(DoctorID)
  } catch (error) {
    return res.status(400).json()
  }

  if (doesDescriptionExist) {
    try {
      await SaveDoctorDataDB.updateDescription(description, DoctorID)
      return res.status(200).json()
    } catch (error) {
      return res.status(400).json()
    }
  } else {
    try {
      await SaveDoctorDataDB.addDescription(description, DoctorID)
      return res.status(200).json()
    } catch (error) {
      return res.status(400).json()
    }
  }
}

/** saveGeneralData saves either Language, Pet, or Specialty Data
 *  First, converts from DoctorUUID to DoctorID. Then, performs operations depending on the operationType
 *  Need to set the userID or DoctorID because Languages are used by both Doctors and Patients (and the foreign key is thus User_ID)
 *  The mapping file is chosen based on the DataType (can either be Specialty, or Language)
 * @param {String} req Cookie from client, type of data, list of data (ie list of languages, or specialties)
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 6/423
 */
export async function saveGeneralData (req, res) {
  const DoctorUUID = req.cookies.DoctorUUID
  let DoctorID
  try {
    DoctorID = await UUID_to_ID(DoctorUUID)
  } catch (error) {
    clearCookies(res, "Doctor")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
  }

  const DataType = req.body.DataType
  const DataTypelower = DataType.charAt(0).toLowerCase() + DataType.slice(1)

  let UserIDorDoctorID

  if (DataTypelower === "language") UserIDorDoctorID = "User_ID"
  else UserIDorDoctorID = "Doctor_ID"

  const doctorData = req.body.Data // The Data is an array of the ID of the DataType ([6]), which is a specific Language_ID)

  const operationType = req.body.operationType
  const tableName = `${DataTypelower}_mapping`

  if (operationType !== "add" && operationType !== "delete") return res.status(400).json()
  else if (operationType === "add") {
    try {
      await SaveDoctorDataDB.addGeneralData(doctorData, DoctorID, UserIDorDoctorID, DataType, tableName)
      return res.status(200).json()
    } catch (error) {
      return res.status(400).json()
    }
  } else if (operationType === "delete") {
    try {
      await SaveDoctorDataDB.deleteGeneralData(doctorData, DoctorID, UserIDorDoctorID, DataType, tableName)
      return res.status(200).json()
    } catch (error) {
      return res.status(400).json()
    }
  }
}

/** saveServicesData saves the services that a doctor offers
 *  First, converts from DoctorUUID to DoctorID.
 *  Searches the DB for existing service data.
 *  Finds the difference between the incoming data and the saved data. Inserts/deletes/updates accordingly
 * @param {String} req Cookie from client, list of Servicesdata
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 6/423
 */
export async function saveServicesData (req, res) {
  const DoctorUUID = req.cookies.DoctorUUID
  let DoctorID
  try {
    DoctorID = await UUID_to_ID(DoctorUUID)
  } catch (error) {
    clearCookies(res, "Doctor")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
  }

  const ServicesData = req.body.ServicesData //Array of Objects

  let existingServicesIDs

  try {
    existingServicesIDs = await SaveDoctorDataDB.retrieveExistingServicesIDs(DoctorID)
  } catch (error) {
    return res.status(400).json()
  }

  if (_.isEmpty(existingServicesIDs) && _.isEmpty(ServicesData)) return res.status(400).json() //NO new data or queried results from DB.
  else if (!_.isEmpty(existingServicesIDs)) {
    // Doctor already has data in the table
    const newServicesData = ServicesData

    const resultIDs = new Set(existingServicesIDs.map(result => result.Service_and_Category_ID))//Extracts the Service_and_Category_ID from the DB results

    const addedData = newServicesData.filter(service => !resultIDs.has(service.service_and_category_listID))// Extracts the IDs that are in newServices that are not in resultsIDs

    const serviceIDs = new Set(newServicesData.map(service => service.service_and_category_listID))

    const deletedData = existingServicesIDs.filter(result => !serviceIDs.has(result.Service_and_Category_ID))//Checks for IDs that are in results, but not in ServicesData (these will be deleted)

    const updatedData = []

    ServicesData.forEach(service => {
      const matchingResult = existingServicesIDs.find(result => result.Service_and_Category_ID === service.service_and_category_listID)

      if (matchingResult) {
        if (matchingResult.Service_time !== service.Service_time || matchingResult.Service_price !== service.Service_price) updatedData.push(service)
      }
    })//Checks which results and ServicesData have the same IDs, but some other field has changed (ie. price, time). Adds those objects to updatedData

    if (!_.isEmpty(addedData)) {
      for (let i = 0; i < addedData.length; i++) {
        try {
          await SaveDoctorDataDB.addServicesData(addedData[i], DoctorID)
        } catch (error) {
          return res.status(400).json()
        }
      }
    }
    if (!_.isEmpty(deletedData)) {
      for (let i = 0; i < deletedData.length; i++) {
        try {
          await SaveDoctorDataDB.deleteServicesData(deletedData[i].Service_and_Category_ID, DoctorID)
        } catch (error) {
          return res.status(400).json()
        }
      }
    }
    if (!_.isEmpty(updatedData)) {
      for (let i = 0; i < updatedData.length; i++) {
        try {
          await SaveDoctorDataDB.updateServicesData(updatedData[i], DoctorID)
        } catch (error) {
          return res.status(400).json()
        }
      }
    }
    return res.status(200).json()
  }
  else if (!_.isEmpty(ServicesData)) {
    for (let i = 0; i < ServicesData.length; i++) {
      try {
        await SaveDoctorDataDB.addServicesData(ServicesData[i], DoctorID)
      } catch (error) {
        return res.status(400).json()
      }
    }
    return res.status(200).json()
  }
}

/** saveEducationData is self-explanatory in name
 *  First, converts from DoctorUUID to DoctorID. Then, performs operations depending on the operationType
 *  Depending on wheather the operationType is add or delete, different operations are performed (INSERT vs DELETE)
 * @param {String} req Cookie from client, type of education data, operationType (add or delete), EducationData (ie pre-vet or vet)
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 6/423
 */
export async function saveEducationData (req, res) {
  const DoctorUUID = req.cookies.DoctorUUID
  let DoctorID
  try {
    DoctorID = await UUID_to_ID(DoctorUUID)
  } catch (error) {
    clearCookies(res, "Doctor")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
  }

  const EducationData = req.body.EducationData // array of arrays, to make comparing to sql easier.: ie: [[ 13, 56, 7, "1923-01-01", "1923-01-01" ],[ 698, 13, 9, "1923-01-01", "1923-01-01" ]]
  const EducationType = req.body.EducationType//"pre_vet" or "vet"
  const operationType = req.body.operationType

  try {
    if (operationType !== "add" && operationType !== "delete") return res.status(400).json()
    if (operationType === "add") {
      let insertId
      if (EducationType !== "pre_vet" && EducationType !== "vet") return res.status(400).json()
      else if (EducationType === "pre_vet") insertId = await SaveDoctorDataDB.addPreVetEducationData(EducationData, DoctorID)
      else if (EducationType === "vet") insertId = await SaveDoctorDataDB.addVetEducationData(EducationData, DoctorID)
      return res.status(200).json(insertId)
    }
    else if (operationType === "delete") {
      if (EducationType !== "pre_vet" && EducationType !== "vet") return res.status(400).json()
      else if (EducationType === "pre_vet") await SaveDoctorDataDB.deletePreVetEducationData(EducationData, DoctorID)
      else if (EducationType === "vet") await SaveDoctorDataDB.deleteVetEducationData(EducationData, DoctorID)
      return res.status(200).json()
    }
  } catch (error) {
    return res.status(500).json()
  }
}

/** saveAddressData saves address, phone, and booking availbility data.
 *  This is essentially three functions in one, since we have to operate on addresses, phones, and booking availiblity
 *  First, checks if any address data already exists. If it doesn't, then just add the incoming data, no need to update/delete
 *  If there exists saved data, need to determine if any of the past data has changed, or if data is just being added.
 *  Filters are created which find which of the incoming data is new, updated, unchanged, or deleted (relative to the savedData)
 *  After address/phone data are updated/added/deleted, we move on to operating on times.
 *  For each of the objects in the data that will be returned, we determine if the time data needs to be added, updated, or deleted.
 *  After time operations are completed, the address data is returned to the client, to assign IDs to each of the addresses (so that when saving again, can know which addresses are new)
 *  New addresses have their addressesID as 0
 * @param {Array} req Cookie from client, AddressData, TimesData
 * @param {Array} res 200/400, address data
 * @returns Returns 200/400, depending on wheather the data was saved correctly. Also returns the address and times data
 *  DOCUMENTATION LAST UPDATED 6/423
 */
export async function saveAddressData (req, res) {
  const DoctorUUID = req.cookies.DoctorUUID
  let DoctorID
  try {
    DoctorID = await UUID_to_ID(DoctorUUID)
  } catch (error) {
    clearCookies(res, "Doctor")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
  }

  const AddressData = req.body.AddressData
  const TimesData = req.body.Times

  let addressResults

  try {
    addressResults = await SaveDoctorDataDB.retrieveExistingAddressIDs(DoctorID)
  } catch (error) {
    return res.status(400).json()
  }

  if (!_.isEmpty(addressResults)) {
    for (let addressResult of addressResults) {
      try {
        const phones = await SaveDoctorDataDB.retrievePhoneData(addressResult.addressesID)
        if (_.isEmpty(phones)) addressResult.phone = ""
        else addressResult.phone = phones[0]
      } catch (error) {
        return res.status(400).json()
      }
    }
    const newData = AddressData
    // Check for changes in data:

    //Filter the newData, check if there are any objects whose addressesID is null. Null addressesID means the data is new
    const addedData = newData.filter(data => data.addressesID === 0)

    //Extracts just the IDs of the data that was in the DB, but is not in the new incoming Data
    const deletedData = addressResults
      .filter(result => !newData.some(data => data.addressesID === result.addressesID))
      .map(result => result.addressesID)

    const updatedData = getUpdatedAddressRecords(newData, addressResults)

    const unchangedData = getUnchangedAddressRecords(newData, addressResults)

    let returnedData = unchangedData //initialize the data to return with the data that hasn't changed.

    if (!_.isEmpty(deletedData)) {
      for (let i = 0; i < deletedData.length; i++) {
        try {
          await SaveDoctorDataDB.deleteAddressRecord(deletedData[i])
        } catch (error) {
          return res.status(400).json()
        }
      }
    }
    if (!_.isEmpty(addedData)) {
      for (let i = 0; i < addedData.length; i++) {
        let insertID
        try {
          insertID = await SaveDoctorDataDB.addAddressRecord(addedData[i], DoctorID)
        } catch (error) {
          return res.status(400).json()
        }

        if (addedData[i].phone) {
          try {
            await SaveDoctorDataDB.addPhoneRecord(addedData[i].phone, insertID)
          } catch (error) {
            return res.status(400)
          }
        }
        addedData[i].addressesID = insertID
        returnedData.push(addedData[i])
      }
    }
    if (!_.isEmpty(updatedData)) {
      for (let i = 0; i < updatedData.length; i++) {
        try {
          await SaveDoctorDataDB.updateAddressRecord(updatedData[i])
        } catch (error) {
          return res.status(400).json()
        }

        let doesPhoneExist

        try {
          doesPhoneExist = await SaveDoctorDataDB.checkIfPhoneExists(updatedData[i].addressesID)
        } catch (error) {
          return res.status(400).json()
        }
        if (doesPhoneExist) {
          if (_.has(updatedData[i], "phone")) {
            try {
              await SaveDoctorDataDB.updatePhoneRecord(updatedData[i])
            } catch (error) {
              return res.status(400).json()
            }
          }
        } else {
          try {
            await SaveDoctorDataDB.addPhoneRecord(updatedData[i].phone, updatedData[i].addressesID)
          } catch (error) {
            return res.status(400).json()
          }
        }
        returnedData.push(updatedData[i])
      }
    }
    //After all address operations are complete, do the TimeData Operations:
    if (!_.isEmpty(returnedData)) {
      // go into each element of the returnedData array.
      //for for the ith element in returnedData, find the corresponding times objects in TimesData (will be the ith element in the TimesData array)
      //compare each of the objects in that TimesData element to all of the data that a select Day_of_week, Start_time, End_time for that
      //Select Day_of_week, Start_time, End_time from timedata table where addressID = returnedData[i].AddressID.
      //see which data is new, and which data is deleted. will be re-declaring addedTimeData, deletedTimeData inside of a loop (that iterates over all the address_IDs)
      //the addedData/deletedData will act inside of a loop, length of addedTimeDAta/deletedTimeData
      returnedData.sort((a, b) => a.address_priority - b.address_priority)
      for (let i = 0; i < returnedData.length; i++) {
        const returnedDataData = returnedData[i]
        const corespondingTimeData = TimesData[i]

        let existingAvailbilityData

        try {
          existingAvailbilityData = await SaveDoctorDataDB.retrieveExistingAvailbilityData(returnedDataData.addressesID)
        } catch (error) {
          return res.status(400).json()
        }

        const oldDataDict = Object.fromEntries(existingAvailbilityData.map(item => [item.Day_of_week, item]))
        const newDataDict = Object.fromEntries(corespondingTimeData.map(item => [item.Day_of_week, item]))

        const addedTimeData = Object.values(newDataDict).filter(item => !(item.Day_of_week in oldDataDict))
        const deletedTimeData = Object.values(oldDataDict).filter(item => !(item.Day_of_week in newDataDict))

        const updatedTimeData = Object.values(newDataDict).filter(item => {
          return (item.Day_of_week in oldDataDict) &&
            (item.Start_time !== oldDataDict[item.Day_of_week].Start_time ||
            item.End_time !== oldDataDict[item.Day_of_week].End_time)
        })

        if (!_.isEmpty(addedTimeData)) {
          for (let j = 0; j < addedTimeData.length; j++) {
            if (addedTimeData[j]) {
              try {
                await SaveDoctorDataDB.addAvailbilityData(addedTimeData[j], returnedDataData.addressesID)
              } catch (error) {
                return res.status(400).json()
              }
            }
          }
        }
        if (!_.isEmpty(deletedTimeData)) {
          for (let j = 0; j < deletedTimeData.length; j++) {
            if (deletedTimeData[j]) {
              try {
                await SaveDoctorDataDB.deleteAvailbilityData(deletedTimeData[j], returnedDataData.addressesID)
              } catch (error) {
                return res.status(400).json()
              }
            }
          }
        }
        if (!_.isEmpty(updatedTimeData)) {
          for (let j = 0; j < updatedTimeData.length; j++) {
            if (updatedTimeData[j]) {
              try {
                await SaveDoctorDataDB.updateTimeAvailbilityData(updatedTimeData[j], returnedDataData.addressesID)
              } catch (error) {
                return res.status(400).json()
              }
            }
          }
        }
      }
      return res.status(200).json(returnedData)
    } else {
      //if no addresses:
      return res.status(200).json([])
    }
  } else if (!_.isEmpty(AddressData)) {
    AddressData.sort((a, b) => a.address_priority - b.address_priority)
    for (let i = 0; i < AddressData.length; i++) {
      let insertID
      try {
        insertID = await SaveDoctorDataDB.addAddressRecord(AddressData[i], DoctorID)
      } catch (error) {
        return res.status(400).json()
      }

      if (AddressData[i].phone) {
        try {
          await SaveDoctorDataDB.addPhoneRecord(AddressData[i].phone, insertID)
        } catch (error) {
          return res.status(400).json()
        }
      }
      if (!_.isEmpty(TimesData[i])) {//Makes sure that there is Time Data to save
        for (let j = 0; j < TimesData[i].length; j++) {
          try {
            await SaveDoctorDataDB.addAvailbilityData(TimesData[i][j], insertID)
          } catch (error) {
            return res.status(400).json()
          }
        }
      }
      AddressData[i].addressesID = insertID
    }
    return res.status(200).json(AddressData)
  } else return res.status(400).json()
}

/** savePublicAvailibilityData is a Doctor-controlled function that allows them to say wheather or not they want their profile accessible to patients
 *  First, converts from UUID to ID. Then, updates the doctor's avalibility to whatever they did on the front-end. The request is only allowed to happen if the new availiblty status is dfferent from the old one.
 * @param {String} req Cookie from client, PublicAvailibility status
 * @param {Boolean} res 200 or 400
 * @returns status code 200 or 400
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function savePublicAvailibilityData (req, res) {
  const DoctorUUID = req.cookies.DoctorUUID
  let DoctorID
  try {
    DoctorID = await UUID_to_ID(DoctorUUID)
  } catch (error) {
    clearCookies(res, "Doctor")
    return res.status(401).json({ shouldRedirect: true, redirectURL: "/vet-login" })
  }

  const publicAvailibility = req.body.PublicAvailibility

  try {
    await SaveDoctorDataDB.updatePublicAvilability(publicAvailibility, DoctorID)
    return res.status(200).json()
  } catch (error) {
    return res.status(400).json()
  }
}
