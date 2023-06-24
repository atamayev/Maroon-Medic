import { useContext, useState, useEffect } from 'react';
import { VerifyContext } from '../contexts/verify-context';

export default function useSimpleUserVerification() {
  const { userVerification } = useContext(VerifyContext);
  const [userType, setUserType] = useState(null);

  const verify = async () => {
    const result = await userVerification();
    if (result.verified === true) setUserType(result.userType);
  };

  useEffect(() => {
    verify();
  }, []);

  return userType;
}
