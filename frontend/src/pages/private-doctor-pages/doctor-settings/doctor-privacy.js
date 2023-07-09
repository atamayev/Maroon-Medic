import Header from "../../header"
import DoctorHeader from "../doctor-header.js";
import { NonDoctorAccess } from "../../../components/user-type-unauth";
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification";

export default function DoctorPrivacy() {
  const { userType } = useSimpleUserVerification();

  if (userType !== "Doctor") return <NonDoctorAccess/>;

  return (
    <>
      <Header dropdown = {true}/>
      <DoctorHeader/>
      DoctorPrivacy
    </>
  )
}
