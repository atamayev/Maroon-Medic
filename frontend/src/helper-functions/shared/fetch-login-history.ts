import dayjs from "dayjs"
import { MaroonContext } from "src/contexts/maroon-context"
import AuthDataService from "src/services/auth-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function fetchLoginHistory(
	setLoginHistory: React.Dispatch<React.SetStateAction<LoginHistoryItem[]>>,
	appContext: MaroonContext
): Promise<void> {
	try {
		const response = await AuthDataService.fetchLoginHistry()
		if (Array.isArray(response.data) && response.data.length > 0 && "loginAt" in response.data[0]) {
			const formattedData = response.data.map((item: LoginHistoryItem) => ({
				...item,
				loginAt: dayjs(item.loginAt).format("MMMM D, YYYY [at] h:mmA")
			}))
			setLoginHistory(formattedData)
			appContext.loginHistory = formattedData
		}
	} catch (error: unknown) {
		handle401AxiosError(error)
	}
}
