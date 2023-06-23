import {useContext, useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import { VerifyContext } from "../contexts/verify-context";

export const useConfirmNotLoggedIn = () => {
    const {userVerification} = useContext(VerifyContext);
    const navigate = useNavigate();

    const verifyUser = async () => {
        const result = await userVerification();
        if (result.verified === true && result.userType === 'Patient') navigate(`/patient-dashboard`);
        else if (result.verified === true && result.userType === 'Doctor') navigate(`/vet-dashboard`);
    }
    
    useEffect(() => {
        verifyUser();
    }, [])

};

export const invalidUserAction = (responseData) => {
    if (responseData.shouldRedirect) {
        sessionStorage.clear();
        window.location.href = responseData.redirectURL;
    }
}
