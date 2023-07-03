import _ from "lodash"
import { Card, Button } from "react-bootstrap";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { handleToggleCategory } from "../../../custom-hooks/account-details-hooks/select";
import { saveServices } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details";
import { handleNumericInput, preventNonNumericalInput, validateDropInput, validatePasteInput } from "../../../utils/input-validation";

export default function RenderServiceSection (props) {
  return(
    <Card className = "mb-3">
      <Card.Header>
        Vet Services
      </Card.Header>
      <Card.Body>
        {RenderIsVetServices(props)}
      </Card.Body>
    </Card>
  );
};

function RenderIsVetServices (props) {
  const [servicesConfirmation, setServicesConfirmation] = useConfirmationMessage();
  const { listDetails, providedServices, setProvidedServices, expandedCategories, setExpandedCategories } = props;

  const categories = {};
  if (listDetails.servicesAndCategories) {
    listDetails.servicesAndCategories.forEach(service => {
      if (!categories[service.Category_name]) categories[service.Category_name] = [];
      categories[service.Category_name].push(service);
    });
  }

  const timeOptions = [
    ...Array.from({ length: 11 }, (_, i) => (i + 1) * 5),
    '1 hour',
    '2 hours',
    '3 hours',
    '4 hours',
    '1 day',
    '2 days',
    '3 days',
  ];

  const areAllTimesSet = (services) => {
    return services.every(service => service.Service_time !== null && service.Service_time !== "");
  }

  const areAllPricesSet = (services) => {
    return services.every(service => service.Service_price !== null && service.Service_price !== "");
  }
  
  if (_.isEmpty(_.uniq(listDetails.servicesAndCategories?.map((item) => item.Category_name)))) return <>Loading...</>

  const renderIsSelectedService = (service, selectedService) => {
    if (!selectedService) return null
    return (
      <>
        {renderServiceTimeInput(service, selectedService)}
        {renderServicePriceInput(service, selectedService)}
      </>
    )
  }

  const renderServices = (category, services) => {
    if (!(services.length <= 1 || expandedCategories.includes(category))) return null

    return (
      <div>
        {services.map(service => {
          const selectedService = providedServices.find(s => s.service_and_category_listID === service.service_and_category_listID);
          return (
            <div key = {service.service_and_category_listID} style = {{ paddingLeft: '20px' }}>
              {renderServiceCheckbox(service, category)}
              {renderIsSelectedService(service, selectedService)}
            </div>
          )
        })}
      </div>
    )
  }

  const renderServiceCheckbox = (service, category) => {
    return (
      <>
        <input
          type = "checkbox"
          id = {`${category}-${service?.service_and_category_listID}`}
          name = "service"
          value = {service?.service_and_category_listID}
          checked = {providedServices.find((provided) => provided.service_and_category_listID === service.service_and_category_listID) !== undefined}
          onChange = {(event) => {
            if (event.target.checked) setProvidedServices([...providedServices, {...service, Service_price: null, Service_time: null}])
            else setProvidedServices(providedServices.filter(servicef => servicef.service_and_category_listID !== service.service_and_category_listID))
          }}
        />
        <label htmlFor = {`${category}-${service.service_and_category_listID}`}>{service.Service_name}</label>
      </>
    )
  }

  const renderServiceTimeInput = (service, selectedService) => {
    return (
      <select
        id = {`time-${service.service_and_category_listID}`}
        required
        value = {selectedService?.Service_time || ""}
        onChange = {(e) => {
          const updatedServices = providedServices.map((s) => {
            if (s.service_and_category_listID === service.service_and_category_listID) {
              return { ...s, Service_time: e.target.value };
            }
            return s;
          });
          setProvidedServices(updatedServices);
        }}
      >
        <option value = "" disabled>
          Service Time (mins)
        </option>
        {timeOptions.map((time) => (
          <option key = {time} value = {time}>
            {time}
          </option>
        ))}
      </select>
    );
  }

  const renderServicePriceInput = (service, selectedService) => {
    return (
      <input
        type = "text"
        placeholder = "Service Price ($)"
        id = {`price-${service.service_and_category_listID}`}
        required
        value = {selectedService?.Service_price || ""}
        onChange = {(e) => handleNumericInput(
          e,
          (newVal) => {
            const updatedServices = providedServices.map(s => {
              if (s.service_and_category_listID === service.service_and_category_listID) {
                return {...s, Service_price: newVal};
              }
              return s;
            });
            setProvidedServices(updatedServices);
          }
        )}
        onKeyUp = {preventNonNumericalInput}
        onPaste = {validatePasteInput}
        onDrop = {validateDropInput}
      />
    );
  };

  const renderSaveButton = () => {
    return (
      <Button 
        variant = "success" 
        disabled = {!areAllTimesSet(providedServices) || !areAllPricesSet(providedServices)}
        onClick = {() => saveServices(providedServices, setServicesConfirmation)}
      >
        Save
      </Button>
    )
  }

  const renderMessageSection = () => {
    return (
      <span className = {`fade ${servicesConfirmation.messageType ? 'show' : ''}`}>
        {servicesConfirmation.messageType === 'saved' && 'Services saved!'}
        {servicesConfirmation.messageType === 'same' && 'Same Service data!'}
        {servicesConfirmation.messageType === 'problem' && 'Problem Saving Services!'}
        {servicesConfirmation.messageType === 'none' && 'No services selected'}
      </span>
    )
  }

  const renderToggleCategory = (category, services) => {
    if (services.length <= 1) return null
    return <Button onClick = {() => handleToggleCategory(category, setExpandedCategories)}>Toggle</Button>
  }

  return (
    <>
      {Object.entries(categories).map(([category, services]) => (
        <div key = {category} style = {{ marginBottom: '10px' }}>
          <label htmlFor = {category}>{category}</label>
          {renderToggleCategory(category, services)}
          {renderServices(category, services)}
        </div>
      ))}

      {renderSaveButton()}

      {renderMessageSection()}
    </>
  )
};
