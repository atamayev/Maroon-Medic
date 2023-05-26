import React from "react";

export default function RenderPersonalInfoSection(props){
    if(props.personalData || props.description){
        return(
            <>
                <h3> 
                    {RenderPersonalInfo(props.personalData)}
                </h3>
            </>
        )
    }
}

function RenderPersonalInfo(props){
    if(Object.keys(props).length){
        const capitalizedFirstName = props.FirstName.charAt(0).toUpperCase() + props.FirstName.slice(1);
        const capitalizedLastName = props.LastName.charAt(0).toUpperCase() + props.LastName.slice(1);
        return(
            <>
                Dr. {''} {capitalizedFirstName} {''} {capitalizedLastName}
            </>
        )
    }
};
