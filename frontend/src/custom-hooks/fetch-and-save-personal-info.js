import {useState, useEffect } from 'react'
import PrivateDoctorDataService from "../services/private-doctor-data-service";
import PrivatePatientDataService from "../services/private-patient-data-service";
import { invalidUserAction } from "./user-verification-snippets";

export async function fetchPersonalInfoData(setPersonalInfo, userType) {
    if (userType === 'Doctor' || userType === 'Patient') {
        try {
            let response;
            
            if (userType === "Doctor") response = await PrivateDoctorDataService.fillPersonalData()
            else if (userType === "Patient") response = await PrivatePatientDataService.fillPersonalData()

            if (response) {
                setPersonalInfo(response.data);
                sessionStorage.setItem(`${userType}PersonalInfo`, JSON.stringify(response.data))
            }
        } catch(error) {
            if (error.response.status === 401) invalidUserAction(error.response.data)
        }
    }
}

export const handleSavePersonalInfo = async (personalInfo, setPersonalInfoConfirmation, userType) => {
    if (userType === 'Doctor' || userType === 'Patient') {
        const storedPersonalInfoData = sessionStorage.getItem(`${userType}PersonalInfo`);
        const stringifiedPersonalInfoData = JSON.stringify(personalInfo)

        try {
            if (stringifiedPersonalInfoData !== storedPersonalInfoData) {// if there is a change, and handlesave is used:
                try {
                    let response
                    if (userType === 'Doctor') response = await PrivateDoctorDataService.savePersonalData(personalInfo);
                    else if (userType === 'Patient') response = await PrivatePatientDataService.savePersonalData(personalInfo);

                    if (response.status === 200) {
                        sessionStorage.setItem(`${userType}PersonalInfo`, JSON.stringify(personalInfo));
                        setPersonalInfoConfirmation({messageType: 'saved'});
                    }
                } catch (error) {
                    if (error.response.status === 401) invalidUserAction(error.response.data)
                    else setPersonalInfoConfirmation({messageType: 'problem'});
                }
            } else {
                setPersonalInfoConfirmation({messageType: 'same'});
            }
        } catch(error) {
            setPersonalInfoConfirmation({messageType: 'problem'});
        }
    }
};

export function usePersonalInfo(userType) {
    const [personalInfo, setPersonalInfo] = useState({});
  
    useEffect(() => {
      const fetchAndSetPersonalInfo = async () => {
        if (userType === 'Doctor' || userType === 'Patient') {
          try {
            const storedPersonalInfoData = sessionStorage.getItem(`${userType}PersonalInfo`)
            if (storedPersonalInfoData) setPersonalInfo(JSON.parse(storedPersonalInfoData));
            else fetchPersonalInfoData(setPersonalInfo, userType);
          } catch(error) {
          }
        }
      };
  
      fetchAndSetPersonalInfo();
    }, [userType]);
  
    return {personalInfo, setPersonalInfo};
  }
  
