import _ from "lodash"

export function shouldSaveServices(savedServiceKeys, serviceKeys) {
  if (_.isEmpty(savedServiceKeys) && _.isEmpty(serviceKeys)) return false
  if (_.isEmpty(savedServiceKeys) || _.isEmpty(savedServiceKeys)) return !_.isEmpty(serviceKeys)
  return !_.isEqual(savedServiceKeys.sort(), serviceKeys.sort())
}

export function shouldSaveDescription(savedDescriptionData, description) {
  if (_.isEmpty(savedDescriptionData) && _.isEmpty(description)) return false
  if (!savedDescriptionData || _.isEmpty(savedDescriptionData)) return !_.isEmpty(description)
  return description !== savedDescriptionData
}

export function shouldSaveLocation(savedLocationData, addresses, newAddresses, savedAddresses, newTimes, savedTimes) {
  if (_.isEmpty(savedLocationData) && _.isEmpty(addresses)) return false
  if (!savedLocationData || _.isEmpty(savedLocationData)) return !_.isEmpty(addresses)
  return !_.isEqual(newAddresses, savedAddresses) || !_.isEqual(newTimes, savedTimes)
}
