import _ from "lodash"
import { Card } from "react-bootstrap"

interface Props {
  preVetEducation: GeneralEducationItem[]
  vetEducation: EducationBase[]
  personalData: DoctorPersonalData
}

export default function RenderEducationSection(props: Props) {
  const { preVetEducation, vetEducation, personalData } = props
  if (_.isEmpty(preVetEducation) && _.isEmpty(vetEducation)) return null
  return (
    <Card className = "card-bottom-margin">
      <Card.Header>
        Where did Dr. {_.upperFirst(personalData.LastName || "")} go to school?
      </Card.Header>
      <Card.Body>
        <h3>Pre-Veterinary Education</h3>
        <RenderEducation educationList = {preVetEducation} hasMajor = {true} />

        <h3>Veterinary Education</h3>
        <RenderEducation educationList = {vetEducation} hasMajor = {true} />
      </Card.Body>
    </Card>
  )
}

interface RenderEducationProps {
  educationList: GeneralEducationItem[]
  hasMajor: boolean
}

function RenderEducation({educationList, hasMajor} : RenderEducationProps) {
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
