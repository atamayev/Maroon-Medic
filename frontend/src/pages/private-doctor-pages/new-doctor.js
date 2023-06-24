import { useState, useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import NewAccountForm from '../../components/new-account-form.js';
import {handleNewUserSubmit} from "../../custom-hooks/handle-submits.js"
import PrivateDoctorDataService from "../../services/private-doctor-data-service.js"
import { invalidUserAction } from '../../custom-hooks/user-verification-snippets.js';
import useSimpleUserVerification from '../../custom-hooks/use-simple-user-verification.js';
import Header from '../header.js';

const verifyNewDoctor = async (navigate, userType) => {
  if (userType === 'Doctor') {
    try {
      const doctorResult = await PrivateDoctorDataService.newDoctorConfirmation();
      if (doctorResult.data === false) navigate('/vet-register');
    } catch (error) {
      if (error.response.status === 401) invalidUserAction(error.response.data);
    }
  } else if (userType === 'Patient') {
    navigate('/patient-dashboard');
  } else {
    navigate('/vet-register');
  }
}

export default function NewDoctor () {
  const [newDoctorInfo, setNewDoctorInfo] = useState({});
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { userType } = useSimpleUserVerification();
  const navigate = useNavigate();

  useEffect(() => {
    verifyNewDoctor(navigate, userType);
  }, [userType]);

  return (
    <>
      <Header/>
      <NewAccountForm
        handleSubmit = {(e) =>
          handleNewUserSubmit(
            {
              e,
              newInfo: newDoctorInfo,
              navigate,
              setError,
              setLoading,
              VetOrPatient: "Vet"
            }
        )}
        newInfo = {newDoctorInfo}
        setNewInfo = {setNewDoctorInfo}
        error = {error}
        loading = {loading}
      />
    </>
  );
};
