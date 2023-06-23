import React from "react";
import { Card, ToggleButton, ToggleButtonGroup, Button} from "react-bootstrap";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { handlePublicAvailibilityToggle } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details";

export default function RenderVerificationAndPublicStatusSection (props) {
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
  const { verified } = props;
  if (verified) return <Button variant = "success" disabled> ✓ (Your identity is Verified) </Button>
  else return <Button variant = "danger" disabled>X (Your identity is Not Verified)</Button>
};

function RenderIsPubliclyAvailable (props) {
  const [publiclyAvailableConfirmation, setPubliclyAvailableConfirmation] = useConfirmationMessage();
  const { publiclyAvailable, setPubliclyAvailable } = props;

  const renderMessageSection = () => {
    return (
      <span className = {`fade ${publiclyAvailableConfirmation.messageType ? 'show' : ''}`}>
        {publiclyAvailableConfirmation.messageType === 'saved' && 'Publicly Available status saved!'}
        {publiclyAvailableConfirmation.messageType === 'problem' && 'Problem Saving Publicly Available status!'}
      </span>
    )
  }

  const renderNotPubliclyAvailableButton = () => {
    return (
      <>
        <ToggleButton 
          id = "tbg-radio-1" 
          value = {0} 
          style = {{ backgroundColor: publiclyAvailable === 0 ? "red" : "white", color: publiclyAvailable === 0 ? "white" : "black", borderColor: "black"}}
        >
          No
        </ToggleButton>
      </>
    )
  }

  const renderIsPubliclyAvailableButton = () => {
    return (
      <>
          <ToggleButton 
            id = "tbg-radio-2" 
            value = {1} 
            style = {{ backgroundColor: publiclyAvailable === 1 ? "green" : "white", color: publiclyAvailable === 1 ? "white" : "black", borderColor: "black"}}
          >
            Yes
          </ToggleButton>
      </>
    )
  }

  return(
    <div>
      <ToggleButtonGroup type = "radio" name = "options" 
        value = {publiclyAvailable ?? 0} 
        onChange = {(value) =>handlePublicAvailibilityToggle(value, setPubliclyAvailable, setPubliclyAvailableConfirmation)}
      >
        {renderNotPubliclyAvailableButton()}
        {renderIsPubliclyAvailableButton()}
      </ToggleButtonGroup>
      {renderMessageSection()}
    </div>
  )
};
