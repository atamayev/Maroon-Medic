import {useState} from "react"
import {useNavigate} from "react-router-dom";
import {handleRegisterSubmit} from "../../custom-hooks/handle-submits.js"
import LoginAndRegistrationForm from "../../components/login-and-registration-form.js";
import { useConfirmNotLoggedIn } from "../../custom-hooks/user-verification-snippets.js";
import Header from "../header.js";

export default function PatietRegister() {
  const type = "Patient"
  const [registerInformationObject, setRegisterInformationObject] = useState({registerType: type});
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useConfirmNotLoggedIn(false);

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <LoginAndRegistrationForm
        handleSubmit = {(e) =>
          handleRegisterSubmit(
            {
              e,
              registerInformationObject,
              passwordConfirm,
              navigate,
              setError,
              setLoading,
              VetOrPatient: type
            }
        )}
        credentials = {registerInformationObject}
        setCredentials = {setRegisterInformationObject}
        passwordConfirm = {passwordConfirm}
        setPasswordConfirm = {setPasswordConfirm}
        error = {error}
        VetOrPatient = {type}
        loading = {loading}
        loginOrSignUp = "Sign up"
        showPassword = {showPassword}
        setShowPassword = {setShowPassword}
      />
    </>
  )
};
