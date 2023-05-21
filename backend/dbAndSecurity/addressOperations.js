export function getUpdatedRecords(newData, results) {
    const resultDataMap = new Map();
    let updatedRecords = [];
  
    // Create a map of the existing data for quick lookup
    for (const record of results) {
      resultDataMap.set(record.addresses_ID, record);
    }
  
    // Iterate over the new data
    for (const newRecord of newData) {
      const existingRecord = resultDataMap.get(newRecord.addresses_ID);
  
      // If an existing record was found, compare the fields
      if (existingRecord) {
        if (
          newRecord.address_title !== existingRecord.address_title ||
          newRecord.address_line_1 !== existingRecord.address_line_1 ||
          newRecord.address_line_2 !== existingRecord.address_line_2 ||
          newRecord.city !== existingRecord.city ||
          newRecord.state !== existingRecord.state ||
          newRecord.zip !== existingRecord.zip ||
          newRecord.country !== existingRecord.country ||
          newRecord.address_priority !== existingRecord.address_priority ||
          newRecord.phone !== existingRecord.phone ||
          newRecord.phone_priority !== existingRecord.phone_priority
        ) {
          // If there are changes, add newRecord to updatedRecords array
          updatedRecords.push(newRecord);
        }
      } 
      // else {
      //   // If there's no matching record in the existing data, consider newRecord as an updated record
      //   updatedRecords.push(newRecord);
      // }
    }
 
    // Return array of updated records
    return updatedRecords;
};
  
export function getUnchangedRecords(newData, results) {
  const resultDataMap = new Map();
  let unchangedData = [];

  // Create a map of the existing data for quick lookup
  for (const record of results) {
    resultDataMap.set(record.addresses_ID, record);
  }

  // Iterate over the new data
  for (const newRecord of newData) {
    const existingRecord = resultDataMap.get(newRecord.addresses_ID);

    // If an existing record was found, compare the fields
    if (existingRecord) {
      if (
        newRecord.address_title === existingRecord.address_title &&
        newRecord.address_line_1 === existingRecord.address_line_1 &&
        newRecord.address_line_2 === existingRecord.address_line_2 &&
        newRecord.city === existingRecord.city &&
        newRecord.state === existingRecord.state &&
        newRecord.zip === existingRecord.zip &&
        newRecord.country === existingRecord.country &&
        newRecord.address_priority === existingRecord.address_priority &&
        newRecord.phone === existingRecord.phone &&
        newRecord.phone_priority === existingRecord.phone_priority
      ) {
        // If there are no changes, add newRecord to unchangedData array
        unchangedData.push(newRecord);
      }
    }
  }

  // Return array of unchanged records
  return unchangedData;
};
