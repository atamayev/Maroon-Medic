import _ from "lodash"
import { Response, Request } from "express"
import TimeUtils from "../../utils/time"
import DataFormatter from "../../utils/data-formatter"
import OperationHandler from "../../utils/operation-handler"
import PrivatePatientDataDB from "../../db/private-patient-data/private-patient-data-DB"
import FetchPatientAccountData from "../../utils/fetch-account-and-public-data/fetch-patient-account-data"

type LanguageItem = {
  language_listID: number
  Language_name: string
}

interface PatientResponse {
  languages: LanguageItem[]
}

export async function newPatient (req: Request, res: Response): Promise<void> {
  const PatientID = req.PatientID

  const newPatientObject = req.body.newPatientObject

  const dateOfBirth = TimeUtils.convertDOBStringIntoMySQLDate(newPatientObject.DOB_month, newPatientObject.DOB_day, newPatientObject.DOB_year)
  const operation = async () => await PrivatePatientDataDB.addNewPatientInfo(newPatientObject, dateOfBirth, PatientID)
  OperationHandler.executeAsyncOperationAndReturnCustomValueToRes(res, operation)
}

export async function fetchDashboardData (req: Request, res: Response): Promise<Response> {
  const PatientID = req.PatientID

  try {
    const DashboardData = await PrivatePatientDataDB.retrievePatientDashboard(PatientID)
    if (_.isEmpty(DashboardData)) return res.json([])
    else {
      for (const singleAppointment of DashboardData) {
        singleAppointment.appointment_date = TimeUtils.convertMySQLDateIntoReadableString(singleAppointment.appointment_date)
        singleAppointment.Created_at = TimeUtils.convertMySQLDateIntoReadableString(singleAppointment.Created_at)
      }
      return res.json(DashboardData)
    }
  } catch (error: unknown) {
    return res.json([])
  }
}

export async function fetchPersonalData (req: Request, res: Response): Promise<Response> {
  const PatientID = req.PatientID

  let PersonalData = {
    FirstName: "",
    LastName: "",
    Gender: "",
    DOB_month: "",
    DOB_day: 0,
    DOB_year: 0
  }

  try {
    const unformattedPersonaData = await PrivatePatientDataDB.retrievePersonalPatientData(PatientID)
    if (_.isEmpty(unformattedPersonaData)) return res.json(PersonalData)
    else {
      PersonalData = DataFormatter.formatPersonalData(unformattedPersonaData)
      return res.json(PersonalData)
    }
  } catch (error: unknown) {
    return res.json(PersonalData)
  }
}

export async function fetchPetData (req: Request, res: Response): Promise<void> {
  const PatientID = req.PatientID
  const operation = async () => {
    return await FetchPatientAccountData.fetchPetData(PatientID)
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchAccountDetails (req: Request, res: Response): Promise<Response> {
  const PatientID = req.PatientID
  try {
    const response: PatientResponse = {
      languages: await FetchPatientAccountData.fetchPatientLanguages(PatientID)
    }
    return res.status(200).json(response)
  } catch (error: unknown) {
    return res.status(400).json([])
  }
}
