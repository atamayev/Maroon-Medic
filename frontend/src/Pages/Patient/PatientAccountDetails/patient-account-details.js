import React, {useEffect, useState, useContext} from 'react'
import { VerifyContext } from '../../../Contexts/VerifyContext';
import PatientHeader from '../patient-header'
import Header from '../../header'
import PrivatePatientDataService from '../../../Services/private-patient-data-service';
import { NonPatientAccess } from '../../../Components/user-type-unauth';
import { useConfirmationMessage } from '../../../Custom Hooks/useConfirmationMessage';
import RenderInsuranceSection from './insurance';
import RenderLanguageSection from './language';

async function FillLists(setListDetails){ 
  try{
    const response = await PrivatePatientDataService.fillLists();
    if (response){
        setListDetails(response.data);
        sessionStorage.setItem("ListDetails", JSON.stringify(response.data));
    }else{
      console.log('no response');
    }
  }catch(error){
    console.log('unable to fill ListDetails', error)
  }
}

export default function PatientAccountDetails() {
  const [listDetails, setListDetails] = useState({});
  const {user_verification} = useContext(VerifyContext);
  const [user_type, setUser_type] = useState(null);
  //const [carouselIndex, setCarouselIndex] = useState(0);
  const PatientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails"));
  
  const [acceptedInsurances, setAcceptedInsurances] = useState(PatientAccountDetails?.[0] || []);
  const [insurancesConfirmation, setInsurancesConfirmation] = useConfirmationMessage();

  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [spokenLanguages, setSpokenLanguages] = useState(PatientAccountDetails?.[1] || []);
  const [languagesConfirmation, setLanguagesConfirmation] = useConfirmationMessage();

  useEffect(()=>{
    user_verification()
    .then(result => {
      if (result.verified === true) {
        setUser_type(result.user_type)
        if(result.user_type === 'Patient'){
          try{
            const storedAccountDetails = sessionStorage.getItem("PatientAccountDetails")
            if(!storedAccountDetails){
              FillPatientAccountDetails();
            }            
            const storedListDetails = sessionStorage.getItem("ListDetails")
            if(storedListDetails){
              setListDetails(JSON.parse(storedListDetails));
            }else{
              FillLists(setListDetails);
            }
          }catch(error){
            console.log(error)
          }
        }
      }
      else{
        console.log('Unverified')
      }
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  async function FillPatientAccountDetails(){
    try{
        const response = await PrivatePatientDataService.fillAccountDetails();
        if (response){
            if(response.data[0]) setAcceptedInsurances(response.data[0]);
            if(response.data[1]) setSpokenLanguages(response.data[1]);
            sessionStorage.setItem("PatientAccountDetails", JSON.stringify(response.data));
        }else{
          console.log('no response');
        }
      }catch(error){
        console.log('unable to fill AccountDetails', error)
      }
  }

  if(user_type !== 'Patient'){
    return(
      <NonPatientAccess/>
    )
  }

  return (
    <div>
      <Header dropdown={true} search={true} />
      <PatientHeader/>

      <RenderInsuranceSection
        listDetails = {listDetails}
        acceptedInsurances = {acceptedInsurances}
        setAcceptedInsurances = {setAcceptedInsurances}
        insurancesConfirmation = {insurancesConfirmation}
        setInsurancesConfirmation = {setInsurancesConfirmation}
      />

      <RenderLanguageSection
        listDetails = {listDetails}
        selectedLanguage = {selectedLanguage}
        setSelectedLanguage = {setSelectedLanguage}
        spokenLanguages = {spokenLanguages}
        setSpokenLanguages = {setSpokenLanguages}
        languagesConfirmation = {languagesConfirmation}
        setLanguagesConfirmation = {setLanguagesConfirmation}
      />

    </div>
    )
}
