import { Card, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { handlePublicAvailibilityToggle } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details";

export default function RenderPublicStatusSection (props) {
  return(
    <>
      <Card>
        <Card.Header>
          Public Availbility Status
        </Card.Header>
        <Card.Body>
          Would you like your profile to be available through search results?
          {RenderIsPubliclyAvailable(props)}
        </Card.Body>
      </Card>
    </>
  );
};

function RenderIsPubliclyAvailable (props) {
  const { publiclyAvailable, setPubliclyAvailable } = props;
  const [publiclyAvailableConfirmation, setPubliclyAvailableConfirmation] = useConfirmationMessage();

  const renderMessageSection = () => {
    return (
      <span className = {`fade ${publiclyAvailableConfirmation.messageType ? 'show' : ''}`}>
        {publiclyAvailableConfirmation.messageType === 'saved' && 'Publicly Available status saved!'}
        {publiclyAvailableConfirmation.messageType === 'problem' && 'Problem Saving Publicly Available status!'}
      </span>
    )
  }

  return(
    <div>
      <ToggleButtonGroup type = "radio" name = "options" 
        value = {publiclyAvailable ?? 0}
        onChange = {(value) => handlePublicAvailibilityToggle(value, setPubliclyAvailable, setPubliclyAvailableConfirmation)}
      >
        <ToggleButton 
          id = "tbg-radio-1" 
          value = {0} 
          style = {{ backgroundColor: publiclyAvailable === 0 ? "red" : "white", color: publiclyAvailable === 0 ? "white" : "black", borderColor: "black"}}
        >
          No
        </ToggleButton>
        
        <ToggleButton 
          id = "tbg-radio-2" 
          value = {1} 
          style = {{ backgroundColor: publiclyAvailable === 1 ? "green" : "white", color: publiclyAvailable === 1 ? "white" : "black", borderColor: "black"}}
        >
          Yes
        </ToggleButton>
      </ToggleButtonGroup>
      {renderMessageSection()}
    </div>
  )
};
