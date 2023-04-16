import {Link} from "react-router-dom";
import {Button, Card} from 'react-bootstrap';
import Header from "../Pages/header";

export function UserIsUnAuthPatient(user_type){
    //for when a Doctor Page is accessed by a non-doctor
    if(user_type === 'Patient'){
        return(
            <>
            <Header dropdown = {true} search = {true}/>
                <Card>
                    <Card.Body>
                    <p>Unautorized to edit Doctor Details </p>;
                    <Link to= {'/patient-dashboard'}>
                        <Button variant="primary">
                            <p>Return to Patient Dashboard</p>
                        </Button>
                    </Link>
                    </Card.Body>
                </Card>
            </>

        )
    }else if(user_type !== 'Doctor'){
        return(
            <>
                <Header dropdown = {true} search = {true}/>
                <Card>
                    <Card.Body>
                        <p>Please register or login first </p>;
                        <Link to= {'/vet-register'}>
                            <Button variant="primary">
                                <p>Register</p>
                            </Button>
                    </Link>
                    <Link to= {'/vet-login'}>
                    <Button variant="primary">
                        <p>Login</p>
                    </Button>
                    </Link>
                    </Card.Body>
                </Card>     
            </>
          )
    }
}

export function UserIsUnAuthDoctor(user_type){
    //for when a Patient Page is accessed by a non-patient
    if (user_type === 'Doctor'){
        return(
          <>
            <Header dropdown = {true} search = {true}/>
            <Card>
              <Card.Body>
              <p>Unautorized to view Patient Dashboard</p>
              <Link to= {'/vet-dashboard'}>
                    <Button variant="primary">
                        <p>Return to Doctor Dashboard</p>
                    </Button>
              </Link>
              </Card.Body>
            </Card>
          </>
        )
      }
    
      if(user_type !== 'Patient'){
        return(
          <>
            <Header dropdown = {true} search = {true}/>
            <Card>
              <Card.Body>
                <p>Please register or login first </p>;
                <Link to= {'/patient-register'}>
                    <Button variant="primary">
                        <p>Register</p>
                    </Button>
                </Link>
                <Link to= {'/patient-login'}>
                        <Button variant="primary">
                            <p>Login</p>
                        </Button>
                </Link>
                </Card.Body>
            </Card>
          </>
        )
      }
}
