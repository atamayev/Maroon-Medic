import SearchDB from "../db/search-db"
import FetchAll from "../utils/fetch-all-lists"
import OperationHandler from "../utils/operation-handler"
import { Request, Response } from "express"

interface Params {
	query: string
}

export async function searchByQuery (req: Request<Params>, res: Response): Promise<Response> {
	const userQuery = req.params.query
	try {
		const searchResults = await SearchDB.retrieveDoctorsFromSearchTerm(userQuery)
		return res.status(200).json(searchResults)
	} catch (error: unknown) {
		return res.status(400).json({ error: "Search by Query Error" })
	}
}

export async function fetchUsers (req: Request, res: Response): Promise<void> {
	const operation: () => Promise<DoctorPersonalInfo[]> = async () => {
		return await SearchDB.retrieveAllDoctors()
	}
	await OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

// The following three functions are here for filtering purposes.
//In the future, patients will be able to filter for docs by language_spoken, insurances, etc.
export async function fetchAllLanguages (req: Request, res: Response): Promise<void> {
	const operation: () => Promise<LanguageItem[]> = async () => {
		return await FetchAll.languages()
	}
	await OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchAllServicesAndCategories (req: Request, res: Response): Promise<void> {
	const operation: () => Promise<ServiceListItem[]> = async () => {
		return await FetchAll.servicesAndCategories()
	}
	await OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}
