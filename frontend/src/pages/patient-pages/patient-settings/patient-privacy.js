import Header from "../../header"
import PatientHeader from "../patient-header.js";
import { NonPatientAccess } from "../../../components/user-type-unauth";
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification";

export default function PatientPrivacy() {
  const { userType } = useSimpleUserVerification();

  if (userType !== "Patient") return <NonPatientAccess/>;

  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <PatientHeader/>
      PatientPrivacy
    </>
  )
}
