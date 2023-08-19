import { Link } from "react-router-dom"

interface Props {
  loginOrSignUp: "Login" | "Sign up",
  VetOrPatient: VetOrPatient,
}

const SubRegisterInformation = (props: Props) => {
  const { loginOrSignUp, VetOrPatient } = props

  if (loginOrSignUp !== "Sign up") return null
  return (
    <div className = "w-100 text-center mt-2">
      Already have an account? <Link to = {`/${VetOrPatient.toLowerCase()}-login`}>Log In</Link>
    </div>
  )
}

export default SubRegisterInformation
