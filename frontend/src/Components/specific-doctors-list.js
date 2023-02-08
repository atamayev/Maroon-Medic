import React, {useContext} from 'react';
import {Card, Button} from 'react-bootstrap';
import {Link, useParams} from "react-router-dom";
import { SearchContext } from '../Wraps/SearchContext';

export default function SpecificDoctorsList() {
  const {searchTerm, items, setSearchTerm} = useContext(SearchContext)
  
  let { query } = useParams(); //the id of the current site (which user) --> used to set User
  console.log(`query ${query} searchterm ${searchTerm}`)
  
  if (!query){
      window.location.href = '/';
  }
  if(query != searchTerm){
    console.log(`query ${query} searchterm ${searchTerm}`)
    setSearchTerm(query)
  }  

  if (!items || items === "Vet not found"){
    return <div> No results</div>
  }
  const data = items.slice(0, 100); // This has no function rn, since there are less than 100 vets. once there are more, only the first 100 will be returned

  return (

    // <div style={{ display: 'flex', flexDirection: 'row' }}>
    <div className="card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '16px' }}>
        {data.map((item) => {
          const { email, password } = item;
          return(
            <Card key={item.DoctorID} style={{margin: '0 10px', gridColumn: 'span 1', gridRow: 'span 1' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>My First Name: {email}</Card.Title>
              {/* <Card.Text>
              My Password: {password}
              </Card.Text> */}
              <Link to = {`/vet/${item.DoctorID}`}>
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