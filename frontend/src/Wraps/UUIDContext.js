import React, { createContext, useState } from 'react';

const UUIDContext = createContext();

const UUIDContextProvider = (props) => {
  const [DoctorUUID, setDoctorUUID] = useState(null);
  const [PatientUUID, setPatientUUID] = useState(null);
  const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

  function checkUUID(type) {
    try{
        const cookieValue = getCookieValue(type);
        if (cookieValue) {
          if(type === 'DoctorUUID=' && uuidRegex.test(cookieValue)){
            setDoctorUUID(cookieValue)
            // console.log('true')
            return true
          }
          if(type === 'PatientUUID=' && uuidRegex.test(cookieValue)){
            setPatientUUID(cookieValue)
            // console.log('true')
            return true
          }
        } else {
          // console.log('false')
          return false;
        }
    }catch(error){
      console.log('err in UUID context', error)
    }
  }
  
  function getCookieValue(cookieName) {
    const cookieArray = document.cookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.startsWith(cookieName)) {
        return cookie.substring(cookieName.length, cookie.length)
      }
    }
    return "";
  }

  return (
    <UUIDContext.Provider value={{ DoctorUUID, PatientUUID, checkUUID}}>
      {props.children}
    </UUIDContext.Provider>
  );
};

export { UUIDContext, UUIDContextProvider };
