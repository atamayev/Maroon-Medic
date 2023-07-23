import _ from "lodash"

export function shouldSaveDescription(savedDescriptionData, description) {
  if (_.isEmpty(savedDescriptionData) && _.isEmpty(description)) return false
  if (!savedDescriptionData || _.isEmpty(savedDescriptionData)) return !_.isEmpty(description)
  return description !== savedDescriptionData
}
