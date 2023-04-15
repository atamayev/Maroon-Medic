import React, { useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useParams} from "react-router-dom";
import DataService from "../Services/data-service.js";
import Header from './header.js';

export default function Doctor () {
  // Creates an id variable which gets the id of the current page. 
  let { id } = useParams(); //the id of the current site (which user) --> used to set User
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  if (Number(id)){
    id = Number(id)
  }

  useEffect(() => {
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

  if (error || !user) {
    return (
      <>
      <Header dropdown = {true} search = {true}/>
        {error && <div className="alert alert-danger">{error}</div>}
        <Card>
          <Card.Body>
            <p>Vet "{id}" does not exist</p>
            <a href="/">
              <Button variant="primary">
                <p>Go back home (Href)</p>
              </Button>
            </a>
          </Card.Body>
        </Card>
      </>
    );
  }
  
  return (
    <>
      <Header dropdown = {true} search = {true}/>
      <Card key={user.Doctor_ID} style={{margin: '0 10px' }}>
          {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
          <Card.Body>
            <Card.Title>My Email: {user.email}</Card.Title>
            <Card.Text>
              My ID: {user.Doctor_ID}<br></br>
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
    </>
  );
}
