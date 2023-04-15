import React from 'react'
import {Card, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";

export default function SearchResults(props) {
    
  return (
    <div className="card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '16px' }}>
    {props.data.map((item) => {
      const { FirstName, LastName, Doctor_ID } = item;
      return(
        <Card key={Doctor_ID} style={{margin: '0 10px', gridColumn: 'span 1', gridRow: 'span 1' }}>
        {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
        <Card.Body>
          <Card.Title>Dr. {FirstName} {LastName}</Card.Title>
          <Link to = {`/vet/${Doctor_ID}`}>
            <Button variant="primary">
                <p>Click Me! id: {Doctor_ID}</p>
            </Button>
          </Link>
        </Card.Body>
      </Card>
      )
    })}
  </div>
  )
}