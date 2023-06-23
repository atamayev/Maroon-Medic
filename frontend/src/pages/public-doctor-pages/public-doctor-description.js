import React from "react";
import { Card } from "react-bootstrap";

export default function RenderDescriptionSection(props) {
    const { description, personalData } = props;
    if (personalData || description) return <> {RenderDescription(description.Description)} </>
}

function RenderDescription(Description) {
    if (Description) {
        return(
            <>
                <Card className="card-bottom-margin"> 
                    <Card.Header>
                        Description
                    </Card.Header>
                    <Card.Body>
                        {Description}
                    </Card.Body>
                </Card>
            </>
        )
    }
};
