import { useEffect, useState } from "react"
import { UnauthorizedUser } from "../../../components/user-type-unauth"
import useSimpleUserVerification from "../../../custom-hooks/use-simple-user-verification"
import { FillLists, FillPatientAccountDetails } from "../../../custom-hooks/account-details-hooks/fetch-patient-data"
import Header from "../../header"
import PatientHeader from "../patient-header"
import RenderLanguageSection from "./language"

function usePatientAccountDetails(
  setSpokenLanguages: React.Dispatch<React.SetStateAction<LanguageItemType[]>>,
  setListDetails: React.Dispatch<React.SetStateAction<PatientListDetailsType>>
) {
  const fetchAndSetAccountDetails = async () => {
    try {
      const storedAccountDetails = sessionStorage.getItem("PatientAccountDetails")
      if (!storedAccountDetails) FillPatientAccountDetails(setSpokenLanguages)

      const storedListDetails = sessionStorage.getItem("ListDetails")
      if (storedListDetails) setListDetails(JSON.parse(storedListDetails))
      else FillLists(setListDetails)
    } catch (error) {
    }
  }

  useEffect(() => {
    fetchAndSetAccountDetails()
  }, [])
}

export default function PatientAccountDetails() {
  const { userType } = useSimpleUserVerification()
  if (userType !== "Patient") return <UnauthorizedUser patientOrDoctor = {"patient"}/>
  const [listDetails, setListDetails] = useState({} as PatientListDetailsType)
  const PatientAccountDetails = JSON.parse(sessionStorage.getItem("PatientAccountDetails") || "{}")
  const [spokenLanguages, setSpokenLanguages] = useState<LanguageItemType[]>(PatientAccountDetails?.languages || [])
  usePatientAccountDetails(setSpokenLanguages, setListDetails)

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
