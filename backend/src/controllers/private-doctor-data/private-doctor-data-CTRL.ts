import _ from "lodash"
import { Request, Response } from "express"
import TimeUtils from "../../utils/time"
import Format from "../../utils/data-formatter"
import OperationHandler from "../../utils/operation-handler"
import PrivateDoctorDataDB from "../../db/private-doctor-data/private-doctor-data-DB"
import FetchDoctorAccountData from "../../utils/fetch-account-and-public-data/fetch-doctor-account-data"

export async function newDoctor (req: Request, res: Response): Promise<void> {
  const DoctorID = req.DoctorID

  const newDoctorObject = req.body.newDoctorObject

  const dateOfBirth = TimeUtils.convertDOBStringIntoMySQLDate(newDoctorObject.DOB_month, newDoctorObject.DOB_day, newDoctorObject.DOB_year)
  const operation: () => Promise<void> = async () => await PrivateDoctorDataDB.addNewDoctorInfo(newDoctorObject, dateOfBirth, DoctorID)
  await OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function fetchDashboardData (req: Request, res: Response): Promise<Response> {
  const DoctorID = req.DoctorID

  try {
    const DashboardData = await PrivateDoctorDataDB.retrieveDoctorDashboard(DoctorID)
    for (const singleAppointment of DashboardData) {
      singleAppointment.appointment_date = TimeUtils.convertMySQLDateIntoReadableString(singleAppointment.appointment_date)
      singleAppointment.Created_at = TimeUtils.convertMySQLDateIntoReadableString(singleAppointment.Created_at)
    }
    return res.status(200).json(DashboardData)
  } catch (error: unknown) {
    return res.status(500).json([])
  }
}

export async function fetchPersonalData (req: Request, res: Response): Promise<Response> {
  const DoctorID = req.DoctorID

  let PersonalData = {
    FirstName: "",
    LastName: "",
    Gender: "",
    DOB_month: "",
    DOB_day: -1,
    DOB_year: -1
  }

  try {
    const unformattedPersonaData = await PrivateDoctorDataDB.retrievePersonalDoctorData(DoctorID)
    if (_.isEmpty(unformattedPersonaData)) return res.status(200).json(PersonalData)
    else {
      PersonalData = Format.personalData(unformattedPersonaData)
      return res.status(200).json(PersonalData)
    }
  } catch (error: unknown) {
    return res.status(500).json(PersonalData)
  }
}

export async function fetchAccountDetails (req: Request, res: Response): Promise<Response> {
  const DoctorID = req.DoctorID

  try {
    const verificationAndPublicAv = await FetchDoctorAccountData.verifiedAndPubliclyAvailable(DoctorID)
    const response: DoctorAccountDetails = {
      languages            : await FetchDoctorAccountData.languages(DoctorID),
      services             : await FetchDoctorAccountData.services(DoctorID),
      specialties          : await FetchDoctorAccountData.specialties(DoctorID),
      preVetEducation      : await FetchDoctorAccountData.preVetEducation(DoctorID),
      vetEducation         : await FetchDoctorAccountData.vetEducation(DoctorID),
      addressData          : await FetchDoctorAccountData.addresses(DoctorID),
      description          : await FetchDoctorAccountData.description(DoctorID),
      servicedPets         : await FetchDoctorAccountData.servicedPets(DoctorID),
      verified             : verificationAndPublicAv.Verified,
      publiclyAvailable    : verificationAndPublicAv.PubliclyAvailable
      // response.pictures             = await FetchDoctorAccountData.pictures(DoctorID)
    }
    return res.status(200).json(response)
  } catch (error: unknown) {
    return res.status(400).json([])
  }
}