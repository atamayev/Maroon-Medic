import React, { createContext, useState } from 'react';
import VetDataService from "../Services/data-service"

const VerifyContext = createContext();

const VerifyContextProvider = (props) => {
  const [DoctorVerifyToken, setDoctorVerifyToken] = useState(null) // wheather or not user verified
  const [PatientVerifyToken, setPatientVerifyToken] = useState(null) // wheather or not user verified

  async function user_verification (){
    try{
      const response = await VetDataService.verify()
      const tokenValue = response.data.tokenValue
      if (response.data.type === 'Doctor' && response.data.isValid === true) {
        setDoctorVerifyToken(tokenValue)
        return true
      }
      else if (response.data.type === 'Patient' && response.data.isValid === true){
        setPatientVerifyToken(tokenValue)
        return true
      }
      else {
        console.log('false')
        setDoctorVerifyToken(null)
        setPatientVerifyToken(null)
        return false;
      }
    }catch(error){
      setDoctorVerifyToken(null)
      setPatientVerifyToken(null)
      console.log('err in user_verification context', error)
    }
  }

  //     if(response.data.success === true){
  //       // console.log('true in verify context')
  //       setDoctorVerifyToken(true)
  //       return true
  //     }
  //     else{// if user not veriifed
  //       console.log('user not verified')
  //       setDoctorVerifyToken(false);
  //       return false
  //     }
  //   }catch(error){
  //     setDoctorVerifyToken(false)
  //     console.log('err in UUID context', error)
  //   }
  // }

  return (
    <VerifyContext.Provider value={{ DoctorVerifyToken, PatientVerifyToken, user_verification }}>
      {props.children}
    </VerifyContext.Provider>
  );
};

export { VerifyContext, VerifyContextProvider };
