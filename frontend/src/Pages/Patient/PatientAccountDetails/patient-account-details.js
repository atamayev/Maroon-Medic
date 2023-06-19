import React, {useEffect, useState, useContext} from 'react'
import { VerifyContext } from '../../../Contexts/VerifyContext';
import PatientHeader from '../patient-header'
import Header from '../../header'
import PrivatePatientDataService from '../../../Services/private-patient-data-service';
import { NonPatientAccess } from '../../../Components/user-type-unauth';
import RenderInsuranceSection from './insurance';
import RenderLanguageSection from './language';
import { invalidUserAction } from '../../../Custom Hooks/user-verification-snippets';

async function FillLists(setListDetails) { 
  try {
    const response = await PrivatePatientDataService.fillLists();
    if (response) {
      setListDetails(response.data);
      sessionStorage.setItem("ListDetails", JSON.stringify(response.data));
    }
  } catch(error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
}

export default function PatientAccountDetails() {
  const [listDetails, setListDetails] = useState({});
  const {user_verification} = useContext(VerifyContext);
  const [user_type, setUser_type] = useState(null);
  const PatientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails"));
  
  const [acceptedInsurances, setAcceptedInsurances] = useState(PatientAccountDetails?.[0] || []);

  const [spokenLanguages, setSpokenLanguages] = useState(PatientAccountDetails?.[1] || []);

  useEffect(() => {
    user_verification()
    .then(result => {
      if (result.verified === true) {
        setUser_type(result.user_type)
        if (result.user_type === 'Patient') {
          try {
            const storedAccountDetails = sessionStorage.getItem("PatientAccountDetails")
            if (!storedAccountDetails) FillPatientAccountDetails();
            const storedListDetails = sessionStorage.getItem("ListDetails")
            if (storedListDetails) setListDetails(JSON.parse(storedListDetails));
            else FillLists(setListDetails);
          } catch(error) {
          }
        }
      }
    })
    .catch(error => {
    });
  }, []);

  async function FillPatientAccountDetails() {
    try {
      const response = await PrivatePatientDataService.fillAccountDetails();
      if (response) {
        if (response.data[0]) setAcceptedInsurances(response.data[0]);
        if (response.data[1]) setSpokenLanguages(response.data[1]);
        sessionStorage.setItem("PatientAccountDetails", JSON.stringify(response.data));
      }
    } catch(error) {
      if (error.response.status === 401) invalidUserAction(error.response.data)
    }
  }

  if (user_type !== 'Patient') return <NonPatientAccess/>

  return (
    <div>
      <Header dropdown={true} search={true} />
      <PatientHeader/>

      <RenderInsuranceSection
        listDetails = {listDetails}
        acceptedInsurances = {acceptedInsurances}
        setAcceptedInsurances = {setAcceptedInsurances}
      />
      <RenderLanguageSection
        listDetails = {listDetails}
        spokenLanguages = {spokenLanguages}
        setSpokenLanguages = {setSpokenLanguages}
      />
    </div>
  )
}
