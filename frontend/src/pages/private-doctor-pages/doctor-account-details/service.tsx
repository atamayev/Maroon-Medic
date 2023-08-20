import _ from "lodash"
import { useEffect, useState } from "react"
import { Card, Button } from "react-bootstrap"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import { handleToggleCategory } from "../../../custom-hooks/account-details-hooks/select"
import { addServices, deleteServices, updateServices } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details"
import { handleNumericInput, preventNonNumericalInput, validateDropInput, validatePasteInput } from "../../../utils/input-validation"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"

interface Props {
  listDetails: DoctorListDetails
  providedServices: ServiceItem[]
  setProvidedServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>
  expandedCategories: string[]
  setExpandedCategories: React.Dispatch<React.SetStateAction<string[]>>
}

export default function RenderServiceSection (props: Props) {
  return (
    <Card className = "mb-3">
      <Card.Header>
        Vet Services
      </Card.Header>
      <Card.Body>
        <RenderIsVetServices {...props} />
      </Card.Body>
    </Card>
  )
}

function RenderIsVetServices (props: Props) {
  const [servicesConfirmation, setServicesConfirmation] = useConfirmationMessage()
  const { listDetails, providedServices, setProvidedServices, expandedCategories, setExpandedCategories } = props
  const [selectedServices, setSelectedServices] = useState<ServiceItem[]>([])

  useEffect(() => {
    //Initialize selectedServices to providedServices
    if (providedServices) {
      setSelectedServices(providedServices)
    }
  }, [providedServices])

  type CategoriesType = {
    [key: string]: ServiceListItem[]
  }

  const categories: CategoriesType = {}

  if (listDetails.servicesAndCategories) {
    listDetails.servicesAndCategories.forEach(service => {
      if (!categories[service.Category_name]) categories[service.Category_name] = []
      categories[service.Category_name].push(service)
    })
  }

  const timeOptions = [
    ...Array.from({ length: 11 }, (x, i) => ((i + 1) * 5) + " minutes"),
    "1 hour",
    "2 hours",
    "3 hours",
    "4 hours",
    "1 day",
    "2 days",
    "3 days",
  ]

  if (_.isEmpty(_.uniq(listDetails.servicesAndCategories.map((item) => item.Category_name)))) return <>Loading...</>

  const RenderIsSelectedService = (
    {service, selectedService} : {service: ServiceListItem, selectedService: ServiceItem | undefined}
  ) => {
    if (!selectedService) return null
    return (
      <>
        <RenderServiceTimeInput service = {service} selectedService = {selectedService} />
        <RenderServicePriceInput service = {service} selectedService = {selectedService} />
      </>
    )
  }

  const RenderServices = ({category, services} : {category: string, services: ServiceListItem[]}) => {
    if (!(services.length <= 1 || expandedCategories.includes(category))) return null

    return (
      <div>
        {services.map(service => {
          const selectedService = selectedServices.find(s => s.service_and_category_listID === service.service_and_category_listID)
          return (
            <div key = {service.service_and_category_listID} style = {{ paddingLeft: "20px" }}>
              <RenderServiceCheckbox service = {service} category = {category} />
              <RenderIsSelectedService service = {service} selectedService = {selectedService} />
            </div>
          )
        })}
      </div>
    )
  }

  const RenderServiceCheckbox = ({service, category} : {service: ServiceListItem, category: string}) => {
    return (
      <>
        <RenderActionButton service = {service} />
        <input
          type = "checkbox"
          id = {`${category}-${service.service_and_category_listID}`}
          name = "service"
          value = {service.service_and_category_listID}
          checked = {
            selectedServices.find((provided) => provided.service_and_category_listID === service.service_and_category_listID) !== undefined
          }
          onChange = {(event) => {
            if (event.target.checked) {
              setSelectedServices([...selectedServices, {...service, Service_price: -1, Service_time: ""}])
            }
            else {
              setSelectedServices(
                selectedServices.filter(servicef => servicef.service_and_category_listID !== service.service_and_category_listID)
              )
            }
          }}
        />
        <label htmlFor = {`${category}-${service.service_and_category_listID}`}>{service.Service_name}</label>
      </>
    )
  }

  const RenderActionButton = ({service} : {service: ServiceListItem}) => {
    const selectedService = selectedServices.find(s => s.service_and_category_listID === service.service_and_category_listID)
    const providedService = providedServices.find(s => s.service_and_category_listID === service.service_and_category_listID)

    const isSelected = selectedService !== undefined
    const isProvided = providedService !== undefined

    // check if service time and price are filled
    const isFilled = isSelected && selectedService.Service_time && selectedService.Service_price

    if (isSelected && isFilled) {
      if (isProvided) {
        if (providedService.Service_time === selectedService.Service_time &&
            providedService.Service_price === selectedService.Service_price) {
          return (
            <Button variant = "danger"
              onClick = {() => deleteServices(
                selectedService,
                providedServices,
                setProvidedServices,
                setServicesConfirmation,
                setSelectedServices
              )}
            >
              Delete
            </Button>
          )
        } else {
          return (
            <Button variant = "secondary"
              onClick = {() => updateServices(selectedService, providedServices, setProvidedServices, setServicesConfirmation)}
            >
              Update
            </Button>
          )
        }
      } else {
        return (
          <Button variant = "success"
            onClick = {() => addServices(selectedService, providedServices, setProvidedServices, setServicesConfirmation)}
          >
            Add
          </Button>
        )
      }
    }

    return null
  }

  const RenderServiceTimeInput = ({service, selectedService} : {service: ServiceListItem, selectedService: ServiceItem}) => {
    return (
      <select
        id = {`time-${service.service_and_category_listID}`}
        required
        value = {selectedService.Service_time || ""}
        onChange = {(e) => {
          const updatedServices = selectedServices.map((s) => {
            if (s.service_and_category_listID === service.service_and_category_listID) {
              return { ...s, Service_time: e.target.value }
            }
            return s
          })
          setSelectedServices(updatedServices)
        }}
      >
        <option value = "" disabled>
          Service Time
        </option>
        {timeOptions.map((time) => (
          <option key = {time} value = {time}>
            {time}
          </option>
        ))}
      </select>
    )
  }

  const RenderServicePriceInput = ({service, selectedService} : {service: ServiceListItem, selectedService: ServiceItem}) => {
    return (
      <input
        type = "text"
        placeholder = "Service Price ($)"
        id = {`price-${service.service_and_category_listID}`}
        required
        value = {selectedService.Service_price.toString() || ""}
        onChange = {(e) => handleNumericInput(
          e,
          (newVal) => {
            const updatedServices = selectedServices.map(s => {
              if (s.service_and_category_listID === service.service_and_category_listID) {
                return {...s, Service_price: parseFloat(newVal)}
              }
              return s
            })
            setSelectedServices(updatedServices)
          }
        )}
        onKeyUp = {preventNonNumericalInput}
        onPaste = {validatePasteInput}
        onDrop = {validateDropInput}
      />
    )
  }

  const RenderToggleCategory = ({category, services} : {category: string, services: ServiceListItem[]}) => {
    if (services.length <= 1) return null

    const isOpen = expandedCategories.includes(category)
    const RenderIsOpen = () => {
      if (isOpen) return <>^</>
      return <>v</>
    }

    return (
      <Button onClick = {() => handleToggleCategory(category, setExpandedCategories)}>
        <RenderIsOpen />
      </Button>
    )
  }

  return (
    <>
      {Object.entries(categories).map(([category, services]) => (
        <div key = {category} style = {{ marginBottom: "10px" }}>
          <label htmlFor = {category}>{category}</label>
          <RenderToggleCategory category = {category} services = {services} />
          <RenderServices category = {category} services = {services} />
        </div>
      ))}

      <SavedConfirmationMessage
        confirmationMessage = {servicesConfirmation}
        whatIsBeingSaved = "Services"
      />
    </>
  )
}
