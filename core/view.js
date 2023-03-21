import { scalePage, addStyles } from "./helpers.js"

export const createWidget = (textFieldOnInputHandler, token) => {
  scalePage()
  addStyles()
  const widget = document.createElement('div')
  widget.classList.add('widget-wrapper')
  widget.prepend(
    ...createTextField({name: 'Компания или ИП', id: 'organization-field', searchHandler: (e) => textFieldOnInputHandler(e, token)}),
    ...createTextField({name: 'Краткое наименование', id: 'short-name'}),
    ...createTextField({name: 'Полное наименование', id: 'full-name'}),
    ...createTextField({name: 'ИНН / КПП', id: 'inn-kpp'}),
    ...createTextField({name: 'Адрес', id: 'address'}),   
    createListElement()
  )
  createErrorField(widget)
  return widget
}

export const getViewElements = () => ({
  organizationField: document.getElementById('organization-field'),
  shortName: document.getElementById('short-name'),
  fullName: document.getElementById('full-name'),
  innKpp: document.getElementById('inn-kpp'),
  address: document.getElementById('address'),
  suggestionsList: document.getElementById('suggestions-list'),
  errorField: document.getElementById('error-field')
})

export const createSuggestionsListItem = () => {
  let listItem = document.createElement('li')
  listItem.classList.add('suggestions-list-item')
  return listItem
}

const createTextField = ({name, id, searchHandler}) => {
  const label = document.createElement('label')
  label.for = id
  label.innerHTML = name
  label.classList.add('text-field__label')

  const field = document.createElement('input')
  field.id = id
  field.type = searchHandler ? 'search' : 'text'
  field.placeholder = searchHandler ? 'Введите название организации' : ''
  field.readOnly = !searchHandler
  field.oninput = searchHandler
  field.classList.add('text-field__input')
  return [label, field] 
}

const createListElement = () => {
  const list = document.createElement('ul')
  list.id = 'suggestions-list'
  list.classList.add('suggestions-list')
  return list
}

const createErrorField = (widget) => {
  const errorField = document.createElement('span')
  errorField.id = 'error-field'
  errorField.classList.add('error-field')
  widget.append(errorField)
}