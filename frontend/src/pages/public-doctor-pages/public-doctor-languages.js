import _ from "lodash"
import React from "react";
import { Card } from "react-bootstrap";

export default function RenderLanguageSection(props) {
    const { spokenLanguages } = props;
    if (!_.isEmpty(spokenLanguages)) {
        return (
            <Card className="card-bottom-margin">
                <Card.Header>
                    Spoken Languages
                </Card.Header>
                <Card.Body>
                    {renderSpokenLanguages(spokenLanguages)}
                </Card.Body>
            </Card>
        )
    }
}

function renderSpokenLanguages(spokenLanguages) {
    return (
        <>
            {spokenLanguages.map((language, index) => (
                <p key={index}>{language.Language_name}</p>
                ))
            }
        </>
    )
}
