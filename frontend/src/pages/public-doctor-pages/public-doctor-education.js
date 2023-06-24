import _ from "lodash"
import { Card } from "react-bootstrap";

export default function RenderEducationSection(props) {
  const { preVetEducation, vetEducation } = props;
  if (!_.isEmpty(preVetEducation) && !_.isEmpty(vetEducation)) {
    return(
      <Card className = "card-bottom-margin">
        <Card.Header>
          Where did Dr. [] go to school?
        </Card.Header>
        <Card.Body>
          <h3>Pre-Veterinary Education</h3>
          {renderEducation(preVetEducation, true)}

          <h3>Veterinary Education</h3>
          {renderEducation(vetEducation)}
        </Card.Body>
      </Card>
    )
  }
}

function renderEducation(educationList, hasMajor = false) {
  return (
    <>
      {educationList.map((education, index) => (
        <p key = {index}>
        {education.School_name}, {education.Education_type} 
        {hasMajor ? ` in ${education.Major_name}` : ''} {' '}
        ({education.Start_Date} - {education.End_Date})
        </p>
      ))}
    </>
  )
};
