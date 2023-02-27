import React, { createContext, useState } from 'react';
import DataService from '../Services/data-service';
const VerifyContext = createContext();

const VerifyContextProvider = (props) => {
  // const [DoctorVerifyToken, setDoctorVerifyToken] = useState(null); // wheather or not user verified
  // const [PatientVerifyToken, setPatientVerifyToken] = useState(null); // wheather or not user verified

  async function user_verification (){
    try{
      const response = await DataService.verify();
      const tokenValue = response.data.tokenValue;
      if (response.data.type === 'Doctor' && response.data.isValid === true) {
        return {
          verified: true, 
          DoctorToken: tokenValue
        };
      }
      else if (response.data.type === 'Patient' && response.data.isValid === true){
        return {
          verified: true, 
          PatientToken: tokenValue
        };
      }
      else {
        console.log('false');
        return {
          verified: false
        };
      }
    }catch(error){
      console.log('Error in user_verification context', error);
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
