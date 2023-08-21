import _ from "lodash"
import { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import useConfirmationMessage from "../../../custom-hooks/use-confirmation-message"
import SavedConfirmationMessage from "../../../components/saved-confirmation-message"
import ServiceList from "src/components/doctor-account-details/service/service-list"

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

  if (_.isEmpty(_.uniq(listDetails.servicesAndCategories.map((item) => item.Category_name)))) return <>Loading...</>

  return (
    <>
      <ServiceList
        categories = {categories}
        expandedCategories = {expandedCategories}
        setExpandedCategories = {setExpandedCategories}
        selectedServices = {selectedServices}
        setSelectedServices = {setSelectedServices}
        providedServices = {providedServices}
        setProvidedServices = {setProvidedServices}
        setServicesConfirmation = {setServicesConfirmation}
      />

      <SavedConfirmationMessage
        confirmationMessage = {servicesConfirmation}
        whatIsBeingSaved = "Services"
      />
    </>
  )
}
