import _ from 'lodash';
import React from "react";
import { Card } from "react-bootstrap";

export default function RenderInsuranceSection(props) {
  if (!_.isEmpty(props.acceptedInsurances)) {
    return (
      <Card className="card-bottom-margin">
        <Card.Header>
          Accepted Insurances
        </Card.Header>
        <Card.Body>
          {renderAcceptedInsurances(props)}
        </Card.Body>
      </Card>
    )
  }
};

function renderAcceptedInsurances(props) {
  return(
      <>
      {props.acceptedInsurances.map((insurance, index) => (
          <p key={index}>{insurance.Insurance_name}</p>
          ))
      }
      </>
  )
};
