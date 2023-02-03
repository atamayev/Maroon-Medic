import React, { createContext, useState, useEffect } from 'react';

const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [DoctorUUID, setDoctorUUID] = useState(null);

  useEffect(() => {
    checkDoctorUUID();
  }, []);

  const checkDoctorUUID = () => {
    const cookieName = "DoctorUUID=";
    const decodedCookie = document.cookie; // when https, will need to decode
    const cookies = decodedCookie.split(";");
    console.log('cookies', cookies)
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

  return (
    <DoctorContext.Provider value={{ DoctorUUID }}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export { DoctorContext, DoctorContextProvider };
