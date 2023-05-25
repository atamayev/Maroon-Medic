import React from "react";
import { Card, ToggleButton, ToggleButtonGroup, Button} from "react-bootstrap";
import { handlePublicAvailibilityToggle } from "../../../Custom Hooks/Hooks for Doctor Account Details/save";

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
        <br/>
        <ToggleButtonGroup type="radio" name="options" 
        value={props.publiclyAvailable ?? 0} 
        onChange={(value)=>handlePublicAvailibilityToggle(value, props.setPubliclyAvailable, props.setShowSavedPubliclyAvalableMessage, props.setShowSavePubliclyAvalableProblemMessage)}>
          <ToggleButton id="tbg-radio-1" value = {0} style={{ backgroundColor: props.publiclyAvailable === 0 ? "red" : "white", color: props.publiclyAvailable === 0 ? "white" : "black", borderColor: "black"}}>
            No
          </ToggleButton>
          <ToggleButton id="tbg-radio-2" value = {1} style={{ backgroundColor: props.publiclyAvailable === 1 ? "green" : "white", color: props.publiclyAvailable === 1 ? "white" : "black", borderColor: "black"}}>
            Yes
          </ToggleButton>
      </ToggleButtonGroup>
      <span className={`fade ${props.showSavedPubliclyAvalableMessage ? 'show' : ''}`}>Public Availability Status Saved!</span>
      <span className={`fade ${props.showSavePubliclyAvalableProblemMessage ? 'show' : ''}`}>Problem Saving Public Availability Status!</span>
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
