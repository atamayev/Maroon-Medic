import { useState } from "react"
import { UnauthorizedUser } from "../../../components/user-type-unauth"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import { usePatientAccountDetails } from "src/custom-hooks/account-details-hooks/fetch-patient-data"
import Header from "../../../components/header/header"
import PatientHeader from "../patient-header"
import RenderLanguageSection from "./language"

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
      <RenderLanguageSection
        listDetails = {listDetails}
        spokenLanguages = {spokenLanguages}
        setSpokenLanguages = {setSpokenLanguages}
      />
    </div>
  )
}
