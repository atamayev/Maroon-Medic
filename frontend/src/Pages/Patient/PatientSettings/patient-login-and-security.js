import React, {useEffect, useState, useContext} from 'react'
import Header from '../../header'
import PatientHeader from '../patient-header.js';
import AuthDataService from '../../../Services/auth-data-service';
import { Card } from 'react-bootstrap';
import { NonPatientAccess } from '../../../Components/user-type-unauth';
import { VerifyContext } from '../../../Contexts/VerifyContext';
import moment from 'moment';

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
    console.log('unable to fetch login history', error);
  }
}

export default function PatientLoginAndSecurity() {
  const {user_verification} = useContext(VerifyContext)
  const [user_type, setUser_type] = useState(null);
  const [loginHistory, setLoginHistory] = useState([]);

  useEffect(() => {
    user_verification()
      .then(result => {
        if (result.verified === true) {
          setUser_type(result.user_type)
          if (result.user_type === 'Patient') {
            try {
              setUser_type('Patient')
              fetchLoginHistory(setLoginHistory);
            } catch(error) {
              console.log(error)
            }
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (user_type !== 'Patient') return <NonPatientAccess/>

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
      <PatientHeader/>
      <h1>Login History</h1>
      {loginHistory.map((item, index) => (
        <LoginHistoryCard key={index} loginHistoryItem={item} />
      ))}
      {/* Later add update history here as well */}
    </>
  )
};
