import _ from "lodash"
import { checkIfListsAreEqual, areArraysSame } from "../custom-hooks/lists-and-object-checks"

export function shouldSaveServices(savedServiceKeys, serviceKeys) {
  if (_.isEmpty(savedServiceKeys) && _.isEmpty(serviceKeys)) return false
  if (_.isEmpty(savedServiceKeys) || _.isEmpty(savedServiceKeys)) return !_.isEmpty(serviceKeys)
  return !checkIfListsAreEqual(savedServiceKeys, serviceKeys)
}

export function shouldSaveDescription(savedDescriptionData, description) {
  if (_.isEmpty(savedDescriptionData) && _.isEmpty(description)) return false
  if (!savedDescriptionData || _.isEmpty(savedDescriptionData)) return !_.isEmpty(description)
  return description !== savedDescriptionData
}

export function shouldSaveLocation(savedLocationData, addresses, newAddresses, savedAddresses, newTimes, savedTimes) {
  if (_.isEmpty(savedLocationData) && _.isEmpty(addresses)) return false
  if (!savedLocationData || _.isEmpty(savedLocationData)) return !_.isEmpty(addresses)
  return !areArraysSame(newAddresses, savedAddresses) || !areArraysSame(newTimes, savedTimes)
}
