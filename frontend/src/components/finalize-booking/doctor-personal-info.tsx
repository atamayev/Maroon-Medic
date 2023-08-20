import _ from "lodash"

const DoctorPersonalInfo = ({ personalData } : { personalData: DoctorPersonalData | null }) => {
  if (!personalData) return null
  return (
    <>
      Dr. {""} {_.upperFirst(personalData.FirstName || "")} {""} {_.upperFirst(personalData.LastName || "")}
    </>
  )
}

export default DoctorPersonalInfo
