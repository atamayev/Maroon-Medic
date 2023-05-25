import React from "react";
import { Card, Button} from "react-bootstrap";
import { handleCategoryChange } from "../../../Custom Hooks/Hooks for Doctor Account Details/select";
import { handleToggleCategory } from "../../../Custom Hooks/Hooks for Doctor Account Details/select";
import { saveServices } from "../../../Custom Hooks/Hooks for Doctor Account Details/save";
import { handleAddService } from "../../../Custom Hooks/Hooks for Doctor Account Details/add";
import { handleDeleteService } from "../../../Custom Hooks/Hooks for Doctor Account Details/delete";

export default function RenderServiceSection (props){
    return(
        <Card>
        <Card.Header>
          Vet Services
        </Card.Header>
        <Card.Body>
          {renderIsVetServices(props)}
        </Card.Body>
      </Card>
    )
};

//Does not work as intended
function renderIsVetServices (props) {
  const categories = {};
  if (props.listDetails[2]) {
    props.listDetails[2].forEach(service => {
      if (!categories[service.Category_name]) {
        categories[service.Category_name] = [];
      }
      categories[service.Category_name].push(service);
    });
  }
  const areAllTimesSet = (services) => {
    return services.every(service => service.Service_time !== null && service.Service_time !== "");
  }
  
  if (Array.from(new Set(props.listDetails[2]?.map((item) => item.Category_name))).length) {
    return (
      <>
        {Object.entries(categories).map(([category, services]) => (
          <div key={category} style={{ marginBottom: '10px' }}>
            {/* <input
              type="checkbox"
              id={category}
              name="category"
              checked={props.selectedCategories.includes(category)}
              onChange={event => handleCategoryChange(event, category, services, props.selectedCategories, props.setSelectedCategories, props.providedServices, props.setProvidedServices, props.expandedCategories, props.setExpandedCategories)}
            /> */}
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
                          if(event.target.checked){
                            handleAddService(service, props.providedServices, props.setProvidedServices);
                          }else{
                            handleDeleteService(service, props.providedServices, props.setProvidedServices)
                          }
                        }}
                        />
                      <label htmlFor={`${category}-${service.service_and_category_listID}`}>{service.Service_name}</label>
                      {selectedService && (
                        <>
                          <input
                            type="number"
                            placeholder="Service Time (req)"
                            id={`time-${service.service_and_category_listID}`}
                            required
                            value={selectedService?.Service_time || ""}
                            onChange={(event) => {
                              const updatedServices = props.providedServices.map(s => {
                                if(s.service_and_category_listID === service.service_and_category_listID){
                                  return {...s, Service_time: event.target.value};
                                }
                                return s;
                              });
                              props.setProvidedServices(updatedServices);
                            }}
                          />
                          <input
                            type="number"
                            placeholder="Service Price (opt)"
                            id={`price-${service.service_and_category_listID}`}
                            value={selectedService?.Service_price || ""}
                            onChange={(event) => {
                              const updatedServices = props.providedServices.map(s => {
                                if(s.service_and_category_listID === service.service_and_category_listID){
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
          disabled={!areAllTimesSet(props.providedServices)}
          onClick={() => saveServices(props.providedServices, props.setShowSavedServicesMessage, props.setShowSameServicesMessage, props.setShowSaveServicesProblemMessage)}
        >
          Save
        </Button>
        <span className={`fade ${props.showSavedServicesMessage ? 'show' : ''}`}>Services saved!</span>
        <span className={`fade ${props.showSameServicesMessage ? 'show' : ''}`}>Same Services!</span>
        <span className={`fade ${props.showSaveServicesProblemMessage ? 'show' : ''}`}>Problem Saving Services!</span>
      </>
    )
  }else{
    return(
      <>
      Loading...
      </>
    )
  }
};
