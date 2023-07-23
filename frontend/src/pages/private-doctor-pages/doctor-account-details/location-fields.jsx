import FormGroup from "../../../components/form-group"

export const renderAddressTitleInput = (address, handleInputChange ) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "Address Title *"
        type = "text"
        placeholder = "Address Title"
        value = {address.address_title || ""}
        onChange = {handleInputChange}
        name = "address_title"
      />
    </div>
  )
}

export const renderAddressLine1Input = (address, handleInputChange) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "Address line 1 *"
        type = "text"
        placeholder = "Address line 1"
        value = {address.address_line_1 || ""}
        onChange = {handleInputChange}
        name = "address_line_1"
      />
    </div>
  )
}

export const renderAddressLine2Input = (address, handleInputChange) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "Address line 2"
        type = "text"
        placeholder = "Address line 2"
        value = {address.address_line_2 || ""}
        onChange = {handleInputChange}
        name = "address_line_2"
      />
    </div>
  )
}

export const renderCityInput = (address, handleInputChange) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "City *"
        type = "text"
        placeholder = "City"
        value = {address.city || ""}
        onChange = {handleInputChange}
        name = "city"
      />
    </div>
  )
}

export const renderStateInput = (address, handleInputChange) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "State *"
        type = "text"
        placeholder = "State"
        value = {address.state || ""}
        onChange = {handleInputChange}
        name = "state"
      />
    </div>
  )
}

export const renderZipCodeInput = (address, handleInputChange) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "Zip Code *"
        type = "number"
        placeholder = "Zip Code"
        value = {address.zip || ""}
        onChange = {handleInputChange}
        name = "zip"
      />
    </div>
  )
}

export const renderCountryInput = (address, handleInputChange) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "Country *"
        type = "text"
        placeholder = "Country"
        value = {address.country || ""}
        onChange = {handleInputChange}
        name = "country"
      />
    </div>
  )
}

export const renderPhoneNumberInput = (address, handleInputChange) => {
  return (
    <div className = "col-md-3">
      <FormGroup
        className = "mb-3"
        label = "Phone Number"
        type = "number"
        placeholder = "Phone Number"
        value = {address.phone || ""}
        onChange = {handleInputChange}
        name = "phone"
      />
    </div>
  )
}

export const renderLocationMapData = () => {
  return (
    <div className = "col-md-6">
      Google Maps Placeholder
    </div>
  )
}
