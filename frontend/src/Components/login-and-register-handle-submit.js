import DataService from "../Services/data-service.js";

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
            const response = await DataService.login(login_information_object);
            if (response.data === true){
                navigate(`/${VetOrPatient.toLowerCase()}-dashboard`)
            }else{
                console.log('Login didnt work');
            }
        } catch (err) {
            console.log(err)
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
            const response = await DataService.register(register_information_object);
            if (response.data === true){
                console.log('Registered');
                navigate(`/new-${VetOrPatient.toLowerCase()}`)
            }else{
                console.log('Registration didnt work');
            }
        } catch (err) {
            console.log(err)
            setError(err.response.data);
        }
        setLoading(false)
};
