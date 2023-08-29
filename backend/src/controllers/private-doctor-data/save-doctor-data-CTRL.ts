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
	const languageId: number = req.body.languageId
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addLanguage(languageId, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteLanguage (req: Request, res: Response): Promise<void> {
	const languageId: number = Number(req.params.languageId)
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteLanguage(languageId, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addSpecialty (req: Request, res: Response): Promise<void> {
	const specialtyId = req.body.specialtyId
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addSpecialty(specialtyId, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteSpecialty (req: Request, res: Response): Promise<void> {
	const specialtyId: number = Number(req.params.specialtyId)
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteSpecialty(specialtyId, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addServicedPet (req: Request, res: Response): Promise<void> {
	const servicedPetId = req.body.petId
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addServicedPet(servicedPetId, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteServicedPet (req: Request, res: Response): Promise<void> {
	const servicedPetId: number = Number(req.params.servicedPetId)
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteServicedPet(servicedPetId, doctorId)
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
	const servicedPetId: number = Number(req.params.serviceId)
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteServicesData(servicedPetId, doctorId)
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
	const preVetEducationId: number = Number(req.params.preVetEducationId)

	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deletePreVetEducationData(preVetEducationId)
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
	const vetEducationId: number = Number(req.params.vetEducationId)
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteVetEducationData(vetEducationId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addAddress (req: Request, res: Response): Promise<Response> {
	const doctorId = req.doctorId
	const AddressData = req.body.AddressData
	const TimesData = req.body.Times

	const insertId = await OperationHandler.executeAsyncAndReturnValue(res, SaveDoctorDataDB.addAddressRecord, AddressData, doctorId)
	const insertIdNumber = Number(insertId)

	if (AddressData.phone) {
		const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addPhoneRecord(AddressData.phone, insertIdNumber)
		await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
	}

	if (!_.isEmpty(TimesData)) {
		for (const timeData of TimesData) {
			const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addAvailbilityData(timeData, insertIdNumber)
			await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
		}
	}

	return res.status(200).json(insertId)
}

export async function deleteAddress (req: Request, res: Response): Promise<void> {
	const addressId: number = Number(req.params.addressId)

	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteAddressRecord(addressId)
	await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)

	const phoneOperation: () => Promise<void> = async () => await SaveDoctorDataDB.deletePhoneRecord(addressId)
	await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, phoneOperation)

	const timeOperation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteAvailbilityData(addressId)
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
