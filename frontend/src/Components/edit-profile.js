import React, {useEffect, useContext} from 'react'
import { AuthContext } from '../Contexts/authContext.js';
import {useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default function EditProfile() {
    const {currentUser} = useContext(AuthContext)
    const navigate = useNavigate();

    function checkCurrentUser(currentUser){
        
        if(!currentUser){
          console.log('currentUser', currentUser)
          alert('Not logged in. Re-directing to Login')
          navigate(`/login`)
        }
      }
      
    useEffect(()=>{
        checkCurrentUser(currentUser)
      });
          // have a return function if no one logged in. immediate red-riect looks shitty

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
