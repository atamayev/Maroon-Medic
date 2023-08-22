import FormGroup from "../form-group"
import handleServiceChange from "src/helper-functions/public-doctor/booking-page/handle-service-change"

interface SelectServiceProps extends BaseBookingProps {
  providedServices: ServiceItem[]
}

const SelectService = (props: SelectServiceProps) => {
  const { providedServices, selectedPet, setSelectedService, setSelectedLocation, setSelectedDay, setSelectedTime } = props

  if (!selectedPet) return null

  return (
    <div className="col-md-6">
      <FormGroup
        as="select"
        id="serviceSelect"
        label="Select a service"
        onChange={(e) =>
          handleServiceChange(
            e,
            providedServices,
            setSelectedService,
            setSelectedLocation,
            setSelectedDay,
            setSelectedTime
          )}
      >
        <option>Select...</option>
        {providedServices.map((service, index) => (
          <option key={index} value={service.service_and_category_listID}>
            {service.Category_name} - {service.Service_name}
          </option>
        ))}
      </FormGroup>
    </div>
  )
}

export default SelectService
