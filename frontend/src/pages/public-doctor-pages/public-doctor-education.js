import _ from "lodash"
import { Card } from "react-bootstrap"

export default function RenderEducationSection(props) {
  const { preVetEducation, vetEducation, personalData } = props
  if (!_.isEmpty(preVetEducation) && !_.isEmpty(vetEducation)) {
    return (
      <Card className = "card-bottom-margin">
        <Card.Header>
          Where did Dr. {_.upperFirst(personalData.LastName || "")} go to school?
        </Card.Header>
        <Card.Body>
          <h3>Pre-Veterinary Education</h3>
          {renderEducation(preVetEducation, true)}

          <h3>Veterinary Education</h3>
          {renderEducation(vetEducation, false)}
        </Card.Body>
      </Card>
    )
  }
}

function renderEducation(educationList, hasMajor) {
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
