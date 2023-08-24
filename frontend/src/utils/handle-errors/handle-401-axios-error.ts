import { AxiosError } from "axios"
import invalidUserAction from "../invalid-user-action"

const handle401AxiosError = (error: unknown): void => {
	if (error instanceof AxiosError) {
		if (error.response?.status === 401) {
			invalidUserAction(error.response.data)
		}
	}
}

export default handle401AxiosError
