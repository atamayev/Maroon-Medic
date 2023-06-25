import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import useSimpleUserVerification from './use-simple-user-verification';

export const useConfirmNotLoggedIn = () => {
    const { userType } = useSimpleUserVerification();
    const navigate = useNavigate();

    useEffect(() => {
        if (userType === 'Patient') navigate(`/patient-dashboard`);
        else if (userType === 'Doctor') navigate(`/vet-dashboard`);
    }, [userType, navigate])
};

export const invalidUserAction = (responseData) => {
    if (responseData.shouldRedirect) {
        sessionStorage.clear();
        window.location.href = responseData.redirectURL;
    }
}
