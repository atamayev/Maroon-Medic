import { useEffect, useState } from "react"
import { UnauthorizedUser } from "../../../components/user-type-unauth"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import { FillLists, FillPatientAccountDetails } from "../../../custom-hooks/account-details-hooks/fetch-patient-data"
import Header from "../../header"
import PatientHeader from "../patient-header"
import RenderLanguageSection from "./language"

function usePatientAccountDetails(
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItem[]>>,
  setListDetails: React.Dispatch<React.SetStateAction<PatientListDetails>>,
  userType: DoctorOrPatientOrNull
) {
  const fetchAndSetAccountDetails = async () => {
    try {
      const storedAccountDetails = sessionStorage.getItem("PatientAccountDetails")
      if (!storedAccountDetails) await FillPatientAccountDetails(setSpokenLanguages)

      const storedListDetails = sessionStorage.getItem("ListDetails")
      if (storedListDetails) setListDetails(JSON.parse(storedListDetails))
      else await FillLists(setListDetails)
    } catch (error) {
    }
  }

  useEffect(() => {
    if (userType !== "Patient") return
    fetchAndSetAccountDetails()
  }, [userType])
}

export default function PatientAccountDetails() {
  const { userType } = useSimpleUserVerification()
  const [listDetails, setListDetails] = useState({} as PatientListDetails)
  const PatientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails") || "{}")
  const [spokenLanguages, setSpokenLanguages] = useState<LanguageItem[]>(PatientAccountDetails?.languages || [])
  usePatientAccountDetails(setSpokenLanguages, setListDetails, userType)
  if (userType !== "Patient") return <UnauthorizedUser patientOrDoctor = {"patient"}/>

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
