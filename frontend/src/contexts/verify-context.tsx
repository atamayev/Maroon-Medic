import { createContext } from "react";
import AuthDataService from "../services/auth-data-service";
import { invalidUserAction } from "../custom-hooks/user-verification-snippets";

interface VerifyContextType {
  userVerification: (clearSession: boolean) => Promise<{verified: boolean, userType?: string | null}>;
}

const defaultVerifyContext: VerifyContextType = {
  userVerification: async () => ({verified: false}),
};

const VerifyContext = createContext<VerifyContextType>(defaultVerifyContext);

function checkCookie(name: string): boolean {
  return document.cookie.split(";").some((item) => item.trim().startsWith(name + "="));
}

function clearAndReturnFalse(clearSession: boolean): {verified: boolean} {
  if (clearSession) sessionStorage.clear();
  return { verified: false };
}

interface VerifyContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

const VerifyContextProvider = (props: VerifyContextProviderProps) => {
  async function userVerification (clearSession: boolean) {
    try {
      if (!checkCookie("DoctorAccessToken") && !checkCookie("PatientAccessToken")) {
        return clearAndReturnFalse(clearSession);
      }

      const response = await AuthDataService.verify();

      if (response.data.isValid !== true) return clearAndReturnFalse(clearSession);

      return {
        verified: true,
        userType: response.data.type || null,
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        invalidUserAction(error.response.data);
      }
      return clearAndReturnFalse(clearSession);
    }
  }


  return (
    <VerifyContext.Provider value = {{ userVerification }}>
      {props.children}
    </VerifyContext.Provider>
  );
};

export { VerifyContext, VerifyContextProvider };
