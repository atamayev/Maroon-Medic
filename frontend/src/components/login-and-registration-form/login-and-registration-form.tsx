import React from "react"
import Button from "../button"
import ConfirmPassword from "./confirm-password"
import SubLoginInformation from "./sub-login-information"
import SubRegisterInformation from "./sub-register-information"
import EmailInput from "./email-input"
import PasswordInput from "./password-input"

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
  credentials: AuthCredentials,
  setCredentials: (credentials: AuthCredentials) => void,
  setPasswordConfirm?: (passwordConfirm: string) => void,
  error: string,
  VetOrPatient: VetOrPatient,
  loginOrSignUp: "Login" | "Sign up",
  loading: boolean,
  showPassword: boolean,
  setShowPassword: (showPassword: boolean) => void
}

export default function LoginAndRegistrationForm({
  handleSubmit,
  credentials,
  setCredentials,
  setPasswordConfirm,
  error,
  VetOrPatient,
  loginOrSignUp,
  loading,
  showPassword,
  setShowPassword }: Props
) {
  const isShowPassword = () => {
    if (showPassword) return "text"
    return "password"
  }

  const HideOrShowPassword = () => {
    if (showPassword) return "Hide Password"
    return "Show Password"
  }

  const ErrorMessage = () => {
    if (!error) return null
    return <div className="alert alert-danger mt-3 mb-0">{error}</div>
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-center mb-4">{VetOrPatient} {loginOrSignUp}</h2>
      <form onSubmit={handleSubmit}>
        <EmailInput
          credentials={credentials}
          setCredentials={setCredentials}
        />

        <PasswordInput
          credentials={credentials}
          setCredentials={setCredentials}
          showPassword={isShowPassword()}
        />

        <ConfirmPassword
          loginOrSignUp={loginOrSignUp}
          setPasswordConfirm={setPasswordConfirm}
          showPassword={isShowPassword()}
        />

        <Button
          className="mt-3"
          colorClass="bg-blue-600"
          hoverClass="hover:bg-blue-700"
          onClick={() => (setShowPassword(!showPassword))}
          title={HideOrShowPassword()}
        />

        <ErrorMessage />

        <Button
          className="mt-3 w-full"
          colorClass="bg-blue-600"
          hoverClass="hover:bg-blue-700"
          disabled={loading}
          title={loginOrSignUp}
        />

      </form>

      <SubLoginInformation
        loginOrSignUp={loginOrSignUp}
        VetOrPatient={VetOrPatient}
      />

      <SubRegisterInformation
        loginOrSignUp={loginOrSignUp}
        VetOrPatient={VetOrPatient}
      />

    </div>
  )

}
