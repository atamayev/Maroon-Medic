import React from "react";
import { Card } from "react-bootstrap";

export default function RenderInsuranceSection(props){
    if(props.acceptedInsurances.length){
        return(
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

function renderAcceptedInsurances(props){
    return(
        <>
        {props.acceptedInsurances.map((insurance, index) => (
            <p key={index}>{insurance.Insurance_name}</p>
            ))
        }
        </>
    )
};
