import { Card } from "react-bootstrap";

export default function RenderDescriptionSection(props) {
    const { description } = props;
    if (description) return <> {RenderDescription(description)} </>
}

function RenderDescription(Description) {
    return(
        <>
            <Card className = "card-bottom-margin"> 
                <Card.Header>
                    Description
                </Card.Header>
                <Card.Body>
                    {Description}
                </Card.Body>
            </Card>
        </>
    )
};
