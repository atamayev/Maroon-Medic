import { useEffect, useState } from 'react'
import { NonPatientAccess } from '../../../components/user-type-unauth';
import useSimpleUserVerification from '../../../custom-hooks/use-simple-user-verification';
import { FillLists, FillPatientAccountDetails } from '../../../custom-hooks/account-details-hooks/fetch-patient-data';
import Header from '../../header';
import PatientHeader from '../patient-header'
import RenderLanguageSection from './language';

function useAccountDetails(userType) {
  const PatientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails"));
  const [spokenLanguages, setSpokenLanguages] = useState(PatientAccountDetails?.lanauges || []);
  const [listDetails, setListDetails] = useState({});

  const fetchAndSetAccountDetails = async () => {
    if (userType === 'Patient') {
      try {
        const storedAccountDetails = sessionStorage.getItem("PatientAccountDetails");
        if (!storedAccountDetails) FillPatientAccountDetails(setSpokenLanguages);

        const storedListDetails = sessionStorage.getItem("ListDetails");
        if (storedListDetails) setListDetails(JSON.parse(storedListDetails));
        else FillLists(setListDetails);
      } catch (error) {
      }
    }
  };

  useEffect(() => {
    fetchAndSetAccountDetails();
  }, [userType]);

  return { spokenLanguages, setSpokenLanguages, listDetails };
}

export default function PatientAccountDetails() {
  const { userType } = useSimpleUserVerification();
  const { spokenLanguages, setSpokenLanguages, listDetails } = useAccountDetails(userType);

  if (userType !== 'Patient') return <NonPatientAccess/>;

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
