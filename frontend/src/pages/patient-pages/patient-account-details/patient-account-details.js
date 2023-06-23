import React, {useEffect, useState, useContext} from 'react'
import { VerifyContext } from '../../../contexts/verify-context';
import { NonPatientAccess } from '../../../components/user-type-unauth';
import { invalidUserAction } from '../../../custom-hooks/user-verification-snippets';
import PrivatePatientDataService from '../../../services/private-patient-data-service';
import Header from '../../header';
import PatientHeader from '../patient-header'
import RenderLanguageSection from './language';

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
  
  const [spokenLanguages, setSpokenLanguages] = useState(PatientAccountDetails?.lanauges || []);

  const verifyAndSetAccountDetails = async () => {
    const result = await user_verification();
    if (result.verified === true) {
      setUser_type(result.user_type);
      if (result.user_type === 'Patient') {
        try {
          const storedAccountDetails = sessionStorage.getItem("PatientAccountDetails");
          if (!storedAccountDetails) FillPatientAccountDetails();

          let storedListDetails = sessionStorage.getItem("ListDetails");
          if (storedListDetails) setListDetails(JSON.parse(storedListDetails));
          else FillLists(setListDetails);
        } catch (error) {
        }
      }
    }
  };

  useEffect(() => {
    verifyAndSetAccountDetails();
  }, []);


  async function FillPatientAccountDetails() {
    try {
      const response = await PrivatePatientDataService.fillAccountDetails();
      if (response) {
        if (response.data.languages) setSpokenLanguages(response.data.languages);
        sessionStorage.setItem("PatientAccountDetails", JSON.stringify(response.data));
      }
    } catch(error) {
      if (error.response.status === 401) invalidUserAction(error.response.data)
    }
  }

  if (user_type !== 'Patient') return <NonPatientAccess/>

  return (
    <div>
      <Header dropdown = {true} search = {true} />
      <PatientHeader/>
      <RenderLanguageSection
        listDetails = {listDetails}
        spokenLanguages = {spokenLanguages}
        setSpokenLanguages = {setSpokenLanguages}
      />
    </div>
  )
}
