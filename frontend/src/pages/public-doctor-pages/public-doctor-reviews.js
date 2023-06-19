import _ from 'lodash';
import React from "react";
import { Card } from "react-bootstrap";

export default function RenderReviewsSection(props) {

// if (!_.isEmpty(props.spokenLanguages)) {
    return(
      <Card className="card-bottom-margin">
      <Card.Header>
        Reviews
      </Card.Header>
      <Card.Body>
        {renderReviews(props)}
      </Card.Body>
    </Card>
    )
    // }

}

function renderReviews(props) {
    return(
        <>
        Reviews Section
        </>
    )
}
