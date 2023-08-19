import useSimpleUserVerification from "src/custom-hooks/use-simple-user-verification"
import NullUser from "./unauthorized-user/null-user"

interface Props {
  DoctorComponentToRender: JSX.Element
  PatientComponentToRender: JSX.Element
}

export default function SharedPagesTemplate(props: Props) {
  const { DoctorComponentToRender, PatientComponentToRender } = props
  const { userType } = useSimpleUserVerification()

  const RenderComponent = () => {
    if (userType === "Doctor") return DoctorComponentToRender
    else if (userType === "Patient") return PatientComponentToRender
    else return <NullUser/>
  }

  return <RenderComponent/>
}
