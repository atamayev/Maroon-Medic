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
        return false;
      }
    }catch(error){
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
