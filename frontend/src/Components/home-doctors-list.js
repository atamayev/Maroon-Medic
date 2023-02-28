import React, {useContext, useEffect} from 'react';
import {Card, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import { SearchContext } from '../Contexts/SearchContext';

export default function HomeDoctorsList() {
  const {items, fetchData, setSearchTerm } = useContext(SearchContext)
  
  useEffect(()=>{
    setSearchTerm("")
    console.log('in home doctors list')
    fetchData();
  }, [])

  if (!items || items === "Vet not found"){
    return <div> No results</div>
  }
  const data = items.slice(0, 1000); // This has no function rn, since there are less than 1000 users. once there are more, only the first 100 will be returned

  return (
    <>
      <div className="card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '16px' }}>
        {data.map((item) => {
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
    </>
  );
}