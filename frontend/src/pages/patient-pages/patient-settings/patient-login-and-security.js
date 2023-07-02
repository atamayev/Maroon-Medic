import LoginHistory from '../../../components/login-history';
import ChangePassword from '../../../components/change-password';
import { useLoginHistory } from '../../../custom-hooks/login-history';
import { NonPatientAccess } from '../../../components/user-type-unauth';
import useSimpleUserVerification from '../../../custom-hooks/use-simple-user-verification';
import Header from '../../header';
import PatientHeader from '../patient-header.js';

export default function PatientLoginAndSecurity() {
  const { userType } = useSimpleUserVerification();
  const loginHistory = useLoginHistory(userType, 'Patient');

  if (userType !== 'Patient') return <NonPatientAccess/>;

  return (
    <>
      <Header dropdown = {true}/>
      <PatientHeader/>
      <ChangePassword type = {userType}/>
      <h1>Login History</h1>
      {loginHistory.map((item, index) => (
        <LoginHistory key = {index} loginHistoryItem = {item} />
      ))}
      {/* Later add update history here as well. Create an update history table which has the login_history table as a foreign key. Within each login session, show what the user changed. */}
    </>
  )
};
