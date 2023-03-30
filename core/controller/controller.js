import { createModel } from "../model/model.js"

export const createController = () => {
  const model = createModel()

  return {
    async handleSearchInput (value, token) {
      await model.searchInput(value, token)
    },
    suggestionsLength () {
      return model.getResponseSuggestionsLength()
    },
    responseMessage () {
      return model.getResponseMessage()
    },
    responseValues () {
      return model.getResponseValues()
    },
    orgainzationValue (index) {
      return model.getOrganizationValue(index)
    },
    shortName (index) {
      return model.getShortName(index)
    },
    fullName (index) {
      return model.getFullName(index)
    },
    inn (index) {
      return model.getInn(index)
    },
    kpp (index) {
      return model.getKpp(index)
    },
    address (index) {
      return model.getAddress(index)
    },
  }
}