import React from "react";
import { Card } from "react-bootstrap";

export default function RenderDescriptionSection(props){
    if(props.personalData || props.description){
        return(
            <>
                {RenderDescription(props.description)}
            </>
        )
    }
}

function RenderDescription(props){
    if(props.Description){
        return(
            <>
                <Card className="card-bottom-margin"> 
                    <Card.Header>
                        Description
                    </Card.Header>
                    <Card.Body>
                    {props.Description}
                    </Card.Body>
                </Card>
            </>
        )
    }
};
