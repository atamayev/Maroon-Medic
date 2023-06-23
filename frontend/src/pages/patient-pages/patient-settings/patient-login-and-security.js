import React, {useEffect, useState, useContext} from 'react'
import LoginHistory from '../../../components/login-history';
import { VerifyContext } from '../../../contexts/verify-context';
import { NonPatientAccess } from '../../../components/user-type-unauth';
import { fetchLoginHistory } from '../../../custom-hooks/fetch-login-history';
import Header from '../../header';
import PatientHeader from '../patient-header.js';

export default function PatientLoginAndSecurity() {
  const {userVerification} = useContext(VerifyContext)
  const [userType, setUserType] = useState(null);
  const [loginHistory, setLoginHistory] = useState([]);

  const verifyAndSetLoginHistory = async () => {
    const result = await userVerification();
    if (result.verified === true) {
      setUserType(result.userType)
      if (result.userType === 'Patient') {
        try {
          const storedLoginHistory = sessionStorage.getItem("LoginHistory");
          if (storedLoginHistory) setLoginHistory(JSON.parse(storedLoginHistory));
          else fetchLoginHistory(setLoginHistory);
        } catch(error) {
        }
      }
    }
  };

  useEffect(() => {
    verifyAndSetLoginHistory();
  }, []);

  if (userType !== 'Patient') return <NonPatientAccess/>

  return (
    <>
      <Header dropdown = {true}/>
      <PatientHeader/>
      <h1>Login History</h1>
      {loginHistory.map((item, index) => (
        <LoginHistory key = {index} loginHistoryItem = {item} />
      ))}
      {/* Later add update history here as well */}
    </>
  )
};
