import _ from "lodash"
import { Response, Request } from "express"
import TimeUtils from "../../utils/time"
import OperationHandler from "../../utils/operation-handler"
import SaveDoctorDataDB from "../../db/private-doctor-data/save-doctor-data-DB"
import findAppointmentTimeDifference from "../../utils/find-appointment-time-difference"

export async function savePersonalData (req: Request, res: Response): Promise<void> {
	const doctorId = req.doctorId
	const doesRecordExist = await OperationHandler.executeAsyncAndReturnValue(res, SaveDoctorDataDB.checkIfPersonalDataExists, doctorId)

	const personalInfo = req.body.personalInfo

	const dateOfBirth = TimeUtils.convertDOBStringIntoMySQLDate(personalInfo.birthMonth, personalInfo.birthDay, personalInfo.birthYear)

	if (doesRecordExist) {
		const operation: () => Promise<void> = async () => await SaveDoctorDataDB.updatePersonalData(personalInfo, dateOfBirth, doctorId)
		await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
	} else {
		const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addPersonalData(personalInfo, dateOfBirth, doctorId)
		await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
	}
}

export async function saveDescriptionData (req: Request, res: Response): Promise<void> {
	const doctorId = req.doctorId
	const description = req.body.description

	const doesDescriptionExist = await OperationHandler.executeAsyncAndReturnValue(res, SaveDoctorDataDB.checkIfDescriptionExists, doctorId)

	if (doesDescriptionExist) {
		const operation: () => Promise<void> = async () => await SaveDoctorDataDB.updateDescription(description, doctorId)
		await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
	} else {
		const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addDescription(description, doctorId)
		await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
	}
}

export async function addLanguage (req: Request, res: Response): Promise<void> {
	const languageID: number = req.body.languageID
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addLanguage(languageID, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteLanguage (req: Request, res: Response): Promise<void> {
	const languageID: number = Number(req.params.languageID)
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteLanguage(languageID, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addSpecialty (req: Request, res: Response): Promise<void> {
	const specialtyID = req.body.specialtyID
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addSpecialty(specialtyID, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteSpecialty (req: Request, res: Response): Promise<void> {
	const specialtyID: number = Number(req.params.specialtyID)
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteSpecialty(specialtyID, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addServicedPet (req: Request, res: Response): Promise<void> {
	const servicedPetID = req.body.petID
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addServicedPet(servicedPetID, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteServicedPet (req: Request, res: Response): Promise<void> {
	const servicedPetID: number = Number(req.params.servicedPetID)
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteServicedPet(servicedPetID, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addService (req: Request, res: Response): Promise<void> {
	const serviceObject = req.body.serviceObject
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addServicesData(serviceObject, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function updateService (req: Request, res: Response): Promise<void> {
	const serviceObject = req.body.serviceObject
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.updateServicesData(serviceObject, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteService (req: Request, res: Response): Promise<void> {
	const servicedPetID: number = Number(req.params.serviceID)
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteServicesData(servicedPetID, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addPreVetEducationData (req: Request, res: Response): Promise<void> {
	const doctorId = req.doctorId
	const preVetEducationData = req.body.preVetEducationData
	const operation: () => Promise<number> = async () => {
		return await SaveDoctorDataDB.addPreVetEducationData(preVetEducationData, doctorId)
	}
	await OperationHandler.executeAsyncAndReturnValueToRes(res, operation)
}

export async function deletePreVetEducationData (req: Request, res: Response): Promise<void> {
	const preVetEducationID: number = Number(req.params.preVetEducationID)

	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deletePreVetEducationData(preVetEducationID)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addVetEducationData (req: Request, res: Response): Promise<void> {
	const doctorId = req.doctorId
	const vetEducationData = req.body.vetEducationData
	const operation: () => Promise<number> = async () => {
		return await SaveDoctorDataDB.addVetEducationData(vetEducationData, doctorId)
	}
	await OperationHandler.executeAsyncAndReturnValueToRes(res, operation)
}

export async function deleteVetEducationData (req: Request, res: Response): Promise<void> {
	const vetEducationID: number = Number(req.params.vetEducationID)
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteVetEducationData(vetEducationID)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addAddress (req: Request, res: Response): Promise<Response> {
	const doctorId = req.doctorId
	const AddressData = req.body.AddressData
	const TimesData = req.body.Times

	const insertID = await OperationHandler.executeAsyncAndReturnValue(res, SaveDoctorDataDB.addAddressRecord, AddressData, doctorId)
	const insertIDNumber = Number(insertID)

	if (AddressData.phone) {
		const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addPhoneRecord(AddressData.phone, insertIDNumber)
		await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
	}

	if (!_.isEmpty(TimesData)) {
		for (const timeData of TimesData) {
			const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addAvailbilityData(timeData, insertIDNumber)
			await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
		}
	}

	return res.status(200).json(insertID)
}

export async function deleteAddress (req: Request, res: Response): Promise<void> {
	const addressID: number = Number(req.params.addressID)

	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteAddressRecord(addressID)
	await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)

	const phoneOperation: () => Promise<void> = async () => await SaveDoctorDataDB.deletePhoneRecord(addressID)
	await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, phoneOperation)

	const timeOperation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteAvailbilityData(addressID)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, timeOperation)
}

export async function updateAddress (req: Request, res: Response): Promise<void> {
	const AddressData = req.body.AddressData
	const TimesData = req.body.Times

	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.updateAddressRecord(AddressData)
	await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)

	const phoneOperation: () => Promise<void> = async () => await SaveDoctorDataDB.updatePhoneRecord(AddressData)
	await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, phoneOperation)

	const timeOperation: () => Promise<void> = async () => {
		await findAppointmentTimeDifference(TimesData, AddressData.addressesId)
	}
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, timeOperation)
}

export async function savePublicAvailibilityData (req: Request, res: Response): Promise<void> {
	const doctorId = req.doctorId

	const publicAvailibility = req.body.PublicAvailibility
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.updatePublicAvilability(publicAvailibility, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
