import { addStyles } from "./styles.js"

export const createWidgetElement = () => {
  const widget = document.createElement('div')
  addStyles(widget)
  widget.classList.add('widget-wrapper')
  widget.prepend(
    ...createTextField({
      name: 'Компания или ИП',
      id: `organization-field`,
      searchType: true,
    }),
    ...createTextField({
      name: 'Краткое наименование',
      id: 'short-name'
    }),
    ...createTextField({
      name: 'Полное наименование',
      id: 'full-name'
    }),
    ...createTextField({
      name: 'ИНН / КПП',
      id: 'inn-kpp'
    }),
    ...createTextField({
      name: 'Адрес',
      id: 'address'
    }),
    createListElement()
  )
  createErrorField(widget)
  return widget
}

export const createSuggestionsListItem = () => {
  let listItem = document.createElement('li')
  listItem.classList.add('suggestions-list-item')
  return listItem
}

export const setElements = (widget) => {
  return {
    organizationField: widget.querySelector('#organization-field'),
    shortName: widget.querySelector('#short-name'),
    fullName: widget.querySelector('#full-name'),
    innKpp: widget.querySelector('#inn-kpp'),
    address: widget.querySelector('#address'),
    suggestionsList: widget.querySelector('#suggestions-list'),
    errorField: widget.querySelector('#error-field')
  }
}

const createTextField = ({
  name,
  id,
  searchType = false
}) => {
  const label = document.createElement('label')
  label.for = id
  label.innerText = name
  label.classList.add('text-field__label')

  const field = document.createElement('input')
  field.id = id
  field.type = 'text'
  field.readOnly = true
  if (searchType) {
    field.type = 'search'
    field.readOnly = false
    field.placeholder = 'Введите название организации'
  }
  field.classList.add('text-field__input')
  return [label, field] 
}

const createErrorField = (widget) => {
  const errorField = document.createElement('span')
  errorField.id = 'error-field'
  errorField.classList.add('error-field')
  widget.append(errorField)
}
  
const createListElement = () => {
  const list = document.createElement('ul')
  list.id = 'suggestions-list'
  list.classList.add('suggestions-list')
  return list
}