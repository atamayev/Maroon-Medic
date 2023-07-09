import { Card, ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { handlePublicAvailibilityToggle } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details";
import { renderMessageSection } from "../../../components/saved-message-section";

export default function RenderPublicStatusSection (props) {
  return(
    <>
      <Card className = "mb-3 mt-3">
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

  return (
    <div>
      {/* All of this logic must be kept in this component, or else the toggle button will not work: */}
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
      {renderMessageSection(publiclyAvailableConfirmation, "Public Availability Status")}
    </div>
  )
};
