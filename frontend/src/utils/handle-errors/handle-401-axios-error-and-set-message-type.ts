import { AxiosError } from "axios"
import invalidUserAction from "../invalid-user-action"

const handle401AxiosErrorAndSetMessageType = (
  error: unknown,
  setFunction: (conf: ConfirmationMessage) => void
): void => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 401) {
      invalidUserAction(error.response.data)
    }
  }
  else setFunction({messageType: "problem"})
}

export default handle401AxiosErrorAndSetMessageType
