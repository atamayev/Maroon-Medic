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
                navigate(`/${VetOrPatient}-dashboard`)
                console.log(`Navigating to ${VetOrPatient} Dashboard`);
            }else{
                console.log('Login didnt work');
            }
        } catch (err) {
            console.log(err)
            setError(err.response.data);
        }
        setLoading(false)
  };

