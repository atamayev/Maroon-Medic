export default new class OperationHandler {
  async executeAsyncOperationAndReturnCustomValueToRes(res, operation, whatToReturnSuccess = null) {
    try {
      await operation()
      res.status(200).json(whatToReturnSuccess)
    } catch (error) {
      console.log(error)
      res.status(400).json()
      // throw error
    }
  }

  async executeAsyncOperationWithoutReturnValueNorRes(res, operation, whatToReturnFailure = null) {
    try {
      await operation()
    } catch (error) {
      console.log(error)
      res.status(400).json(whatToReturnFailure)
      // throw error
    }
  }

  async executeAsyncAndReturnValueToRes(res, operation, whatToReturnFailure = null) {
    try {
      const result = await operation()
      res.status(200).json(result)
    } catch (error) {
      console.log(error)
      res.status(400).json(whatToReturnFailure)
      // throw error
    }
  }

  async executeAsyncAndReturnValue(fn, res, ...params) {
    try {
      return await fn(...params)
    } catch (error) {
      console.error(error)
      res.status(400).json()
      // throw error // This is necessary to stop execution of the caller function if the check fails
    }
  }
}()
