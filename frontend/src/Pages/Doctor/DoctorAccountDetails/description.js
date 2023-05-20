import React from "react";
import { Card, Button, Form } from "react-bootstrap";
import FormGroup from '../../../Components/form-group.js';

import { handleDescriptionChange } from "../../../Custom Hooks/Hooks for Doctor Account Details/select";
import { saveDescription } from "../../../Custom Hooks/Hooks for Doctor Account Details/save";

export default function RenderDescriptionSection (props){
    return(
        <Card>
          <Card.Header>
            Description
          </Card.Header>
          <Card.Body>
            {renderIsDescription(props)}
          </Card.Body>
        </Card>
    )
};

function renderIsDescription(props){
    return(
        <Form> 
        <FormGroup
            id="Description" 
            value={props.description.Description} 
            onChange = {event => handleDescriptionChange(event, props.setDescription, props.setIsDescriptionOverLimit)}
            maxLength={1000} // limit to 1000 characters
            as="textarea" 
            rows={3}
          />
            <div style={props.counterStyle}>Character Limit: {props.description.Description ? (<>{props.description.Description.length}</>):(<>0</>)} / 1000</div>
        <Button 
          variant="success" 
          onClick={()=> saveDescription(props.description, props.setShowSavedDescriptionMessage)}
          >
            Save</Button>
        <span className={`fade ${props.showSavedDescriptionMessage ? 'show' : ''}`}>  Description saved!</span>
      </Form>
        )
};
