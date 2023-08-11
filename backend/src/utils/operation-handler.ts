/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express"

export default new class OperationHandler {
  async executeAsyncOperationAndReturnCustomValueToRes(
    res: Response,
    operation: () => Promise<any>,
    whatToReturnSuccess: any = null
  ): Promise<void> {
    try {
      await operation()
      res.status(200).json(whatToReturnSuccess)
    } catch (error: any) {
      console.log(error)
      res.status(400).json()
    }
  }

  async executeAsyncOperationWithoutReturnValueNorRes(
    res: Response,
    operation: () => Promise<any>,
    whatToReturnFailure: string[] | null = null
  ): Promise<void> {
    try {
      await operation()
    } catch (error: any) {
      console.log(error)
      res.status(400).json(whatToReturnFailure)
    }
  }

  async executeAsyncAndReturnValueToRes(
    res: Response,
    operation: () => Promise<any>,
    whatToReturnFailure: string[] | null = null
  ): Promise<void> {
    try {
      const result = await operation()
      res.status(200).json(result)
    } catch (error: any) {
      console.log(error)
      res.status(400).json(whatToReturnFailure)
    }
  }

  async executeAsyncAndReturnValue<T>(
    res: Response,
    fn: (...args: any[]) => Promise<T>,
    ...args: any[]
  ): Promise<T | void> {
    try {
      return await fn(...args)
    } catch (error: any) {
      console.log(error)
      res.status(400).json()
      // throw error // This is necessary to stop execution of the caller function if the check fails
    }
  }
}()
