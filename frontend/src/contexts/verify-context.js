import { createContext } from 'react';
import AuthDataService from '../services/auth-data-service';
import { invalidUserAction } from '../custom-hooks/user-verification-snippets';

const VerifyContext = createContext();

function checkCookie(name) {
  return document.cookie.split(';').some((item) => item.trim().startsWith(name + '='));
}

const VerifyContextProvider = (props) => {
  async function userVerification (clearSession) {
    try {
      if (!checkCookie('DoctorAccessToken') && !checkCookie('PatientAccessToken')) {
        if (clearSession) sessionStorage.clear();
        return {
          verified: false
        };
      }
    } catch(error) {
      if (clearSession) sessionStorage.clear();
      return {
        verified: false
      };
    }

    try {
      const response = await AuthDataService.verify();
      if (response.data.isValid === true) {
        return {
          verified: true, 
          userType: response.data.type
        };
      }
      else {
        return {
          verified: false
        };
      }
    } catch(error) {
      if (error.response.status === 401) invalidUserAction(error.response.data)
      else return {verified: false};
    }
  }

  return (
    <VerifyContext.Provider value = {{ userVerification }}>
      {props.children}
    </VerifyContext.Provider>
  );
};

export { VerifyContext, VerifyContextProvider };
