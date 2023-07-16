export async function handleAsyncOperation(res, operation, whatToReturnSuccess = null, whatToReturnFailure = null) {
  try {
    await operation()
    res.status(200).json(whatToReturnSuccess)
  } catch (error) {
    console.log(error)
    res.status(400).json(whatToReturnFailure)
    // throw error
  }
}

export async function handleAsyncOperationWithoutReturn(res, operation, whatToReturnFailure = null) {
  try {
    await operation()
  } catch (error) {
    console.log(error)
    res.status(400).json(whatToReturnFailure)
    // throw error
  }
}

export async function handleAsyncOperationWithReturn(res, operation, whatToReturnFailure = null) {
  try {
    const result = await operation()
    res.status(200).json(result)
  } catch (error) {
    console.log(error)
    res.status(400).json(whatToReturnFailure)
    // throw error
  }
}

export async function executeCheck(fn, Param, res) {
  try {
    return await fn(Param)
  } catch (error) {
    console.error(error)
    res.status(400).json()
    // throw error // This is necessary to stop execution of the caller function if the check fails
  }
}
