import React from "react";
import { Card } from "react-bootstrap";
import _ from "lodash"

export default function RenderLanguageSection(props) {
    if (!_.isEmpty(props.spokenLanguages)) {
        return (
            <Card className="card-bottom-margin">
                <Card.Header>
                    Spoken Languages
                </Card.Header>
                <Card.Body>
                    {renderSpokenLanguages(props)}
                </Card.Body>
            </Card>
        )
    }
}

function renderSpokenLanguages(props) {
    return (
        <>
            {props.spokenLanguages.map((language, index) => (
                <p key={index}>{language.Language_name}</p>
                ))
            }
        </>
    )
}
