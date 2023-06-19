import React from "react";
import { Card } from "react-bootstrap";
import _ from "lodash"

export default function RenderEducationSection(props) {
  if (!_.isEmpty(props.preVetEducation) && !_.isEmpty(props.vetEducation)) {
    return(
      <Card className="card-bottom-margin">
        <Card.Header>
          Where did Dr. [] go to school?
        </Card.Header>
        <Card.Body>
          <h3>Pre-Veterinary Education</h3>
          {renderEducation(props.preVetEducation, true)}

          <h3>Veterinary Education</h3>
          {renderEducation(props.vetEducation)}
        </Card.Body>
      </Card>
    )
  }
}

function renderEducation(educationList, hasMajor = false) {
  return (
    <>
      {educationList.map((education, index) => (
        <p key={index}>
        {education.School_name}, {education.Education_type} 
        {hasMajor ? ` in ${education.Major_name}` : ''} {' '}
        ({education.Start_Date} - {education.End_Date})
        </p>
      ))}
    </>
  )
};
  