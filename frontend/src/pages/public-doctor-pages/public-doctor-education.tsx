import _ from "lodash"
import PublicDoctorCard from "src/components/public-doctor-card"

interface Props {
  preVetEducation: GeneralEducationItem[]
  vetEducation: EducationBase[]
  personalData: DoctorPersonalData
}

export default function EducationSection(props: Props) {
  const { preVetEducation, vetEducation, personalData } = props
  if (_.isEmpty(preVetEducation) && _.isEmpty(vetEducation)) return null
  return (
    <PublicDoctorCard
      title = {`Where did Dr. ${_.upperFirst(personalData.LastName || "")} go to school?`}
      content = {
        <>
          <h3>Pre-Veterinary Education</h3>
          <Education educationList = {preVetEducation} hasMajor = {true} />

          <h3>Veterinary Education</h3>
          <Education educationList = {vetEducation} hasMajor = {true} />
        </>
      }
    />
  )
}

interface EducationProps {
  educationList: GeneralEducationItem[]
  hasMajor: boolean
}

function Education({ educationList, hasMajor } : EducationProps) {
  return (
    <>
      {educationList.map((edu, index) => (
        <p key = {index}>
          {edu.School_name}, {edu.Education_type}
          {hasMajor ? ` in ${edu.Major_name}` : ""} {" "}
          ({edu.Start_Date} - {edu.End_Date})
        </p>
      ))}
    </>
  )
}
