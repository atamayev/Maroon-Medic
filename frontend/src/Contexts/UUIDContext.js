// not currently being used. UUID is being accessed from the server as a cookie. no need to send it through a context.
// keeping it just in case when HTTPS implemented, will need to use a special way to communicate between server/client

import React, { createContext, useState } from 'react';
import DataService from '../Services/data-service';
const UUIDContext = createContext();

const UUIDContextProvider = (props) => {
  const [DoctorUUID, setDoctorUUID] = useState(null);
  const [PatientUUID, setPatientUUID] = useState(null);

  async function checkUUID() {
    try{
      const response = await DataService.checkUUID();
      const cookieValue = response.data.cookieValue
      if (response.data.type === 'Doctor' && response.data.isValid === true) {
        setDoctorUUID(cookieValue)
        return true
      }
      else if (response.data.type === 'Patient' && response.data.isValid === true){
        setPatientUUID(cookieValue)
        return true
      }
      else {
        console.log('false')
        setDoctorUUID(null)
        setPatientUUID(null)
        return false;
      }
    }catch(error){
      setDoctorUUID(null)
      setPatientUUID(null)
      console.log('err in UUID context', error)
    }
  }

  return (
    <UUIDContext.Provider value={{ DoctorUUID, PatientUUID, checkUUID}}>
      {props.children}
    </UUIDContext.Provider>
  );
};

export { UUIDContext, UUIDContextProvider };
