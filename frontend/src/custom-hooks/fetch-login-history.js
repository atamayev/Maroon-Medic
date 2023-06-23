import moment from "moment";
import AuthDataService from "../services/auth-data-service";
import { invalidUserAction } from "./user-verification-snippets";

export async function fetchLoginHistory(setLoginHistory) {
    try {
      const response = await AuthDataService.fetchLoginHistry();
      if (response) {
        const formattedData = response.data.map((item) => ({
          ...item,
          Login_at: moment(item.Login_at).format('MMMM Do, YYYY [at] h:mmA'),
        }));
        setLoginHistory(formattedData);
        sessionStorage.setItem("LoginHistory", JSON.stringify(formattedData))
      }
    } catch (error) {
      if (error.response.status === 401) invalidUserAction(error.response.data)
    }
}
