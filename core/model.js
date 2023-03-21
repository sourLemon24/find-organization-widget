import { createSuggestionsListItem } from "./view.js"

let elements

export const setElements = (e) => {
  elements = e
}

export const fillTextFields = (clickedItem) => {
  const organizationField = elements.organizationField
  const shortName = elements.shortName
  const fullName = elements.fullName
  const innKpp = elements.innKpp
  const address = elements.address
  if (clickedItem) {
    organizationField.value = clickedItem.value
  }
  shortName.value = clickedItem?.data?.name?.short || ''
  fullName.value = clickedItem?.data?.name?.full || ''
  innKpp.value = clickedItem ? `${clickedItem?.data?.inn} / ${clickedItem?.data?.kpp || 'нет данных'}` : ''
  address.value = clickedItem?.data?.address?.value || ''
}
  
export const displayListOptions = (response) => {
  const list = elements.suggestionsList
  const organizationField = elements.organizationField
  list.size  = response.suggestions.length
  list.style.display = ''
  list.innerHTML = ''
  let listItems = []
  response.suggestions.forEach(i => {
    const listItem = createSuggestionsListItem()
    listItem.innerHTML = i.value
    listItem.addEventListener('click', () => {
      fillTextFields(i)
      hideListOptions()
    })
    listItems.push(listItem)
  })
  organizationField.after(list)
  list.prepend(...listItems)
}

export const hideListOptions = () => {
  const list = elements.suggestionsList
  list.style.display = 'none'
}

export const displayError = (message) => {
  const elem = elements.errorField
  if(!message) message = 'Данные не найдены'
  elem.innerHTML = `Ошибка: ${message}`
  elem.style.display = 'block'
}

export const hideError = () => {
  const elem = elements.errorField
  if (elem) elem.innerHTML = ''
}