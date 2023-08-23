import { useState } from "react"
import UnauthorizedUser from "../../../components/unauthorized-user/unauthorized-user"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import { usePatientAccountDetails } from "src/custom-hooks/account-details/use-set-patient-account-details"
import Header from "../../../components/header/header"
import PatientHeader from "../patient-header"
import PatientLanguageSection from "./language"

export default function PatientAccountDetails() {
  const { userType } = useSimpleUserVerification()
  const [listDetails, setListDetails] = useState({} as PatientListDetails)
  const patientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails") || "{}")
  const [spokenLanguages, setSpokenLanguages] = useState<LanguageItem[]>(patientAccountDetails?.languages || [])

  usePatientAccountDetails(setSpokenLanguages, setListDetails, userType)

  if (userType !== "Patient") return <UnauthorizedUser vetOrpatient = {"patient"}/>

  return (
    <div>
      <Header dropdown = {true} search = {true} />
      <PatientHeader/>
      <PatientLanguageSection
        listDetails = {listDetails}
        spokenLanguages = {spokenLanguages}
        setSpokenLanguages = {setSpokenLanguages}
      />
    </div>
  )
}
