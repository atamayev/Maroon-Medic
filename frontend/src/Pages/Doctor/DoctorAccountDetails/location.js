import React from "react";
import {Card, Accordion} from 'react-bootstrap';
import _Accordion from "../../../Components/accordion";

export default function RenderLocationSection(props){
  return(
    <Card>
      <Card.Header>
        Locations
      </Card.Header>
    <Card.Body>
      {RenderIsLocation(props)}
    </Card.Body>
    </Card>
  );
}

function RenderIsLocation(){
  return(
    <>
      <Accordion defaultActiveKey={['0']} alwaysOpen>
        <_Accordion
          eventKey = "0"
          header = "Accordion Item #1"
          body = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
        />
        <_Accordion
          eventKey = "1"
          header = "Accordion Item #2"
          body = "Test"
        />
      </Accordion>
    </>
  )
};
