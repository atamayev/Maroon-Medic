import React, {useEffect, useState, useContext} from 'react'
import { Card } from 'react-bootstrap';
import moment from 'moment';
import AuthDataService from '../../../services/auth-data-service';
import { NonDoctorAccess } from '../../../components/user-type-unauth';
import { VerifyContext } from '../../../contexts/verify-context';
import { invalidUserAction } from '../../../custom-hooks/user-verification-snippets';
import Header from '../../header'
import DoctorHeader from '../doctor-header.js';

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

export default function DoctorLoginAndSecurity() {
  const {user_verification} = useContext(VerifyContext)
  const [user_type, setUser_type] = useState(null);
  const [loginHistory, setLoginHistory] = useState([]);

  const verifyAndSetLoginHistory = async () => {
    const result = await user_verification();
    if (result.verified === true) {
      setUser_type(result.user_type)
      if (result.user_type === 'Doctor') {
        try {
          setUser_type('Doctor')
          fetchLoginHistory(setLoginHistory);
        } catch(error) {
        }
      }
    }
  }

  useEffect(() => {
    verifyAndSetLoginHistory()
  }, []);

  if (user_type !== 'Doctor') return <NonDoctorAccess/>

  function LoginHistoryCard({ loginHistoryItem }) {
    return (
      <Card className='mb-3'>
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
      <DoctorHeader/>
      <h1>Login History</h1>
      {loginHistory.map((item, index) => (
        <LoginHistoryCard key={index} loginHistoryItem={item} />
      ))}
      {/* Later add update history here as well */}
    </>
  )
};
