import LoginHistory from '../../../components/login-history';
import { useLoginHistory } from '../../../custom-hooks/login-history';
import { NonDoctorAccess } from '../../../components/user-type-unauth';
import useSimpleUserVerification from '../../../custom-hooks/use-simple-user-verification';
import Header from '../../header'
import DoctorHeader from '../doctor-header.js';

export default function DoctorLoginAndSecurity() {
  const userType = useSimpleUserVerification();
  const loginHistory = useLoginHistory(userType, 'Doctor');

  if (userType !== 'Doctor') return <NonDoctorAccess/>;

  return (
    <>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      <h1>Login History</h1>
      {loginHistory.map((item, index) => (
        <LoginHistory key = {index} loginHistoryItem = {item} />
      ))}
      {/* Later add update history here as well */}
    </>
  )
};
