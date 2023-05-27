import React from "react";
import { Card, Button} from "react-bootstrap";
import { handleAddInsurance } from "../../../Custom Hooks/Hooks for Doctor Account Details/add";
import { handleDeleteInsurance } from "../../../Custom Hooks/Hooks for Doctor Account Details/delete";
import { saveInsurances } from "../../../Custom Hooks/Hooks for Doctor Account Details/save";

export default function RenderInsuranceSection(props){
  return(
    <Card>
      <Card.Header>
        Insurances
      </Card.Header>
      <Card.Body>
        {renderIsVetInsurance(props)}
      </Card.Body>
    </Card>
  );
};

function renderIsVetInsurance(props){
  return (
    <>
      {Array.isArray(props.listDetails[0]) &&
        props.listDetails[0].length > 0 &&
        props.listDetails[0].map((insurance) => (
          <div key={insurance?.insurance_listID}>
            <input
              type="checkbox"
              id={insurance?.insurance_listID}
              name="insurance"
              value={insurance?.insurance_listID}
              checked={props.acceptedInsurances.find((accepted) => accepted.insurance_listID === insurance.insurance_listID) !== undefined}
              onChange={(event) => {
                if (event.target.checked) {
                  handleAddInsurance(insurance, props.acceptedInsurances, props.setAcceptedInsurances);
                } else {
                  handleDeleteInsurance(insurance, props.acceptedInsurances, props.setAcceptedInsurances);
                }
              }}
            />
            <label htmlFor={insurance?.insurance_listID}>{insurance?.Insurance_name}</label>
          </div>
        ))}
      <Button 
        variant="success" 
        onClick={() => saveInsurances(props.acceptedInsurances, props.setInsurancesConfirmation)}
        >
        Save</Button>
        <span className={`fade ${props.insurancesConfirmation.messageType !== 'none' ? 'show' : ''}`}>
          {props.insurancesConfirmation.messageType === 'saved' && 'Insurances saved!'}
          {props.insurancesConfirmation.messageType === 'same' && 'Same Insurance data!'}
          {props.insurancesConfirmation.messageType === 'problem' && 'Problem Saving Insurances!'}
          {props.insurancesConfirmation.messageType === 'none' && 'No insurances selected'}
        </span>
    </>
    );
};
