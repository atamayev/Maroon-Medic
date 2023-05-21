import React from "react";
import { Card, Button} from "react-bootstrap";
import { handleCategoryChange } from "../../../Custom Hooks/Hooks for Doctor Account Details/select";
import { handleToggleCategory } from "../../../Custom Hooks/Hooks for Doctor Account Details/select";
import { handleServiceChange } from "../../../Custom Hooks/Hooks for Doctor Account Details/select";
import { saveServices } from "../../../Custom Hooks/Hooks for Doctor Account Details/save";

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
  // console.log('selectedServices',selectedServices)
  const categories = {};
  if (props.listDetails[2]) {
    props.listDetails[2].forEach(service => {
      if (!categories[service.Category_name]) {
        categories[service.Category_name] = [];
      }
      categories[service.Category_name].push(service);
    });
  }

  if (Array.from(new Set(props.listDetails[2]?.map((item) => item.Category_name))).length) {
    return (
      <>
        {Object.entries(categories).map(([category, services]) => (
          <div key={category} style={{ marginBottom: '10px' }}>
            <input
              type="checkbox"
              id={category}
              name="category"
              checked={props.selectedCategories.includes(category)}
              onChange={event => handleCategoryChange(event, category, services, props.selectedCategories, props.setSelectedCategories, props.selectedServices, props.setSelectedServices, props.expandedCategories, props.setExpandedCategories)}
            />
            <label htmlFor={category}>{category}</label>
            {services.length > 1 && (
              <Button onClick={() => handleToggleCategory(category, props.setExpandedCategories)}>Toggle</Button>
            )}
            {(services.length <= 1 || props.expandedCategories.includes(category)) && (
              <div>
                {services.map(service => (
                  <div key={service.service_and_category_listID} style={{ paddingLeft: '20px' }}>
                    <input
                      type="checkbox"
                      id={`${category}-${service.service_and_category_listID}`}
                      name="service"
                      checked={props.selectedServices.find(s => s.service_and_category_listID === service.service_and_category_listID) !== undefined}
                      onChange={event => handleServiceChange(event, service, props.selectedServices, props.setSelectedServices)}
                    />
                    <label htmlFor={`${category}-${service.service_and_category_listID}`}>{service.Service_name}</label>
                    {props.selectedServices.find(s => s.service_and_category_listID === service.service_and_category_listID) && (
                      <>
                        <input
                          type="number"
                          placeholder="Service Time"
                          id={`time-${service.service_and_category_listID}`}
                          required
                        />
                        <input
                          type="number"
                          placeholder="Service Price"
                          id={`price-${service.service_and_category_listID}`}
                        />
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <Button 
          variant="success" 
          onClick={() => saveServices(props.selectedServices, props.setShowSavedServicesMessage, props.setShowSameServicesMessage, props.setShowSaveServicesProblemMessage)}
          >
            Save</Button>
        <span className={`fade ${props.showSavedServicesMessage ? 'show' : ''}`}>Services saved!</span>
        <span className={`fade ${props.showSameServicesMessage ? 'show' : ''}`}>Same Services!</span>
        <span className={`fade ${props.showSaveServicesProblemMessage ? 'show' : ''}`}>Problem Saving Services!</span>
      </>
    )
  }
};
