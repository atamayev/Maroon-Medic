import _ from "lodash"
import TimeUtils from "../../utils/time.js"
import OperationHandler from "../../utils/operation-handler.js"
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
  const doesRecordExist = await OperationHandler.executeAsyncAndReturnValue(SaveDoctorDataDB.checkIfPersonalDataExists, res, DoctorID)

  const personalInfo = req.body.personalInfo

  const dateOfBirth = TimeUtils.convertDOBStringIntoMySQLDate(personalInfo.DOB_month, personalInfo.DOB_day, personalInfo.DOB_year)

  if (doesRecordExist) {
    const operation = async () => await SaveDoctorDataDB.updatePersonalData(personalInfo, dateOfBirth, DoctorID)
    OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
  } else {
    const operation = async () => await SaveDoctorDataDB.addPersonalData(personalInfo, dateOfBirth, DoctorID)
    OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
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

  const doesDescriptionExist = await OperationHandler.executeAsyncAndReturnValue(SaveDoctorDataDB.checkIfDescriptionExists, res, DoctorID)

  if (doesDescriptionExist) {
    const operation = async () => await SaveDoctorDataDB.updateDescription(description, DoctorID)
    OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
  } else {
    const operation = async () => await SaveDoctorDataDB.addDescription(description, DoctorID)
    OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
  }
}

