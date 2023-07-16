import _ from "lodash"
import TimeUtils from "../../utils/time.js"
import SaveDoctorDataOperations from "../../utils/save-doctor-data-operations.js"
import SaveDoctorDataDB from "../../db/private-doctor-data/save-doctor-data-DB.js"

/** savePersonalData is self-explanatory in name
 *  First, converts from UUID to ID. Then, checks if any records exist in basic_doctor_info.
 *  If records don"t exist, then it inserts the data.
 *  if records do exist, the data is updated. depending on wheather the data is entered successfully or not, it returns 200/400
 * @param {String} req Cookie from client
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved corretly
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function savePersonalData (req, res) {
  const DoctorID = req.DoctorID

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
 *  If records don"t exist, then it inserts the data.
 *  if records do exist, the data is updated. depending on wheather the data is entered successfully or not, it returns 200/400
 * @param {String} req Cookie from client
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved corretly
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function saveDescriptionData (req, res) {
  const DoctorID = req.DoctorID

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

export async function addLanguage (req, res) {
  const languageID = req.body.languageID
  const DoctorID = req.DoctorID
  const operation = () => SaveDoctorDataDB.addLanguage(languageID, DoctorID)
  handleRequest(res, operation)
}

export async function deleteLanguage (req, res) {
  const languageID = req.params.languageID
  const DoctorID = req.DoctorID
  const operation = () => SaveDoctorDataDB.deleteLanguage(languageID, DoctorID)
  handleRequest(res, operation)
}

async function handleRequest(res, operation) {
  try {
    await operation()
    res.status(200).json()
  } catch (error) {
    console.log(error)
    res.status(400).json()
  }
}

/** saveServicesData saves the services that a doctor offers
 *  Searches the DB for existing service data.
 *  Finds the difference between the incoming data and the saved data. Inserts/deletes/updates accordingly
 * @param {String} req Cookie from client, list of Servicesdata
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 6/423
 */
export async function saveServicesData (req, res) {
  const DoctorID = req.DoctorID

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
    const { addedData, deletedData, updatedData } = SaveDoctorDataOperations.getServicesDataChanges(ServicesData, existingServicesIDs)

    if (!_.isEmpty(addedData)) {
      for (let data of addedData) {
        try {
          await SaveDoctorDataDB.addServicesData(data, DoctorID)
        } catch (error) {
          return res.status(400).json()
        }
      }
    }
    if (!_.isEmpty(deletedData)) {
      for (let data of deletedData) {
        try {
          await SaveDoctorDataDB.deleteServicesData(data.Service_and_Category_ID, DoctorID)
        } catch (error) {
          return res.status(400).json()
        }
      }
    }
    if (!_.isEmpty(updatedData)) {
      for (let data of updatedData) {
        try {
          await SaveDoctorDataDB.updateServicesData(data, DoctorID)
        } catch (error) {
          return res.status(400).json()
        }
      }
    }
    return res.status(200).json()
  } else if (!_.isEmpty(ServicesData)) {
    for (let data of ServicesData) {
      try {
        await SaveDoctorDataDB.addServicesData(data, DoctorID)
      } catch (error) {
        return res.status(400).json()
      }
    }
    return res.status(200).json()
  }
}

/** saveEducationData is self-explanatory in name
 *  Depending on wheather the operationType is add or delete, different operations are performed (INSERT vs DELETE)
 * @param {String} req Cookie from client, type of education data, operationType (add or delete), EducationData (ie pre-vet or vet)
 * @param {Boolean} res 200/400
 * @returns Returns 200/400, depending on wheather the data was saved correctly
 *  DOCUMENTATION LAST UPDATED 6/423
 */
