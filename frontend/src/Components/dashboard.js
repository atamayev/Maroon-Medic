import React, {useEffect, useContext} from 'react'
import { AuthContext } from '../Contexts/authContext.js';
import {Link, useNavigate} from "react-router-dom";
import {Button, Card} from 'react-bootstrap';

export default function Dashboard() {
    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate();
    
    if(!currentUser){
        return(
         <Card>
            <Card.Body>
              <p>Please register first </p>;
              <Link to= {'/register'}>
                  <Button variant="primary">
                      <p>Go back home</p>
                  </Button>
            </Link>
          </Card.Body>
        </Card>
        )
      }
    
    //   function checkCurrentUser(currentUser){
        
    //     if(!currentUser){
    //       console.log('currentUser', currentUser)
    //       alert('Not logged in. Re-directing to Login')
    //       navigate(`/login`)
    //     }
    //   }
      
    // useEffect(()=>{
    //     checkCurrentUser(currentUser)
    //   });
    // have a return function if no one logged in. immediate red-riect looks shitty

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
