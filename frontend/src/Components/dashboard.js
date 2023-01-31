import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {Button, Card} from 'react-bootstrap';

export default function Dashboard() {
    const [UUID, setUUID] = useState(null)   

    useEffect(()=>{
      checkUUID()
    });
    
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
          setUUID(cookie.substring(cookieName.length, cookie.length));
        }
      }
      return null;
    }

    if(!UUID){
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
        <p>This is the Dashboard Page</p>
          <Link to= {'/edit-profile'}>
                <Button variant="primary">
                    <p>Edit Profile</p>
                </Button>
          </Link>
    </div>
  )
}