export async function saveEducationData (req, res) {
  const DoctorID = req.DoctorID

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
 *  First, checks if any address data already exists. If it doesn"t, then just add the incoming data, no need to update/delete
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
  const DoctorID = req.DoctorID

  const AddressData = req.body.AddressData
  const TimesData = req.body.Times

  let addressResults

  try {
    addressResults = await SaveDoctorDataDB.retrieveExistingAddressIDs(DoctorID)
  } catch (error) {
    return res.status(400).json()
  }

  if (_.isEmpty(addressResults) && _.isEmpty(AddressData)) return res.status(400).json() //NO new data or queried results from DB.

  else if (!_.isEmpty(addressResults)) {
    for (let addressResult of addressResults) {
      try {
        const phones = await SaveDoctorDataDB.retrievePhoneData(addressResult.addressesID)
        if (_.isEmpty(phones)) addressResult.phone = ""
        else addressResult.phone = phones[0]
      } catch (error) {
        return res.status(400).json()
      }
    }
    const { addedData, deletedData, updatedData, returnedData } = SaveDoctorDataOperations.getAddressesDataChanges(AddressData, addressResults)

    if (!_.isEmpty(deletedData)) {
      for (let data of deletedData) {
        try {
          await SaveDoctorDataDB.deleteAddressRecord(data)
        } catch (error) {
          return res.status(400).json()
        }
      }
    }
    if (!_.isEmpty(addedData)) {
      for (let data of addedData) {
        let insertID
        try {
          insertID = await SaveDoctorDataDB.addAddressRecord(data, DoctorID)
        } catch (error) {
          return res.status(400).json()
        }

        if (data.phone) {
          try {
            await SaveDoctorDataDB.addPhoneRecord(data.phone, insertID)
          } catch (error) {
            return res.status(400)
          }
        }
        data.addressesID = insertID
        returnedData.push(data)
      }
    }
    if (!_.isEmpty(updatedData)) {
      for (let data of updatedData) {
        try {
          await SaveDoctorDataDB.updateAddressRecord(data)
        } catch (error) {
          return res.status(400).json()
        }

        let doesPhoneExist

        try {
          doesPhoneExist = await SaveDoctorDataDB.checkIfPhoneExists(data.addressesID)
        } catch (error) {
          return res.status(400).json()
        }
        if (doesPhoneExist) {
          if (_.has(data, "phone")) {
            try {
              await SaveDoctorDataDB.updatePhoneRecord(data)
            } catch (error) {
              return res.status(400).json()
            }
          }
        } else {
          try {
            await SaveDoctorDataDB.addPhoneRecord(data.phone, data.addressesID)
          } catch (error) {
            return res.status(400).json()
          }
        }
        returnedData.push(data)
      }
    }
    //After all address operations are complete, do the TimeData Operations:
    if (_.isEmpty(returnedData)) return res.status(200).json([])
    else {
      // go into each element of the returnedData array.
      //for for the ith element in returnedData, find the corresponding times objects in TimesData (will be the ith element in the TimesData array)
      //compare each of the objects in that TimesData element to all of the data that a select Day_of_week, Start_time, End_time for that
      //Select Day_of_week, Start_time, End_time from timedata table where addressID = returnedData[i].AddressID.
      //see which data is new, and which data is deleted. will be re-declaring addedTimeData, deletedTimeData inside of a loop (that iterates over all the address_IDs)
      //the addedData/deletedData will act inside of a loop, length of addedTimeDAta/deletedTimeData
      returnedData.sort((a, b) => a.address_priority - b.address_priority)
      for (let [i, returnedDataItem] of returnedData.entries()) {
        const corespondingTimeData = TimesData[i]

        let existingAvailbilityData

        try {
          existingAvailbilityData = await SaveDoctorDataDB.retrieveExistingAvailbilityData(returnedDataItem.addressesID)
        } catch (error) {
          return res.status(400).json()
        }

        const { addedTimeData, deletedTimeData, updatedTimeData } = SaveDoctorDataOperations.getTimeDataChanges(existingAvailbilityData, corespondingTimeData)

        if (!_.isEmpty(addedTimeData)) {
          for (let data of addedTimeData) {
            if (data) {
              try {
                await SaveDoctorDataDB.addAvailbilityData(data, returnedDataItem.addressesID)
              } catch (error) {
                return res.status(400).json()
              }
            }
          }
        }
        if (!_.isEmpty(deletedTimeData)) {
          for (let data of deletedTimeData) {
            if (data) {
              try {
                await SaveDoctorDataDB.deleteAvailbilityData(data, returnedDataItem.addressesID)
              } catch (error) {
                return res.status(400).json()
              }
            }
          }
        }
        if (!_.isEmpty(updatedTimeData)) {
          for (let data of updatedTimeData) {
            if (data) {
              try {
                await SaveDoctorDataDB.updateTimeAvailbilityData(data, returnedDataItem.addressesID)
              } catch (error) {
                return res.status(400).json()
              }
            }
          }
        }
      }
      return res.status(200).json(returnedData)
    }
  }
  else if (!_.isEmpty(AddressData)) {
    AddressData.sort((a, b) => a.address_priority - b.address_priority)
    for (let [i, address] of AddressData.entries()) {
      let insertID
      try {
        insertID = await SaveDoctorDataDB.addAddressRecord(address, DoctorID)
      } catch (error) {
        return res.status(400).json()
      }

      if (address.phone) {
        try {
          await SaveDoctorDataDB.addPhoneRecord(address.phone, insertID)
        } catch (error) {
          return res.status(400).json()
        }
      }

      if (!_.isEmpty(TimesData[i])) {
        for (let timeData of TimesData[i]) {
          try {
            await SaveDoctorDataDB.addAvailbilityData(timeData, insertID)
          } catch (error) {
            return res.status(400).json()
          }
        }
      }
      address.addressesID = insertID
    }
    return res.status(200).json(AddressData)
  }
}

/** savePublicAvailibilityData is a Doctor-controlled function that allows them to say wheather or not they want their profile accessible to patients
 *  First, converts from UUID to ID. Then, updates the doctor"s avalibility to whatever they did on the front-end. The request is only allowed to happen if the new availiblty status is dfferent from the old one.
 * @param {String} req Cookie from client, PublicAvailibility status
 * @param {Boolean} res 200 or 400
 * @returns status code 200 or 400
 *  DOCUMENTATION LAST UPDATED 3/16/23
 */
export async function savePublicAvailibilityData (req, res) {
  const DoctorID = req.DoctorID

  const publicAvailibility = req.body.PublicAvailibility

  try {
    await SaveDoctorDataDB.updatePublicAvilability(publicAvailibility, DoctorID)
    return res.status(200).json()
  } catch (error) {
    return res.status(400).json()
  }
}
