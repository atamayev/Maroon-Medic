import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import FormGroup from '../../../components/form-group.js';
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message.js";
import { saveDescription } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details.js";

export default function RenderDescriptionSection (props) {
  return(
    <Card className="mb-3">
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
  const [descriptionConfirmation, setDescriptionConfirmation] = useConfirmationMessage();

  const counterStyleLimit = () => {
    if (props.isDescriptionOverLimit) return {color: 'red'}
    return {color: 'black'}
  }

  const renderCharacterLimitFraction = () => {
    if (!props.description.Description) return <>0</>
    return <>{props.description.Description.length}</>
  }

  const renderDescriptionInput = () => {
    return (
      <FormGroup
        id="Description" 
        value={props.description.Description} 
        onChange = {event => {
          const value = event.target.value;
          props.setDescription({Description: value});
          props.setIsDescriptionOverLimit(value.length >= 1000);
        }}
        maxLength={1000} // limit to 1000 characters
        as="textarea" 
        rows={3}
      />
    )
  }

  const renderCharacterLimit = () => {
    return (
      <div style = {counterStyleLimit()}>
        Character Limit: {renderCharacterLimitFraction()} / 1000
      </div>
    )
  }

  const renderSaveButton = () => {
    return (
      <Button 
        variant="success" 
        onClick={()=> saveDescription(props.description, setDescriptionConfirmation)}
      >
      Save</Button>
    )
  }

  const renderMessageSection = () => {
    return (
      <span className={`fade ${descriptionConfirmation.messageType ? 'show' : ''}`}>
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
