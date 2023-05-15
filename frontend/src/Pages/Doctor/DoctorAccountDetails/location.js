import React from "react";
import {Card, Accordion} from 'react-bootstrap';

export default function RenderLocationSection(){
    return(
        <Card>
          <Card.Header>
            Locations
          </Card.Header>
        <Card.Body>
        <Accordion defaultActiveKey={['0']} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Accordion Item #1</Accordion.Header>
              {/* possibly: {accountDetails.Location.index.name}{accountDetails.Location.index.name} */}
  
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </Accordion.Body>
          </Accordion.Item>
  
          <Accordion.Item eventKey="1">
            <Accordion.Header>Accordion Item #2</Accordion.Header>
            <Accordion.Body>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </Accordion.Body>
        </Accordion.Item>
        </Accordion>
        </Card.Body>
      </Card>
    )
};
