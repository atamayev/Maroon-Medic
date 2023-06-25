import { useEffect, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import FormGroup from '../../../components/form-group.js';
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message.js";
import { saveDescription } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details.js";

export default function RenderDescriptionSection (props) {
  return(
    <Card className = "mb-3">
      <Card.Header>
        Description
      </Card.Header>
      <Card.Body>
        {RenderIsDescription(props)}
      </Card.Body>
    </Card>
  );
};

function RenderIsDescription(props) {
  const { description, setDescription } = props;
  const [isDescriptionOverLimit, setIsDescriptionOverLimit] = useState(false);
  const [descriptionConfirmation, setDescriptionConfirmation] = useConfirmationMessage();
  
  useEffect(() => {
    if (description || description === "") setIsDescriptionOverLimit(description.length >= 1000)
  }, [description])

  const counterStyleLimit = () => {
    if (isDescriptionOverLimit) return {color: 'red'}
    return {color: 'black'}
  }

  const renderDescriptionInput = () => {
    return (
      <FormGroup
        id = "Description" 
        value = {description} 
        onChange = {event => {
          const value = event.target.value;
          setDescription(value);
        }}
        maxLength = {1000} // limit to 1000 characters
        as = "textarea" 
        rows = {3}
      />
    )
  }

  const renderCharacterLimit = () => {
    return (
      <div style = {counterStyleLimit()}>
        Character Limit: {description.length} / 1000
      </div>
    )
  }

  const renderSaveButton = () => {
    return (
      <Button 
        variant = "success" 
        onClick = {() => saveDescription(description, setDescriptionConfirmation)}
      >
        Save
      </Button>
    )
  }

  const renderMessageSection = () => {
    return (
      <span className = {`fade ${descriptionConfirmation.messageType ? 'show' : ''}`}>
        {descriptionConfirmation.messageType === 'saved' && 'Description saved!'}
        {descriptionConfirmation.messageType === 'same' && 'Same Description data!'}
        {descriptionConfirmation.messageType === 'problem' && 'Problem Saving Description!'}
        {descriptionConfirmation.messageType === 'none' && 'No description selected'}
      </span>
    )
  }
  
  return(
    <Form> 
      {renderDescriptionInput()}
      {renderCharacterLimit()}
      {renderSaveButton()}
      {renderMessageSection()}
    </Form>
  );
};
