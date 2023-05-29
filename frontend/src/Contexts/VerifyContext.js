import React, { createContext } from 'react';
import AuthDataService from '../Services/auth-data-service';

const VerifyContext = createContext();

const VerifyContextProvider = (props) => {
  async function user_verification (){
    try{
      const response = await AuthDataService.verify();
      console.log('response.data',response.data)
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
