import _ from "lodash"

export default function RenderPersonalInfoSection(props) {
    const { personalData, description } = props;
    if (personalData || description) return <h3> {RenderPersonalInfo(personalData)} </h3>
}

function RenderPersonalInfo(props) {
    const {FirstName, LastName} = props
    if (!_.isEmpty(props)) {
        const capitalizedFirstName = FirstName.charAt(0).toUpperCase() + FirstName.slice(1);
        const capitalizedLastName = LastName.charAt(0).toUpperCase() + LastName.slice(1);
        return<> Dr. {""} {capitalizedFirstName} {""} {capitalizedLastName} </>
    }
};
