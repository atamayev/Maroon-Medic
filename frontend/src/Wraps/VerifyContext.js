import React, { createContext, useState } from 'react';
import VetDataService from "../Services/vet-service"

const VerifyContext = createContext();

const VerifyContextProvider = (props) => {
  const [verifyToken, setverifyToken] = useState(false) // wheather or not user verified

  async function user_verification (cookie_monster){
    // const cookies = document.cookie;
    // console.log('using user verification')
    console.log(cookie_monster)
    if(cookie_monster){
      const response = await VetDataService.verify(cookie_monster)
      if(response.data.success === true){
        console.log('true in verify context')
        setverifyToken(true)
      }
      else{// if user not veriifed
        setverifyToken(false);
      }
    }
    else{// if no token received
      setverifyToken(false);
    }
  }

  return (
    <VerifyContext.Provider value={{ verifyToken, user_verification }}>
      {props.children}
    </VerifyContext.Provider>
  );
};

export { VerifyContext, VerifyContextProvider };
