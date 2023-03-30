import { fetchData } from "./api.js"

export const createModel = () => {
  return {
    store: null,
    async searchInput (value, token) {
      this.store = await fetchData(value, token)
    },
    organizationByIndex (index) {
      return this.store.suggestions[index]
    },
    getOrganizationValue (index) {
      return this.organizationByIndex(index).value
    },
    getShortName (index) {
      return this.organizationByIndex(index).data.name.short
    },
    getFullName (index) {
      return this.organizationByIndex(index).data.name.full
    },
    getInn (index) {
      return this.organizationByIndex(index).data.inn
    },
    getKpp (index) {
      return this.organizationByIndex(index).data.kpp
    },
    getAddress (index) {
      return this.organizationByIndex(index).data?.address?.value
    },
    getResponseSuggestionsLength () {
      return this.store?.suggestions?.length
    },
    getResponseMessage () {
      return this.store?.message
    },
    getResponseValues () {
      return this.store.suggestions.map(i => i.value)
    }
  }
}