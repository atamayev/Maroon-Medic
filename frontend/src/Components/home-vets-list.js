import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link} from "react-router-dom";

export default function HomeVetsList({ results }) {
  
  // console.log('results', results)
  if (!results || results === "User not found"){
    return <div> No results</div>
  }
  const data = results.slice(0, 100); // This has no function rn, since there are less than 100 users. once there are more, only the first 100 will be returned

  return (

    // <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div className="card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '16px' }}>
        {data.map((item) => {
          const { email } = item;
          return(
            <Card key={item.DoctorID} style={{margin: '0 10px', gridColumn: 'span 1', gridRow: 'span 1' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>My First Name: {email}</Card.Title>
              {/* <Card.Text>
              My Password: {password}
              </Card.Text> */}
              <Link to= {`/user/${item.DoctorID}`}>
                <Button variant="primary">
                    <p>Click Me! id: {item.DoctorID}</p>
                </Button>
            </Link>
            </Card.Body>
          </Card>
          )
        })}
      </div>
  );
}