import React, { useState, useEffect, useContext} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useParams} from "react-router-dom";
import DataService from "../Services/data-service.js";

export default function Doctor () {
  // Creates an id variable which gets the id of the current page. 
  let { id } = useParams(); //the id of the current site (which user) --> used to set User
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  if (Number(id)){
    id = Number(id)
  }

  useEffect(() => {
    console.log('in doctor.js')
    getDoctor(id);
  }, []);

  // Given the current ID, the dataservice returns all necessary information about that specific user
  async function getDoctor (id) {
    try{
      const response = await DataService.getSingleDoctor(id)
        if (response.data === 'User does not exist') {
          return <p>{response.data}</p>;
        }
        else{
          setUser(response.data);
        }
    }catch(e){
      console.error(`Unable to getDoctor, ${e}`);
      setError('An error occurred');
    }
  };

  if (error && !user) {
    return (
      <>
    <div className="alert alert-danger">{error}</div>
    <Card>
      <Card.Body>
        <p>Vet "{id}" does not exist </p>;
        <a href = "/">
          <Button variant="primary">
                <p>Go back home (Href)</p>
            </Button>
        </a>
      </Card.Body>
    </Card>
  </>
    );
  }

  if(error){
    return <div className="alert alert-danger">{error}</div>
  }

  if (!user) {
    return(
    <Card>
      <Card.Body>
        <p>Vet "{id}" does not exist </p>;
        <a href = "/">
          <Button variant="primary">
                <p>Go back home (Href)</p>
            </Button>
        </a>
    </Card.Body>
    </Card>
    )
  }
  
  return (
    <div>
      {/* {DoctorUUID? (console.log(DoctorUUID)):(<div></div>)} */}
        <Card key={user.DoctorID} style={{margin: '0 10px' }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
              <Card.Title>My Email: {user.email}</Card.Title>
              {/* Check if current user exists. If exists, then check if the current user's id matches the page id. if it does, display password. if not, show nothing */}
              {/* {currentUser ? (currentUser.DoctorID === id ?(
                <Card.Text>
                My Password: {user.password}<br></br>
                </Card.Text>
              ):<div></div>
              ):
              <div></div>} */}
              
              <Card.Text>
                My ID: {user.DoctorID}<br></br>
                My FirstName: {user.FirstName}<br></br>
                My LastName: {user.LastName}<br></br>
                My gender: {user.Gender}
              </Card.Text>
              <a href = "/">
                
              <Button variant="primary" >
                    <p>Go back home (Href)</p>
                </Button>
                </a>
             </Card.Body>
          </Card>
    </div>
  );
}