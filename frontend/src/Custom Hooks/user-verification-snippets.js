import { VerifyContext } from "../Contexts/VerifyContext";
import {useContext, useEffect} from 'react'
import {useNavigate} from "react-router-dom";

export const useVerifyForVets = ()=>{
    const {user_verification} = useContext(VerifyContext);
    const navigate = useNavigate();

    useEffect(()=>{
        user_verification()
            .then(result => {
                if (result.verified === true && result.user_type === 'Doctor') navigate(`/vet-dashboard`)
                else if (result.verified === true && result.user_type === 'Patient') navigate(`/patient-dashboard`)
            })
    }, [])
};

export const useVerifyForPatients = ()=>{
    const {user_verification} = useContext(VerifyContext);
    const navigate = useNavigate();

    useEffect(()=>{
        user_verification()
            .then(result => {
                if (result.verified === true && result.user_type === 'Patient') navigate(`/patient-dashboard`)
                else if (result.verified === true && result.user_type === 'Doctor') navigate(`/vet-dashboard`)
            })
    }, [])
};
