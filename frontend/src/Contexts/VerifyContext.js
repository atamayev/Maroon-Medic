import React, { createContext } from 'react';
import AuthDataService from '../Services/auth-data-service';

const VerifyContext = createContext();

function checkCookie(name) {
  return document.cookie.split(';').some((item) => item.trim().startsWith(name + '='));
}

const VerifyContextProvider = (props) => {
  async function user_verification (){
    try{
      if(!checkCookie('DoctorAccessToken') &&  !checkCookie('PatientAccessToken')){
        return {
          verified: false
        };
      }
    }catch(error){
      return {
        verified: false
      };
    }

    try{
      const response = await AuthDataService.verify();
      if (response.data.isValid === true) {
        return {
          verified: true, 
          user_type: response.data.type
        };
      }
      else {
        console.log('false');
        return {
          verified: false
        };
      }
    }catch(error){
      return {
        verified: false
      };
    }
  }

  return (
    <VerifyContext.Provider value={{ user_verification }}>
      {props.children}
    </VerifyContext.Provider>
  );
};

export { VerifyContext, VerifyContextProvider };