export async function addLanguage (req, res) {
  const languageID = req.body.languageID
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.addLanguage(languageID, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteLanguage (req, res) {
  const languageID = req.params.languageID
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.deleteLanguage(languageID, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addSpecialty (req, res) {
  const specialtyID = req.body.specialtyID
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.addSpecialty(specialtyID, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteSpecialty (req, res) {
  const specialtyID = req.params.specialtyID
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.deleteSpecialty(specialtyID, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addServicedPet (req, res) {
  const servicedPetID = req.body.petID
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.addServicedPet(servicedPetID, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteServicedPet (req, res) {
  const servicedPetID = req.params.servicedPetID
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.deleteServicedPet(servicedPetID, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
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
  const existingServicesIDs = await OperationHandler.executeAsyncAndReturnValue(SaveDoctorDataDB.retrieveExistingServicesIDs, res, DoctorID)

  if (_.isEmpty(existingServicesIDs) && _.isEmpty(ServicesData)) return res.status(400).json() //NO new data or queried results from DB.
  else if (!_.isEmpty(existingServicesIDs)) {
    // Doctor already has data in the table
    const { addedData, deletedData, updatedData } = SaveDoctorDataOperations.getServicesDataChanges(ServicesData, existingServicesIDs)

    if (!_.isEmpty(addedData)) {
      for (let data of addedData) {
        const operation = async () => await SaveDoctorDataDB.addServicesData(data, DoctorID)
        OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
      }
    }
    if (!_.isEmpty(deletedData)) {
      for (let data of deletedData) {
        const operation = async () => await SaveDoctorDataDB.deleteServicesData(data.Service_and_Category_ID, DoctorID)
        OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
      }
    }
    if (!_.isEmpty(updatedData)) {
      for (let data of updatedData) {
        const operation = async () => await SaveDoctorDataDB.updateServicesData(data, DoctorID)
        OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
      }
    }
    return res.status(200).json()
  } else if (!_.isEmpty(ServicesData)) {
    for (let data of ServicesData) {
      const operation = async () => await SaveDoctorDataDB.addServicesData(data, DoctorID)
      OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
    }
    return res.status(200).json()
  }
}

export async function addPreVetEducationData (req, res) {
  const DoctorID = req.DoctorID
  const preVetEducationData = req.body.preVetEducationData
  const operation = async () => {
    return await SaveDoctorDataDB.addPreVetEducationData(preVetEducationData, DoctorID)
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation)
}

export async function deletePreVetEducationData (req, res) {
  const preVetEducationID = req.params.preVetEducationID

  const operation = async () => await SaveDoctorDataDB.deletePreVetEducationData(preVetEducationID)
  await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addVetEducationData (req, res) {
  const DoctorID = req.DoctorID
  const vetEducationData = req.body.vetEducationData
  const operation = async () => {
    return await SaveDoctorDataDB.addVetEducationData(vetEducationData, DoctorID)
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation)
}

export async function deleteVetEducationData (req, res) {
  const vetEducationID = req.params.vetEducationID
  const operation = async () => await SaveDoctorDataDB.deleteVetEducationData(vetEducationID)
  await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
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

  const addressResults = await OperationHandler.executeAsyncAndReturnValue(SaveDoctorDataDB.retrieveExistingAddressIDs, res, DoctorID)

  if (_.isEmpty(addressResults) && _.isEmpty(AddressData)) return res.status(400).json() //NO new data or queried results from DB.

  else if (!_.isEmpty(addressResults)) {
    for (let addressResult of addressResults) {
      const phones = await OperationHandler.executeAsyncAndReturnValue(SaveDoctorDataDB.retrievePhoneData, res, addressResult.addressesID)
      if (_.isEmpty(phones)) addressResult.phone = ""
      else addressResult.phone = phones[0]
    }
    const { addedData, deletedData, updatedData, returnedData } = SaveDoctorDataOperations.getAddressesDataChanges(AddressData, addressResults)

    if (!_.isEmpty(deletedData)) {
      for (let data of deletedData) {
        const operation = async () => await SaveDoctorDataDB.deleteAddressRecord(data)
        OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
      }
    }
    if (!_.isEmpty(addedData)) {
      for (let data of addedData) {
        let insertID = await OperationHandler.executeAsyncAndReturnValue(SaveDoctorDataDB.addAddressRecord, res, data, DoctorID)

        if (data.phone) {
          const operation = async () => await SaveDoctorDataDB.addPhoneRecord(data.phone, insertID)
          OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
        }
        data.addressesID = insertID
        returnedData.push(data)
      }
    }
    if (!_.isEmpty(updatedData)) {
      for (let data of updatedData) {
        const operation = async () => await SaveDoctorDataDB.updateAddressRecord(data)
        OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)

        const doesPhoneExist = await OperationHandler.executeAsyncAndReturnValue(SaveDoctorDataDB.checkIfPhoneExists, res, data.addressesID)

        if (doesPhoneExist) {
          if (_.has(data, "phone")) {
            const operation = async () => await SaveDoctorDataDB.updatePhoneRecord(data)
            OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
          }
        } else {
          const operation = async () => await SaveDoctorDataDB.addPhoneRecord(data.phone, data.addressesID)
          OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
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
        const existingAvailbilityData = await OperationHandler.executeAsyncAndReturnValue(SaveDoctorDataDB.retrieveExistingAvailbilityData, res, returnedDataItem.addressesID)

        const { addedTimeData, deletedTimeData, updatedTimeData } = SaveDoctorDataOperations.getTimeDataChanges(existingAvailbilityData, corespondingTimeData)

        if (!_.isEmpty(addedTimeData)) {
          for (let data of addedTimeData) {
            if (data) {
              const operation = async () => await SaveDoctorDataDB.addAvailbilityData(data, returnedDataItem.addressesID)
              OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
            }
          }
        }
        if (!_.isEmpty(deletedTimeData)) {
          for (let data of deletedTimeData) {
            if (data) {
              const operation = async () => await SaveDoctorDataDB.deleteAvailbilityData(data, returnedDataItem.addressesID)
              OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
            }
          }
        }
        if (!_.isEmpty(updatedTimeData)) {
          for (let data of updatedTimeData) {
            if (data) {
              const operation = async () => await SaveDoctorDataDB.updateTimeAvailbilityData(data, returnedDataItem.addressesID)
              OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
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
      let insertID = await OperationHandler.executeAsyncAndReturnValue(SaveDoctorDataDB.addAddressRecord, res, address, DoctorID)

      if (address.phone) {
        const operation = async () => await SaveDoctorDataDB.addPhoneRecord(address.phone, insertID)
        OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
      }

      if (!_.isEmpty(TimesData[i])) {
        for (let timeData of TimesData[i]) {
          const operation = async () => await SaveDoctorDataDB.addAvailbilityData(timeData, insertID)
          OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
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
  const operation = async () => await SaveDoctorDataDB.updatePublicAvilability(publicAvailibility, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
