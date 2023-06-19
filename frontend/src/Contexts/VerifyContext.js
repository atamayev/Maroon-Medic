import React, { createContext } from 'react';
import AuthDataService from '../Services/auth-data-service';
import { invalidUserAction } from '../Custom Hooks/user-verification-snippets';

const VerifyContext = createContext();

function checkCookie(name) {
  return document.cookie.split(';').some((item) => item.trim().startsWith(name + '='));
}

const VerifyContextProvider = (props) => {
  async function user_verification () {
    try {
      if (!checkCookie('DoctorAccessToken') &&  !checkCookie('PatientAccessToken')) {
        sessionStorage.clear();
        return {
          verified: false
        };
      }
    } catch(error) {
      sessionStorage.clear();
      return {
        verified: false
      };
    } 
    // finally {
    //   sessionStorage.clear();
    //   window.location.href = '/';
    // }

    try {
      const response = await AuthDataService.verify();
      if (response.data.isValid === true) {
        return {
          verified: true, 
          user_type: response.data.type
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
    <VerifyContext.Provider value = {{ user_verification }}>
      {props.children}
    </VerifyContext.Provider>
  );
};

export { VerifyContext, VerifyContextProvider };
