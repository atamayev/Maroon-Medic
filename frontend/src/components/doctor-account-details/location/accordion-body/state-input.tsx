import FormGroup from "src/components/form-group"

interface Props {
  address: DoctorAddressData
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>, addressPriority: number) => void
}

const StateInput = ({address, handleInputChange}: Props) => {
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

export default StateInput
