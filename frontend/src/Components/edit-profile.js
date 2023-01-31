import React, {useEffect, useContext} from 'react'
import { AuthContext } from '../Contexts/authContext.js';
import {useNavigate, Link } from "react-router-dom";
import {Button, Card} from 'react-bootstrap';

export default function EditProfile() {
    // const {currentUser} = useContext(AuthContext)
    // const navigate = useNavigate();

    // function checkCurrentUser(currentUser){
    //     if(!currentUser){
    //       console.log('currentUser', currentUser)
    //       alert('Not logged in. Re-directing to Login')
    //       navigate(`/login`)
    //     }
    //   }

      function checkUUID(){
        const cookieName = "UUID=";
        const decodedCookie = document.cookie; // when https, will need to decode
        const cookies = decodedCookie.split(";");
        for(let i = 0; i <cookies.length; i++) {
          let cookie = cookies[i];
          while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
          }
          if (cookie.startsWith(cookieName)) {
            console.log('true')
            return cookie.substring(cookieName.length, cookie.length);
          }
        }
        return null;
      }

      if(!checkUUID()){
        return(
         <Card>
            <Card.Body>
              <p>Please register or login first </p>;
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
        <p>This is the Edit Profile Page</p>
          <Link to= {'/dashboard'}>
                <Button variant="primary">
                    <p>Dashboard</p>
                </Button>
          </Link>
    </div>
  )
}
