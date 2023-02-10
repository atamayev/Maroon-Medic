import React, {useContext, useEffect} from 'react';
import {Card, Button} from 'react-bootstrap';
import {Link} from "react-router-dom";
import { SearchContext } from '../Wraps/SearchContext';

export default function HomeDoctorsList() {
  localStorage.setItem("searchTerm", "")
  const {items, fetchData, serachTerm} = useContext(SearchContext)
  // console.log(items)
  useEffect(()=>{
    console.log('in home doctors list')
    fetchData();
  }, [serachTerm])

  if (!items || items === "Vet not found"){
    return <div> No results</div>
  }
  const data = items.slice(0, 100); // This has no function rn, since there are less than 100 users. once there are more, only the first 100 will be returned

  return (
    <>
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
    </>
  );
}