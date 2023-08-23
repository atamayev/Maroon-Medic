import useSimpleUserVerification from "src/custom-hooks/use-simple-user-verification"
import NullUser from "./unauthorized-user/null-user"

interface Props {
  DoctorContent: JSX.Element
  PatientContent: JSX.Element
}

export default function SharedPagesTemplate(props: Props) {
  const { DoctorContent, PatientContent } = props
  const { userType } = useSimpleUserVerification()

  const Component = () => {
    if (userType === "Doctor") return DoctorContent
    else if (userType === "Patient") return PatientContent
    return <NullUser/>
  }

  return <Component/>
}
