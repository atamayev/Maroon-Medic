import React from "react";
import _ from "lodash"

export default function RenderPersonalInfoSection(props) {
    if (props.personalData || props.description) return <h3> {RenderPersonalInfo(props.personalData)} </h3>
}

function RenderPersonalInfo(props) {
    if (!_.isEmpty(props)) {
        const capitalizedFirstName = props.FirstName.charAt(0).toUpperCase() + props.FirstName.slice(1);
        const capitalizedLastName = props.LastName.charAt(0).toUpperCase() + props.LastName.slice(1);
        return<> Dr. {''} {capitalizedFirstName} {''} {capitalizedLastName} </>
    }
};
