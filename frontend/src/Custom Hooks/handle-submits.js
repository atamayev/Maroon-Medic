import AuthDataService from "../Services/auth-data-service.js";
import PrivateDoctorDataService from "../Services/private-doctor-data-service.js";
import PrivatePatientDataService from "../Services/private-patient-data-service.js";

export const handleLoginSubmit = async ({
    e,
    login_information_object, 
    navigate, 
    setError, 
    setLoading, 
    VetOrPatient
    }) => {
        e.preventDefault();
        setError("")
        try {
            setLoading(true)
            const response = await AuthDataService.login(login_information_object);
            if (response.status === 200){
                navigate(`/${VetOrPatient.toLowerCase()}-dashboard`)
            }else{
                setError("Login didn't work");
            }
        } catch (err) {
            setError(err.response.data);
        }
        setLoading(false)
};

export const handleRegisterSubmit = async ({
    e,
    register_information_object, 
    passwordConfirm,
    navigate, 
    setError, 
    setLoading, 
    VetOrPatient
    }) => {
        e.preventDefault();
        setError("")
        if (register_information_object.password !== passwordConfirm) {
            return setError("Passwords do not match")
        }
        try {
            setLoading(true)
            const response = await AuthDataService.register(register_information_object);
            if (response.status === 200){
                navigate(`/new-${VetOrPatient.toLowerCase()}`)
            }else{
                setError("Registration didn't work");
            }
        } catch (err) {
            console.log(err)
            setError(err.response.data);
        }
        setLoading(false)
};

export const handleNewUserSubmit = async ({
    e,
    newInfo, 
    navigate, 
    setError, 
    setLoading, 
    VetOrPatient
    }) => {
        e.preventDefault();
        setError("")
        try {
            setLoading(true)
            let response;
            if (VetOrPatient === 'Vet'){
                response = await PrivateDoctorDataService.addingDoctorInfo(newInfo);
            }else if (VetOrPatient === 'Patient'){
                response = await PrivatePatientDataService.addingPatientInfo(newInfo);
            }
            if (response.status === 200){
                navigate(`/${VetOrPatient.toLowerCase()}-dashboard`)
            }else{
                setError("newUser didn't work");
            }
        } catch (err) {
            console.log(err)
            setError(err.response.data);
        }
        setLoading(false)
};
