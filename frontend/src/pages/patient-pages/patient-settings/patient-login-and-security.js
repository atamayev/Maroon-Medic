import React, {useEffect, useState, useContext} from 'react'
import LoginHistory from '../../../components/login-history';
import { VerifyContext } from '../../../contexts/verify-context';
import { NonPatientAccess } from '../../../components/user-type-unauth';
import Header from '../../header';
import PatientHeader from '../patient-header.js';
import { fetchLoginHistory } from '../../../custom-hooks/fetch-login-history';

export default function PatientLoginAndSecurity() {
  const {user_verification} = useContext(VerifyContext)
  const [user_type, setUser_type] = useState(null);
  const [loginHistory, setLoginHistory] = useState([]);

  const verifyAndSetLoginHistory = async () => {
    const result = await user_verification();
    if (result.verified === true) {
      setUser_type(result.user_type)
      if (result.user_type === 'Patient') {
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

  if (user_type !== 'Patient') return <NonPatientAccess/>

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
