import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Button, Card} from 'react-bootstrap';
import VetDataService from "../Services/vet-service.js";

export default function Dashboard() {
    const [UUID, setUUID] = useState(null)
    const [verifyToken, setverifyToken] = useState(false) // wheather or not user verified

    useEffect(()=>{
      checkUUID();
      user_verification();
    });
    
    function checkUUID(){
      const cookieName = "UUID=";
      const decodedCookie = document.cookie; // when https, will need to decode
      const cookies = decodedCookie.split(";");
      for(let i = 0; i <cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
          cookie = cookie.substring(1);
        }
        if (cookie.startsWith(cookieName)) {
          setUUID(cookie.substring(cookieName.length, cookie.length));
        }
      }
      return null;
    }
    async function user_verification (){
      const cookies = document.cookie;
      if(cookies){
        try {
            const response = await VetDataService.verify(cookies)
          if(response.data.success === true){
            console.log('verified')
            setverifyToken(true)
          }
          else{// if user not veriifed
            console.log('not verified')
            setverifyToken(false);
          }
      }catch(error){
        if(error.response.data.error === 'Token expired'){
          return(
            <div>
                    <Card>
                <Card.Body>
                  <p>Session Timed out. Please log in again </p>;
                  <Link to= {'/login'}>
                      <Button variant="primary">
                          <p>Login</p>
                      </Button>
                </Link>
              </Card.Body>
            </Card>
            </div>
          )
        }
        console.log(error.response.data.error)
        setverifyToken(false);
      }
    }
      else{// if no token received
        console.log('not verified')
        setverifyToken(false);
      }
    }
    if(!UUID && !verifyToken){
      return(
       <Card>
          <Card.Body>
            <p>Please register or login first </p>;
            <Link to= {'/register'}>
                <Button variant="primary">
                    <p>Register</p>
                </Button>
          </Link>
          <Link to= {'/login'}>
                <Button variant="primary">
                    <p>Login</p>
                </Button>
          </Link>
        </Card.Body>
      </Card>
      )
  }
    if(!verifyToken){
      return(
       <Card>
          <Card.Body>
            <p>Please register first </p>;
            <Link to= {'/register'}>
                <Button variant="primary">
                    <p>Register</p>
                </Button>
          </Link>
        </Card.Body>
      </Card>
      )
    }



  return (
    <div>
        <p>This is the Dashboard Page</p>
          <Link to= {'/edit-profile'}>
                <Button variant="primary">
                    <p>Edit Profile</p>
                </Button>
          </Link>
    </div>
  )
}
