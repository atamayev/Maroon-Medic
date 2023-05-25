import React from "react";
import { Card } from "react-bootstrap";

export default function RenderPersonalInfoSection(props){
    if(props.personalData || props.description){
        return(
            <>
                <h3> 
                    {RenderPersonalInfo(props.personalData)}
                </h3>
                {RenderDescription(props.description)}
            </>
        )
    }
}

function RenderPersonalInfo(props){

    if(Object.keys(props).length){
        const capitalizedFirstName = props.FirstName.charAt(0).toUpperCase() + props.FirstName.slice(1);
        const capitalizedLastName = props.LastName.charAt(0).toUpperCase() + props.LastName.slice(1);
        return(
            <>
                Dr. {''}
                {capitalizedFirstName} {''}
                {capitalizedLastName}
            </>
        )
    }
};

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
