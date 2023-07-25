import _ from "lodash"
import SearchDB from "../db/search-DB"
import FetchAllLists from "../utils/fetch-all-lists"
import OperationHandler from "../utils/operation-handler"
import { Request, Response } from "express"

interface Params {
  query: string
}

export async function searchByQuery (req: Request<Params>, res: Response): Promise<Response> {
  const userQuery = req.params.query
  try {
    const searchResults = await SearchDB.retrieveDoctorsFromSearchTerm(userQuery)
    if (_.isEmpty(searchResults)) return res.json("User not found")
    else return res.json(searchResults)
  } catch (error: unknown) {
    return res.json({ error: "Search by Query Error" })
  }
}

export async function fetchUsers (req: Request, res: Response): Promise<void> {
  const operation = async () => {
    return await SearchDB.retrieveAllDoctors()
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

// The following three functions are here for filtering purposes. In the future, pts will be able to filter for docs by language_spoken, insurances, etc.
export async function fetchAllLanguages (req: Request, res: Response): Promise<void> {
  const operation = async () => {
    return await FetchAllLists.fetchAllLanguages()
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchAllServicesAndCategories (req: Request, res: Response): Promise<void> {
  const operation = async () => {
    return await FetchAllLists.fetchAllServicesAndCategories()
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}

export async function fetchAllInsurances (req: Request, res: Response): Promise<void> {
  const operation = async () => {
    return await FetchAllLists.fetchAllInsurances()
  }
  OperationHandler.executeAsyncAndReturnValueToRes(res, operation, [])
}
