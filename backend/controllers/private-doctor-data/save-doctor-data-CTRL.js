import _ from "lodash"
import TimeUtils from "../../utils/time.js"
import OperationHandler from "../../utils/operation-handler.js"
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
  const doesRecordExist = await OperationHandler.executeAsyncAndReturnValue(res, SaveDoctorDataDB.checkIfPersonalDataExists, DoctorID)

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

  const doesDescriptionExist = await OperationHandler.executeAsyncAndReturnValue(res, SaveDoctorDataDB.checkIfDescriptionExists, DoctorID)

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

export async function addService (req, res) {
  const serviceObject = req.body.serviceObject
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.addServicesData(serviceObject, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function updateService (req, res) {
  const serviceObject = req.body.serviceObject
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.updateServicesData(serviceObject, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteService (req, res) {
  const servicedPetID = req.params.serviceID
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.deleteServicesData(servicedPetID, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
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

export async function addAddress (req, res) {
  const DoctorID = req.DoctorID
  const AddressData = req.body.AddressData
  const TimesData = req.body.Times

  const insertID = await OperationHandler.executeAsyncAndReturnValue(res, SaveDoctorDataDB.addAddressRecord, AddressData, DoctorID)

  if (AddressData.phone) {
    const operation = async () => await SaveDoctorDataDB.addPhoneRecord(AddressData.phone, insertID)
    OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
  }

  if (!_.isEmpty(TimesData)) {
    for (const timeData of TimesData) {
      const operation = async () => await SaveDoctorDataDB.addAvailbilityData(timeData, insertID)
      OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
    }
  }

  return res.status(200).json(insertID)
}

export async function deleteAddress (req, res) {
  const addressID = req.params.addressID

  const operation = async () => await SaveDoctorDataDB.deleteAddressRecord(addressID)
  OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)

  const phoneOperation = async () => await SaveDoctorDataDB.deletePhoneRecord(addressID)
  OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, phoneOperation)

  const timeOperation = async () => await SaveDoctorDataDB.deleteAvailbilityData(addressID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, timeOperation)
}

export async function updateAddress (req, res) {
  const AddressData = req.body.AddressData
  const TimesData = req.body.Times

  console.log(AddressData, TimesData)

  const operation = async () => await SaveDoctorDataDB.updateAddressRecord(AddressData)
  OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)

  const phoneOperation = async () => await SaveDoctorDataDB.updatePhoneRecord(AddressData)
  OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, phoneOperation)

  const timeOperation = async () => await SaveDoctorDataDB.updateTimeAvailbilityData(TimesData, AddressData.addressesID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, timeOperation)
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
