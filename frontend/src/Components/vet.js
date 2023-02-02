import React, { useState, useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {Link, useParams} from "react-router-dom";
import VetDataService from "../Services/vet-service.js";

export default function Vet () {
  // Creates an id variable which gets the id of the current page. 
  let { id } = useParams(); //the id of the current site (which user) --> used to set User
  
  if (Number(id)){
    id = Number(id)
  }
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [DoctorUUID, setDoctorUUID] = useState(null)   

  useEffect(() => {
    getVet(id);
    checkDoctorUUID()
  }, [id]);

  function checkDoctorUUID(){
    const cookieName = "DoctorUUID=";
    const decodedCookie = document.cookie; // when https, will need to decode
    const cookies = decodedCookie.split(";");
    for(let i = 0; i <cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.startsWith(cookieName)) {
        setDoctorUUID(cookie.substring(cookieName.length, cookie.length));
      }
    }
    return null;
  }

  // Given the current ID, the dataservice returns all necessary information about that specific user
  async function getVet (id) {
    try{
      // const response = await VetDataService.getSingleVet(id)
      const response = await VetDataService.getSingleVet(id)

        if (response.data === 'User does not exist') {
          return <p>{response.data}</p>;
        }
        else{
          setUser(response.data);
        }
    }catch(e){
      console.error(`Unable to getVet, ${e}`);
      setError('An error occurred');
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!user) {
    // console.log('id',id)
    return(
    <Card>
      <Card.Body>
        <p>Doctor "{id}" does not exist </p>;
        <Link to= {'/'}>
            <Button variant="primary">
                <p>Go back home</p>
            </Button>
        </Link>
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
              <Link to= {`/`}>
                <Button variant="primary">
                    <p>Go back home</p>
                </Button>
            </Link>
            </Card.Body>
          </Card>
          {DoctorUUID? (
            <div>
            </div>
          ): 
          <Link to= {'/vet-login'}>
                <Button variant="primary">
                    <p>Login</p>
                </Button>
          </Link>
          }

    </div>
  );
}