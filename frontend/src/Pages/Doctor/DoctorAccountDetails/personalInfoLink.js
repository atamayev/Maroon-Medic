import React from "react";
import {Link} from "react-router-dom";
import { Card, Button} from "react-bootstrap";

export default function RenderPersonalInfoLinkSection(){
    return(
        <Card>
          <Card.Body>
            Looking to edit your Profile Information? {''} 
            <Link to= {'/vet-settings/personal-information'}>
                <Button variant="primary" className="btn btn-primary p-1">
                    <p>Edit Personal Information</p>
                </Button>
          </Link>
          </Card.Body>
        </Card>
      )
};