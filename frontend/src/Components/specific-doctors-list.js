import React, {useContext, useEffect} from 'react';
import {Card, Button} from 'react-bootstrap';
import {Link, useParams} from "react-router-dom";
import { SearchContext } from '../Contexts/SearchContext';

export default function SpecificDoctorsList() {
  const {searchTerm, items, setSearchTerm, fetchData} = useContext(SearchContext)
  
  let { query } = useParams(); //the id of the current site (which user) --> used to set User
  console.log(query)
 
  if (!query){
      window.location.href = '/';
  }
  useEffect(()=>{
    console.log('1)In Specific Doctors List')
    setSearchTerm(query)
    fetchData()
  }, [searchTerm])

  if (!items || items === 'User not found'){
    return (
        <div> 
          No results
          </div>
    );
  }

  else{
    const data = items.slice(0, 100); // This has no function rn, since there are less than 100 vets. once there are more, only the first 100 will be returned

    return (
      <div className="card-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridGap: '16px' }}>
        {data.map((item) => {
          const { email } = item;
          return(
            <Card key={item.DoctorID} style={{margin: '0 10px', gridColumn: 'span 1', gridRow: 'span 1' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>My First Name: {email}</Card.Title>
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
}