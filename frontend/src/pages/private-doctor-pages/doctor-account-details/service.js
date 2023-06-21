import _ from "lodash"
import React from "react";
import { Card, Button} from "react-bootstrap";
import { useConfirmationMessage } from "../../../custom-hooks/use-confirmation-message";
import { handleToggleCategory } from "../../../custom-hooks/account-details-hooks/select";
import { saveServices } from "../../../custom-hooks/account-details-hooks/save-doctor-account-details";

export default function RenderServiceSection (props) {
  return(
    <Card className="mb-3">
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

  const categories = {};
  if (props.listDetails.servicesAndCategories) {
    props.listDetails.servicesAndCategories.forEach(service => {
      if (!categories[service.Category_name]) categories[service.Category_name] = [];
      categories[service.Category_name].push(service);
    });
  }
  const areAllTimesSet = (services) => {
    return services.every(service => service.Service_time !== null && service.Service_time !== "");
  }
  const areAllPricesSet = (services) => {
    return services.every(service => service.Service_price !== null && service.Service_price !== "");
  }
  
  if (_.isEmpty(_.uniq(props.listDetails.servicesAndCategories?.map((item) => item.Category_name)))) return <>Loading...</>

  const renderMessageSection = () => {
    return (
      <span className={`fade ${servicesConfirmation.messageType ? 'show' : ''}`}>
        {servicesConfirmation.messageType === 'saved' && 'Services saved!'}
        {servicesConfirmation.messageType === 'same' && 'Same Service data!'}
        {servicesConfirmation.messageType === 'problem' && 'Problem Saving Services!'}
        {servicesConfirmation.messageType === 'none' && 'No services selected'}
      </span>
    )
  }

  return (
    <>
      {Object.entries(categories).map(([category, services]) => (
        <div key={category} style={{ marginBottom: '10px' }}>
          <label htmlFor={category}>{category}</label>
          {services.length > 1 && (
            <Button onClick={() => handleToggleCategory(category, props.setExpandedCategories)}>Toggle</Button>
          )}
          {(services.length <= 1 || props.expandedCategories.includes(category)) && (
            <div>
              {services.map(service => {
                const selectedService = props.providedServices.find(s => s.service_and_category_listID === service.service_and_category_listID);
                return (
                  <div key={service.service_and_category_listID} style={{ paddingLeft: '20px' }}>
                    <input
                      type="checkbox"
                      id={`${category}-${service?.service_and_category_listID}`}
                      name="service"
                      value={service?.service_and_category_listID}
                      checked={props.providedServices.find((provided) => provided.service_and_category_listID === service.service_and_category_listID) !== undefined}
                      onChange={(event) => {
                        if (event.target.checked) props.setProvidedServices([...props.providedServices, {...service, Service_price: null, Service_time: null}])
                        else props.setProvidedServices(props.providedServices.filter(servicef => servicef.service_and_category_listID !== service.service_and_category_listID))
                      }}
                      />
                    <label htmlFor={`${category}-${service.service_and_category_listID}`}>{service.Service_name}</label>
                    {selectedService && (
                      <>
                        <input
                          type="number"
                          placeholder="Service Time (mins)"
                          id={`time-${service.service_and_category_listID}`}
                          required
                          value={selectedService?.Service_time || ""}
                          onChange={(event) => {
                            const updatedServices = props.providedServices.map(s => {
                              if (s.service_and_category_listID === service.service_and_category_listID) {
                                return {...s, Service_time: event.target.value};
                              }
                              return s;
                            });
                            props.setProvidedServices(updatedServices);
                          }}
                        />
                        <input
                          type="number"
                          placeholder="Service Price ($)"
                          id={`price-${service.service_and_category_listID}`}
                          required
                          value={selectedService?.Service_price || ""}
                          onChange={(event) => {
                            const updatedServices = props.providedServices.map(s => {
                              if (s.service_and_category_listID === service.service_and_category_listID) {
                                return {...s, Service_price: event.target.value};
                              }
                              return s;
                            });
                            props.setProvidedServices(updatedServices);
                          }}
                        />
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ))}
      <Button 
        variant="success" 
        disabled={!areAllTimesSet(props.providedServices) || !areAllPricesSet(props.providedServices)}
        onClick={() => saveServices(props.providedServices, setServicesConfirmation)}
      >
        Save
      </Button>
      {renderMessageSection()}
    </>
  )
};
