import _ from "lodash"
import { Response, Request } from "express"
import TimeUtils from "../../utils/time"
import OperationHandler from "../../utils/operation-handler"
import SaveDoctorDataDB from "../../db/private-doctor-data/save-doctor-data-DB"

export async function savePersonalData (req: Request, res: Response): Promise<void> {
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

export async function saveDescriptionData (req: Request, res: Response): Promise<void> {
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

export async function addLanguage (req: Request, res: Response): Promise<void> {
  const languageID: number = req.body.languageID
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.addLanguage(languageID, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteLanguage (req: Request, res: Response): Promise<void> {
  const languageID: number = Number(req.params.languageID)
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.deleteLanguage(languageID, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addSpecialty (req: Request, res: Response): Promise<void> {
  const specialtyID = req.body.specialtyID
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.addSpecialty(specialtyID, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteSpecialty (req: Request, res: Response): Promise<void> {
  const specialtyID: number = Number(req.params.specialtyID)
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.deleteSpecialty(specialtyID, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addServicedPet (req: Request, res: Response): Promise<void> {
  const servicedPetID = req.body.petID
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.addServicedPet(servicedPetID, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteServicedPet (req: Request, res: Response): Promise<void> {
  const servicedPetID: number = Number(req.params.servicedPetID)
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.deleteServicedPet(servicedPetID, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addService (req: Request, res: Response): Promise<void> {
  const serviceObject = req.body.serviceObject
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.addServicesData(serviceObject, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function updateService (req: Request, res: Response): Promise<void> {
  const serviceObject = req.body.serviceObject
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.updateServicesData(serviceObject, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteService (req: Request, res: Response): Promise<void> {
  const servicedPetID: number = Number(req.params.serviceID)
  const DoctorID = req.DoctorID
  const operation = async () => await SaveDoctorDataDB.deleteServicesData(servicedPetID, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addPreVetEducationData (req: Request, res: Response): Promise<void> {
  const DoctorID = req.DoctorID
  const preVetEducationData = req.body.preVetEducationData
  const operation = async () => {
    return await SaveDoctorDataDB.addPreVetEducationData(preVetEducationData, DoctorID)
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation)
}

export async function deletePreVetEducationData (req: Request, res: Response): Promise<void> {
  const preVetEducationID: number = Number(req.params.preVetEducationID)

  const operation = async () => await SaveDoctorDataDB.deletePreVetEducationData(preVetEducationID)
  await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addVetEducationData (req: Request, res: Response): Promise<void> {
  const DoctorID = req.DoctorID
  const vetEducationData = req.body.vetEducationData
  const operation = async () => {
    return await SaveDoctorDataDB.addVetEducationData(vetEducationData, DoctorID)
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation)
}

export async function deleteVetEducationData (req: Request, res: Response): Promise<void> {
  const vetEducationID: number = Number(req.params.vetEducationID)
  const operation = async () => await SaveDoctorDataDB.deleteVetEducationData(vetEducationID)
  await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addAddress (req: Request, res: Response): Promise<Response> {
  const DoctorID = req.DoctorID
  const AddressData = req.body.AddressData
  const TimesData = req.body.Times

  const insertID = await OperationHandler.executeAsyncAndReturnValue(res, SaveDoctorDataDB.addAddressRecord, AddressData, DoctorID)
  const insertIDNumber = Number(insertID)

  if (AddressData.phone) {
    const operation = async () => await SaveDoctorDataDB.addPhoneRecord(AddressData.phone, insertIDNumber)
    OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
  }

  if (!_.isEmpty(TimesData)) {
    for (const timeData of TimesData) {
      const operation = async () => await SaveDoctorDataDB.addAvailbilityData(timeData, insertIDNumber)
      OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
    }
  }

  return res.status(200).json(insertID)
}

export async function deleteAddress (req: Request, res: Response): Promise<void> {
  const addressID: number = Number(req.params.addressID)

  const operation = async () => await SaveDoctorDataDB.deleteAddressRecord(addressID)
  OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)

  const phoneOperation = async () => await SaveDoctorDataDB.deletePhoneRecord(addressID)
  OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, phoneOperation)

  const timeOperation = async () => await SaveDoctorDataDB.deleteAvailbilityData(addressID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, timeOperation)
}

export async function updateAddress (req: Request, res: Response): Promise<void> {
  const AddressData = req.body.AddressData
  const TimesData = req.body.Times

  const operation = async () => await SaveDoctorDataDB.updateAddressRecord(AddressData)
  OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)

  const phoneOperation = async () => await SaveDoctorDataDB.updatePhoneRecord(AddressData)
  OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, phoneOperation)

  const timeOperation = async () => await SaveDoctorDataDB.updateTimeAvailbilityData(TimesData, AddressData.addressesID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, timeOperation)
}

export async function savePublicAvailibilityData (req: Request, res: Response): Promise<void> {
  const DoctorID = req.DoctorID

  const publicAvailibility = req.body.PublicAvailibility
  const operation = async () => await SaveDoctorDataDB.updatePublicAvilability(publicAvailibility, DoctorID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
