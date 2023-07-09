import _ from "lodash"
import { Card } from "react-bootstrap"
import { capitalizeFirstLetter } from "../../utils/capitalization"

export default function RenderEducationSection(props) {
  const { preVetEducation, vetEducation, personalData } = props
  if (!_.isEmpty(preVetEducation) && !_.isEmpty(vetEducation)) {
    return (
      <Card className = "card-bottom-margin">
        <Card.Header>
          Where did Dr. {capitalizeFirstLetter(personalData.LastName)} go to school?
        </Card.Header>
        <Card.Body>
          <h3>Pre-Veterinary Education</h3>
          {renderEducation(preVetEducation, "preVet", true)}

          <h3>Veterinary Education</h3>
          {renderEducation(vetEducation, "vet", false)}
        </Card.Body>
      </Card>
    )
  }
}

function renderEducation(educationList, preVetOrVet, hasMajor) {
  let educationID
  if (preVetOrVet === "preVet") educationID = "pre_vet_education_mappingID"
  if (preVetOrVet === "vet") educationID = "vet_education_mappingID"

  return (
    <>
      {educationList.map((education) => (
        <p key = {education[educationID]}>
          {education.School_name}, {education.Education_type}
          {hasMajor ? ` in ${education.Major_name}` : ""} {" "}
          ({education.Start_Date} - {education.End_Date})
        </p>
      ))}
    </>
  )
}
