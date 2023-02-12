import React, { createContext, useState } from 'react';
import VetDataService from "../Services/data-service"

const VerifyContext = createContext();

const VerifyContextProvider = (props) => {
  const [verifyToken, setverifyToken] = useState(false) // wheather or not user verified
  
  async function user_verification (){
    try{
      const response = await VetDataService.verify()
      if(response.data.success === true){
        // console.log('true in verify context')
        setverifyToken(true)
        return true
      }
      else{// if user not veriifed
        console.log('user not verified')
        setverifyToken(false);
        return false
      }
    }catch(error){
      setverifyToken(false)
      console.log('err in UUID context', error)
    }
  }

  return (
    <VerifyContext.Provider value={{ verifyToken, user_verification }}>
      {props.children}
    </VerifyContext.Provider>
  );
};

export { VerifyContext, VerifyContextProvider };
