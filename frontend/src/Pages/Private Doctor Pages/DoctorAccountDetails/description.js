import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import FormGroup from '../../../Components/form-group.js';
import { saveDescription } from "../../../Custom Hooks/Hooks for Account Details/DoctorAccountDetails/saveDoctorAccountDetails.js";
import { useConfirmationMessage } from "../../../Custom Hooks/useConfirmationMessage.js";

export default function RenderDescriptionSection (props){
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

function RenderIsDescription(props){
  const [descriptionConfirmation, setDescriptionConfirmation] = useConfirmationMessage();

  const counterStyleLimit = () => {
    if (props.isDescriptionOverLimit) return {color: 'red'}
    return {color: 'black'}
  }

  const renderCharacterLimitFraction = () => {
    if (!props.description.Description) return <>0</>
    return <>{props.description.Description.length}</>
  }
  
  return(
    <Form> 
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
      <div style = {counterStyleLimit()}>
        Character Limit: {renderCharacterLimitFraction()} / 1000
      </div>
      <Button 
        variant="success" 
        onClick={()=> saveDescription(props.description, setDescriptionConfirmation)}
      >
      Save</Button>
      <span className={`fade ${descriptionConfirmation.messageType ? 'show' : ''}`}>
        {descriptionConfirmation.messageType === 'saved' && 'Description saved!'}
        {descriptionConfirmation.messageType === 'same' && 'Same Description data!'}
        {descriptionConfirmation.messageType === 'problem' && 'Problem Saving Description!'}
        {descriptionConfirmation.messageType === 'none' && 'No description selected'}
      </span>
    </Form>
  );
};
