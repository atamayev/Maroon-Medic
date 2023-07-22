import { getUpdatedAddressRecords, getUnchangedAddressRecords } from "./address-operations.js"

export default new class SaveDoctorDataOperations {
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

    const returnedData = unchangedData //initialize the data to return with the data that hasn"t changed.

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
