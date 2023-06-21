import _ from "lodash"
import React from "react";
import { Card, Button} from "react-bootstrap";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { saveInsurances } from "../../../custom-hooks/account-details-hooks/save-patient-account-details";

export default function RenderInsuranceSection(props) {
  return(
    <Card className="mb-3 mt-3">
      <Card.Header>
        Insurances
      </Card.Header>
      <Card.Body>
        {RenderIsPatientInsurance(props)}
      </Card.Body>
    </Card>
  );
};

function RenderIsPatientInsurance(props) {
  const [insurancesConfirmation, setInsurancesConfirmation] = useConfirmationMessage();

  return (
    <>
      {_.isArray(props.listDetails.insurances) &&
        !_.isEmpty(props.listDetails.insurances) &&
        props.listDetails.insurances.map((insurance) => (
          <div key={insurance?.insurance_listID}>
            <input
              type="checkbox"
              id={insurance?.insurance_listID}
              name="insurance"
              value={insurance?.insurance_listID}
              checked={props.acceptedInsurances.find((accepted) => accepted.insurance_listID === insurance.insurance_listID) !== undefined}
              onChange={(event) => {
                if (event.target.checked) props.setAcceptedInsurances([...props.acceptedInsurances, insurance]);
                else props.setAcceptedInsurances(props.acceptedInsurances.filter(insurancef => insurancef.insurance_listID !== insurance.insurance_listID));
              }}
            />
            <label htmlFor={insurance?.insurance_listID}>{insurance?.Insurance_name}</label>
          </div>
        ))}
      <Button 
        variant="success" 
        onClick={() => saveInsurances(props.acceptedInsurances, setInsurancesConfirmation)}
        >
        Save</Button>
        <span className={`fade ${insurancesConfirmation.messageType ? 'show' : ''}`}>
          {insurancesConfirmation.messageType === 'saved' && 'Insurances saved!'}
          {insurancesConfirmation.messageType === 'same' && 'Same Insurance data!'}
          {insurancesConfirmation.messageType === 'problem' && 'Problem Saving Insurances!'}
          {insurancesConfirmation.messageType === 'none' && 'No insurances selected'}
        </span>
    </>
    );
};
