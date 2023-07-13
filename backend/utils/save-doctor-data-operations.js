import { getUpdatedAddressRecords, getUnchangedAddressRecords } from "./address-operations.js"

export default new class SaveDoctorDataOperations {
  getServicesDataChanges(ServicesData, existingServicesIDs) {
    const newServicesData = ServicesData

    const resultIDs = new Set(existingServicesIDs.map(result => result.Service_and_Category_ID))//Extracts the Service_and_Category_ID from the DB results

    const addedData = newServicesData.filter(service => !resultIDs.has(service.service_and_category_listID))// Extracts the IDs that are in newServices that are not in resultsIDs

    const serviceIDs = new Set(newServicesData.map(service => service.service_and_category_listID))

    const deletedData = existingServicesIDs.filter(result => !serviceIDs.has(result.Service_and_Category_ID))//Checks for IDs that are in results, but not in ServicesData (these will be deleted)

    const updatedData = []

    ServicesData.forEach(service => {
      const matchingResult = existingServicesIDs.find(result => result.Service_and_Category_ID === service.service_and_category_listID)

      if (matchingResult) {
        if (matchingResult.Service_time !== service.Service_time || matchingResult.Service_price !== service.Service_price) updatedData.push(service)
      }
    })//Checks which results and ServicesData have the same IDs, but some other field has changed (ie. price, time). Adds those objects to updatedData

    return { addedData, deletedData, updatedData }
  }

  getAddressesDataChanges(AddressData, existingAddressesIDs) {
    const newData = AddressData
    // Check for changes in data:

    //Filter the newData, check if there are any objects whose addressesID is null. Null addressesID means the data is new
    const addedData = newData.filter(data => data.addressesID === 0)

    //Extracts just the IDs of the data that was in the DB, but is not in the new incoming Data
    const deletedData = existingAddressesIDs
      .filter(result => !newData.some(data => data.addressesID === result.addressesID))
      .map(result => result.addressesID)

    const updatedData = getUpdatedAddressRecords(newData, existingAddressesIDs)

    const unchangedData = getUnchangedAddressRecords(newData, existingAddressesIDs)

    let returnedData = unchangedData //initialize the data to return with the data that hasn"t changed.

    return { addedData, deletedData, updatedData, returnedData}
  }

  getTimeDataChanges(existingAvailbilityData, corespondingTimeData) {
    const oldDataDict = Object.fromEntries(existingAvailbilityData.map(item => [item.Day_of_week, item]))
    const newDataDict = Object.fromEntries(corespondingTimeData.map(item => [item.Day_of_week, item]))

    const addedTimeData = Object.values(newDataDict).filter(item => !(item.Day_of_week in oldDataDict))
    const deletedTimeData = Object.values(oldDataDict).filter(item => !(item.Day_of_week in newDataDict))
    const updatedTimeData = Object.values(newDataDict).filter(item => item.Day_of_week in oldDataDict && (item.Start_time !== oldDataDict[item.Day_of_week].Start_time || item.End_time !== oldDataDict[item.Day_of_week].End_time))

    return { addedTimeData, deletedTimeData, updatedTimeData }
  }
}()
