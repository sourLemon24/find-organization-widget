import { scalePage, debounce } from "../helpers.js"
import { createSuggestionsListItem,
  setElements,
  createWidgetElement } from "./createElements.js"
import { createController } from "../controller/controller.js"

const DEBOUNCE_TIME = 400

export const createWidget = (token) => {

  scalePage()

  const controller = createController()

  const widget = createWidgetElement(token)

  const elements = setElements(widget)

  const debounceHandler = debounce((e, token) => searchHandler(e, token), DEBOUNCE_TIME)
  
  const displayListOptions = (response) => {
    const list = elements.suggestionsList
    const organizationField = elements.organizationField
    list.size  = controller.suggestionsLength()
    list.style.display = ''
    list.innerText = ''
    let listItems = []
    response.forEach((item, index) => {
      const listItem = createSuggestionsListItem()
      listItem.innerText = item
      listItem.addEventListener('click', () => {
        fillTextFields(index)
        hideListOptions()
      })
      listItems.push(listItem)
    })
    organizationField.after(list)
    list.prepend(...listItems)
  }
  
  const fillTextFields = (index) => {
    const organizationFieldEl = elements.organizationField
    const shortNameEl = elements.shortName
    const fullNameEl = elements.fullName
    const innKppEl = elements.innKpp
    const addressEl = elements.address
    if (index > -1) {
      organizationFieldEl.value = controller.orgainzationValue(index)
      shortNameEl.value = controller.shortName(index)
      fullNameEl.value = controller.fullName(index)
      innKppEl.value = `${controller.inn(index)} / ${controller.kpp(index) || ''}`
      addressEl.value = controller.address(index)
    } else {
      shortNameEl.value = ''
      fullNameEl.value = ''
      innKppEl.value = ''
      addressEl.value = ''
    }
  }
  
  const hideListOptions = () => {
    const list = elements.suggestionsList
    list.style.display = 'none'
  }
  
  const hideError = () => {
    const elem = elements.errorField
    if (elem) elem.innerText = ''
  }
  
  const displayError = (message) => {
    const elem = elements.errorField
    elem.innerText = `Ошибка: ${message}`
    elem.style.display = 'block'
  }
  
  const searchHandler = async function (e, token) {
    hideError()
    try {
      await controller.handleSearchInput(e.target.value, token)
    } catch {
      displayError('Ошибка сети')
      return false
    }
    const message = controller.responseMessage()
    if (controller.suggestionsLength()) {
      displayListOptions(controller.responseValues())
    } else if (message) {
      hideListOptions() 
      displayError(message)
    } else {
      fillTextFields()
      hideListOptions()
    }
  }

  addEventHandler(token, elements, searchHandler)
  
  return widget
}

const addEventHandler = (token, elements, searchHandler) => {
  const searchField = elements.organizationField
  searchField.addEventListener('input', (e) => {
    searchHandler(e, token)
  })
}