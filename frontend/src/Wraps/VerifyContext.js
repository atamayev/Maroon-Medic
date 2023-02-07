import React, { createContext, useEffect, useState } from 'react';
import VetDataService from "../Services/vet-service"

const VerifyContext = createContext();

const VerifyContextProvider = (props) => {
  const [verifyToken, setverifyToken] = useState(false) // wheather or not user verified
  
  async function user_verification (cookie_monster){
    if(cookie_monster){
      const response = await VetDataService.verify(cookie_monster)
      if(response.data.success === true){
        console.log('true in verify context')
        setverifyToken(true)
      }
      else{// if user not veriifed
        console.log('user not verified')
        setverifyToken(false);
      }
    }
    else{// if no token received
      console.log('no cookei received')
      setverifyToken(false);
    }
  }
  useEffect(()=>{
    console.log(verifyToken);
  }, [verifyToken])

  return (
    <VerifyContext.Provider value={{ verifyToken, user_verification }}>
      {props.children}
    </VerifyContext.Provider>
  );
};

export { VerifyContext, VerifyContextProvider };
