import {Link} from "react-router-dom";
import {Button, Card} from 'react-bootstrap';
import Header from "../pages/header";

export function NonDoctorAccess() {
  //for when a Doctor Page is accessed by a non-doctor
  return(
    <>
      <Header dropdown = {true} search = {true}/>
      <Card>
        <Card.Body>
          <p>You are not logged in as a Vet. Please make an account, or login below</p>;
          <Link to = {'/vet-register'}>
            <Button variant = "primary">
                <p>Register</p>
            </Button>
          </Link>
          <Link to = {'/vet-login'}>
            <Button variant = "primary">
                <p>Login</p>
            </Button>
          </Link>
        </Card.Body>
      </Card>
    </>
  )
}

export function NonPatientAccess() {
  //for when a Patient Page is accessed by a non-patient
  return(
    <>
      <Header dropdown = {true} search = {true}/>
      <Card>
        <Card.Body>
          <p>You are not logged in as a patient. Please make an account, or login below</p>;
          <Link to = {'/patient-register'}>
            <Button variant = "primary">
                <p>Register</p>
            </Button>
          </Link>
          <Link to = {'/patient-login'}>
            <Button variant = "primary">
                <p>Login</p>
            </Button>
            </Link>
        </Card.Body>
      </Card>
    </>
  )
}
