import moment from "moment"
import AuthDataService from "src/services/auth-data-service"
import handle401AxiosError from "src/utils/handle-errors/handle-401-axios-error"

export default async function fetchLoginHistory(
  setLoginHistory: React.Dispatch<React.SetStateAction<LoginHistoryItem[]>>
): Promise<void> {
  try {
    const response = await AuthDataService.fetchLoginHistry()
    const formattedData = response.data.map((item: LoginHistoryItem) => ({
      ...item,
      Login_at: moment(item.Login_at).format("MMMM Do, YYYY [at] h:mmA"),
    }))
    setLoginHistory(formattedData)
    sessionStorage.setItem("LoginHistory", JSON.stringify(formattedData))
  } catch (error: unknown) {
    handle401AxiosError(error)
  }
}
