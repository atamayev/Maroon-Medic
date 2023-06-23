import moment from 'moment';
import React, {useEffect, useState, useContext} from 'react'
import { Card } from 'react-bootstrap';
import { VerifyContext } from '../../../contexts/verify-context';
import AuthDataService from '../../../services/auth-data-service';
import { NonPatientAccess } from '../../../components/user-type-unauth';
import { invalidUserAction } from '../../../custom-hooks/user-verification-snippets';
import Header from '../../header';
import PatientHeader from '../patient-header.js';

async function fetchLoginHistory(setLoginHistory) {
  try {
    const response = await AuthDataService.fetchLoginHistry();
    if (response) {
      const formattedData = response.data.map((item) => ({
        ...item,
        Login_at: moment(item.Login_at).format('MMMM Do, YYYY [at] h:mmA'),
      }));
      setLoginHistory(formattedData);
    }
  } catch (error) {
    if (error.response.status === 401) invalidUserAction(error.response.data)
  }
}

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
          fetchLoginHistory(setLoginHistory);
        } catch(error) {
        }
      }
    }
  };

  useEffect(() => {
    verifyAndSetLoginHistory();
  }, []);

  if (user_type !== 'Patient') return <NonPatientAccess/>

  function LoginHistoryCard({ loginHistoryItem }) {
    return (
      <Card className = 'mb-3'>
        <Card.Body>
          <Card.Title>Login Time: {loginHistoryItem.Login_at} </Card.Title>
            <Card.Text>
              IP Address: {loginHistoryItem.IP_Address}
            </Card.Text>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Header dropdown = {true}/>
      <PatientHeader/>
      <h1>Login History</h1>
      {loginHistory.map((item, index) => (
        <LoginHistoryCard key = {index} loginHistoryItem = {item} />
      ))}
      {/* Later add update history here as well */}
    </>
  )
};
