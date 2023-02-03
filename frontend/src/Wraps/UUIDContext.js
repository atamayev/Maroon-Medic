import React, { createContext, useState } from 'react';

const UUIDContext = createContext();

const UUIDContextProvider = (props) => {
  const [DoctorUUID, setDoctorUUID] = useState(null);
  const [PatientUUID, setPatientUUID] = useState(null);

  const checkDoctorUUID = () => {
    const cookieName = "DoctorUUID=";
    const decodedCookie = document.cookie; // when https, will need to decode
    const cookies = decodedCookie.split(";");
    // console.log('cookies', cookies)
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.startsWith(cookieName)) {
        setDoctorUUID(cookie.substring(cookieName.length, cookie.length));
      }
    }
  };

  const checkPatientUUID = () => {
    const cookieName = "PatientUUID=";
    const decodedCookie = document.cookie; // when https, will need to decode
    const cookies = decodedCookie.split(";");
    console.log('cookies', cookies)
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.startsWith(cookieName)) {
        setPatientUUID(cookie.substring(cookieName.length, cookie.length));
      }
    }
  };

  return (
    <UUIDContext.Provider value={{ DoctorUUID, checkDoctorUUID, PatientUUID, checkPatientUUID }}>
      {props.children}
    </UUIDContext.Provider>
  );
};

export { UUIDContext, UUIDContextProvider };
