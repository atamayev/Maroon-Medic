import React from "react";
import { Card } from "react-bootstrap";

export default function RenderSpecialtiesSection(props) {
    if (props.doctorSpecialties.length) {
        return (
            <Card className="card-bottom-margin">
                <Card.Header>
                    Doctor Organizations and Specialites
                </Card.Header>
                <Card.Body>
                    {renderSpecialties(props)}
                </Card.Body>
            </Card>
        )
    }
}

function renderSpecialties(props) {
    const organizations = {};
    if (props.doctorSpecialties) {
      props.doctorSpecialties.forEach(specialty => {
        if (!organizations[specialty.Organization_name]) organizations[specialty.Organization_name] = [];
        organizations[specialty.Organization_name].push(specialty);
      });
    }
    return(
        <>
            {Object.entries(organizations).map(([organization, specialties]) => (
                <div key={organization} style={{ marginBottom: '10px' }}>
                    <h3>{organization}</h3>
                    {specialties.map(specialty => (
                        <p key={specialty.specialties_listID}>
                            {specialty.Specialty_name}
                        </p>
                    ))}
                </div>
            ))}
        </>
    )
}
