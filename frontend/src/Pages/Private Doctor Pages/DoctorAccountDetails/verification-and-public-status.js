import React from "react";
import { Card, ToggleButton, ToggleButtonGroup, Button} from "react-bootstrap";
import { handlePublicAvailibilityToggle } from "../../../Custom Hooks/Hooks for Account Details/DoctorAccountDetails/saveDoctorAccountDetails";
import { useConfirmationMessage } from "../../../Custom Hooks/useConfirmationMessage";

export default function RenderVerificationAndPublicStatusSection (props){
  return(
    <Card>
      <Card.Header>
        Verification and Search Results
      </Card.Header>
      <Card.Body>
        Account Verification Status:
        {renderIsVerification(props)}
        <br/>
        Would you like your profile to be Publicly Available?
        {RenderIsPubliclyAvailable(props)}
      </Card.Body>
    </Card>
  );
};

function renderIsVerification (props) {
  
  if(props.verified){
    return(
      <Button
          variant="success"
          disabled 
        >
        ✓ (Your identity is Verified)
      </Button>
    )
  }else{
    return(
      <Button
        variant="danger"
        disabled
        >
        X (Your identity is Not Verified)
      </Button>
    )
  }
};

function RenderIsPubliclyAvailable (props){
  const [publiclyAvailableConfirmation, setPubliclyAvailableConfirmation] = useConfirmationMessage();

  return(
    <div>
      <ToggleButtonGroup type="radio" name="options" 
        value={props.publiclyAvailable ?? 0} 
        onChange={(value)=>handlePublicAvailibilityToggle(value, props.setPubliclyAvailable, setPubliclyAvailableConfirmation)}>
          <ToggleButton id="tbg-radio-1" value = {0} style={{ backgroundColor: props.publiclyAvailable === 0 ? "red" : "white", color: props.publiclyAvailable === 0 ? "white" : "black", borderColor: "black"}}>
            No
          </ToggleButton>
          <ToggleButton id="tbg-radio-2" value = {1} style={{ backgroundColor: props.publiclyAvailable === 1 ? "green" : "white", color: props.publiclyAvailable === 1 ? "white" : "black", borderColor: "black"}}>
            Yes
          </ToggleButton>
      </ToggleButtonGroup>
      <span className={`fade ${publiclyAvailableConfirmation.messageType ? 'show' : ''}`}>
        {publiclyAvailableConfirmation.messageType === 'saved' && 'Publicly Available status saved!'}
        {publiclyAvailableConfirmation.messageType === 'problem' && 'Problem Saving Publicly Available status!'}
      </span>
    </div>
  )
};
