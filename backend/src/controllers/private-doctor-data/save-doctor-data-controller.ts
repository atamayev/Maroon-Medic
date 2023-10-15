import _ from "lodash"
import { Response, Request } from "express"
import OperationHandler from "../../utils/operation-handler"
import SaveDoctorDataDB from "../../db/private-doctor-data/save-doctor-data-db"
import findAppointmentTimeDifference from "../../utils/find-appointment-time-difference"

export async function savePersonalData (req: Request, res: Response): Promise<void> {
	const doctorId = req.doctorId
	const doesRecordExist = await OperationHandler.executeAsyncAndReturnValue(res, SaveDoctorDataDB.checkIfPersonalDataExists, doctorId)

	const personalInfo = req.body.personalInfo as FormattedPersonalData

	if (doesRecordExist) {
		const operation: () => Promise<void> = async () => await SaveDoctorDataDB.updatePersonalData(personalInfo, doctorId)
		await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
	} else {
		const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addPersonalData(personalInfo, doctorId)
		await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
	}
}

export async function saveDescriptionData (req: Request, res: Response): Promise<void> {
	const doctorId = req.doctorId
	const description = req.body.description as string

	const doesDescriptionExist = await OperationHandler.executeAsyncAndReturnValue(res, SaveDoctorDataDB.checkIfDescriptionExists, doctorId)

	if (doesDescriptionExist) {
		const operation: () => Promise<void> = async () => await SaveDoctorDataDB.updateDescription(description, doctorId)
		await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
	} else {
		const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addDescription(description, doctorId)
		await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
	}
}

export async function addLanguage (req: Request, res: Response): Promise<void | Response> {
	const languageId: number = Number(req.params.languageId)
	if (isNaN(languageId)) return res.status(400).json({ error: "Invalid languageID" })

	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addLanguage(languageId, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteLanguage (req: Request, res: Response): Promise<void | Response> {
	const languageId: number = Number(req.params.languageId)
	if (isNaN(languageId)) return res.status(400).json({ error: "Invalid languageID" })

	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteLanguage(languageId, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addSpecialty (req: Request, res: Response): Promise<void | Response> {
	const specialtyId: number = Number(req.params.specialtyId)
	if (isNaN(specialtyId)) return res.status(400).json({ error: "Invalid specialtyID" })

	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addSpecialty(specialtyId, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteSpecialty (req: Request, res: Response): Promise<void | Response> {
	const specialtyId: number = Number(req.params.specialtyId)
	if (isNaN(specialtyId)) return res.status(400).json({ error: "Invalid specialtyID" })

	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteSpecialty(specialtyId, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addServicedPet (req: Request, res: Response): Promise<void | Response> {
	const servicedPetId: number = Number(req.params.servicedPetId)
	if (isNaN(servicedPetId)) return res.status(400).json({ error: "Invalid pet ID" })

	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addServicedPet(servicedPetId, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteServicedPet (req: Request, res: Response): Promise<void | Response> {
	const servicedPetId: number = Number(req.params.servicedPetId)
	if (isNaN(servicedPetId)) return res.status(400).json({ error: "Invalid pet ID" })

	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteServicedPet(servicedPetId, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addService (req: Request, res: Response): Promise<void> {
	const serviceObject = req.body.serviceObject as DetailedServiceItem
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addServicesData(serviceObject, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function updateService (req: Request, res: Response): Promise<void> {
	const serviceObject = req.body.serviceObject as DetailedServiceItem
	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.updateServicesData(serviceObject, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function deleteService (req: Request, res: Response): Promise<void | Response> {
	const serviceId: number = Number(req.params.serviceId)
	if (isNaN(serviceId)) return res.status(400).json({ error: "Invalid service ID" })

	const doctorId = req.doctorId
	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteServicesData(serviceId, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addPreVetEducationData (req: Request, res: Response): Promise<void> {
	const doctorId = req.doctorId
	const preVetEducationData = req.body.preVetEducationData as AddPreVetEducationItem
	const operation: () => Promise<number> = async () => {
		return await SaveDoctorDataDB.addPreVetEducationData(preVetEducationData, doctorId)
	}
	await OperationHandler.executeAsyncAndReturnValueToRes(res, operation)
}

export async function deletePreVetEducationData (req: Request, res: Response): Promise<void | Response> {
	const preVetEducationId: number = Number(req.params.preVetEducationId)
	if (isNaN(preVetEducationId)) return res.status(400).json({ error: "Invalid education ID" })

	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deletePreVetEducationData(preVetEducationId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addVetEducationData (req: Request, res: Response): Promise<void> {
	const doctorId = req.doctorId
	const vetEducationData = req.body.vetEducationData as AddEducationItem
	const operation: () => Promise<number> = async () => {
		return await SaveDoctorDataDB.addVetEducationData(vetEducationData, doctorId)
	}
	await OperationHandler.executeAsyncAndReturnValueToRes(res, operation)
}

export async function deleteVetEducationData (req: Request, res: Response): Promise<void | Response> {
	const vetEducationId: number = Number(req.params.vetEducationId)
	if (isNaN(vetEducationId)) return res.status(400).json({ error: "Invalid education ID" })

	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteVetEducationData(vetEducationId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function addAddress (req: Request, res: Response): Promise<Response> {
	const doctorId = req.doctorId
	const addressData = req.body.addressData as PrivateDoctorAddressLessTimes
	const timesData = req.body.times as DoctorAvailability[]

	const insertId = await OperationHandler.executeAsyncAndReturnValue(res, SaveDoctorDataDB.addAddressRecord, addressData, doctorId)
	const insertIdNumber = Number(insertId)

	if (addressData.phone) {
		const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addPhoneRecord(addressData.phone, insertIdNumber)
		await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
	}

	if (!_.isEmpty(timesData)) {
		for (const timeData of timesData) {
			const operation: () => Promise<void> = async () => await SaveDoctorDataDB.addAvailbilityData(timeData, insertIdNumber)
			await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)
		}
	}

	return res.status(200).json(insertId)
}

export async function deleteAddress (req: Request, res: Response): Promise<void | Response> {
	const addressId: number = Number(req.params.addressId)
	if (isNaN(addressId)) return res.status(400).json({ error: "Invalid address ID" })

	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteAddressRecord(addressId)
	await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)

	const phoneOperation: () => Promise<void> = async () => await SaveDoctorDataDB.deletePhoneRecord(addressId)
	await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, phoneOperation)

	const timeOperation: () => Promise<void> = async () => await SaveDoctorDataDB.deleteAvailbilityData(addressId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, timeOperation)
}

export async function updateAddress (req: Request, res: Response): Promise<void> {
	const addressData = req.body.addressData as PrivateDoctorAddressLessTimes
	const timesData = req.body.times as DoctorAvailability[]

	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.updateAddressRecord(addressData)
	await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, operation)

	const phoneOperation: () => Promise<void> = async () => await SaveDoctorDataDB.updatePhoneRecord(addressData)
	await OperationHandler.executeAsyncOperationWithoutReturnValueNorRes(res, phoneOperation)

	const timeOperation: () => Promise<void> = async () => {
		await findAppointmentTimeDifference(timesData, addressData.addressesId)
	}
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, timeOperation)
}

export async function savePublicAvailibilityData (req: Request, res: Response): Promise<void> {
	const doctorId = req.doctorId
	const publicAvailibility = req.body.publicAvailibility

	const operation: () => Promise<void> = async () => await SaveDoctorDataDB.updatePublicAvilability(publicAvailibility, doctorId)
	await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}
