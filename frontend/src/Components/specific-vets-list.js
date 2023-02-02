import React, {useState, useEffect} from 'react';
import {Card, Button} from 'react-bootstrap';
import {Link, useParams} from "react-router-dom";
import VetDataService from "../Services/vet-service"

export default function SpecificVetsList() {
    let { query } = useParams(); //the id of the current site (which user) --> used to set User
    if (!query){
        window.location.href = '/';
    }
    const [results, setResults] = useState(null);

    useEffect(() => {
        findByName(query);
    }, [query]);

    async function findByName (query) {
        console.log('query', query)
        try{
          const response = await VetDataService.find(query)
          setResults(response.data); // Sets the data state to the response (all vets)
        }catch(error){
          console.error(error);
        }
  };

  // console.log('results', results)
  if (!results || results === "User not found"){
    return <div> No results</div>
  }
  const data = results.slice(0, 100); // This has no function rn, since there are less than 100 users. once there are more, only the first 100 will be returned

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