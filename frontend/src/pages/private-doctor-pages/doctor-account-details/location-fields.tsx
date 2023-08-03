import FormGroup from "../../../components/form-group"

interface Props {
  address: DoctorAddressDataType
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

export const RenderAddressTitleInput = ({address, handleInputChange}: Props) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "Address Title *"
        type = "text"
        placeholder = "Address Title"
        value = {address.address_title || ""}
        onChange = {(event) => handleInputChange(event, address.address_priority)}
        name = "address_title"
      />
    </div>
  )
}

export const RenderAddressLine1Input = ({address, handleInputChange}: Props) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "Address line 1 *"
        type = "text"
        placeholder = "Address line 1"
        value = {address.address_line_1 || ""}
        onChange = {(event) => handleInputChange(event, address.address_priority)}
        name = "address_line_1"
      />
    </div>
  )
}

export const RenderAddressLine2Input = ({address, handleInputChange}: Props) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "Address line 2"
        type = "text"
        placeholder = "Address line 2"
        value = {address.address_line_2 || ""}
        onChange = {(event) => handleInputChange(event, address.address_priority)}
        name = "address_line_2"
      />
    </div>
  )
}

export const RenderCityInput = ({address, handleInputChange}: Props) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "City *"
        type = "text"
        placeholder = "City"
        value = {address.city || ""}
        onChange = {(event) => handleInputChange(event, address.address_priority)}
        name = "city"
      />
    </div>
  )
}

export const RenderStateInput = ({address, handleInputChange}: Props) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "State *"
        type = "text"
        placeholder = "State"
        value = {address.state || ""}
        onChange = {(event) => handleInputChange(event, address.address_priority)}
        name = "state"
      />
    </div>
  )
}

export const RenderZipCodeInput = ({address, handleInputChange}: Props) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "Zip Code *"
        type = "number"
        placeholder = "Zip Code"
        value = {address.zip || ""}
        onChange = {(event) => handleInputChange(event, address.address_priority)}
        name = "zip"
      />
    </div>
  )
}

export const RenderCountryInput = ({address, handleInputChange}: Props) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "Country *"
        type = "text"
        placeholder = "Country"
        value = {address.country || ""}
        onChange = {(event) => handleInputChange(event, address.address_priority)}
        name = "country"
      />
    </div>
  )
}

export const RenderPhoneNumberInput = ({address, handleInputChange}: Props) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "Phone Number"
        type = "number"
        placeholder = "Phone Number"
        value = {address.Phone || ""}
        onChange = {(event) => handleInputChange(event, address.address_priority)}
        name = "phone"
      />
    </div>
  )
}

export const RenderLocationMapData = () => {
  return (
    <div className = "col-md-6">
      Google Maps Placeholder
    </div>
  )
}
