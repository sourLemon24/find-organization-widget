const FIELD_WIDTH = '320px'
const FIELD_MARGIN_BOTTOM = '10px'
const DEBOUNCE_TIME = 400

const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const fetchData = async (query, token) => {
  const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Token " + token
    },
    body: JSON.stringify({query: query})
  }

  const r = await fetch(url, options)
  return await r.json()
}

const searchHandler = async function (e, token) {
  const list = document.getElementById('suggestions-select')
  const organizationField = document.getElementById('organization-field')
  hideError()
  const response = await fetchData(e.target.value, token)
  if (response?.suggestions?.length) {
    displayListOptions(list, organizationField, response)
  } else {
    displayError(response.message)
    hideListOptions(list)
  }
  if (!e.target.value?.length) {
    hideListOptions(list)
    hideError()
  }
}

const debounceHandler = debounce((query, token) => searchHandler(query, token), DEBOUNCE_TIME)

class findOrganizationWidget extends HTMLElement {
  connectedCallback () {
    const token = this.getAttribute('token') || null

    document.body.prepend(
      ...createTextField({name: 'Компания или ИП', id: 'organization-field', searchHandler: (e) => debounceHandler(e, token)}),
      ...createTextField({name: 'Краткое наименование', id: 'short-name'}),
      ...createTextField({name: 'Полное наименование', id: 'full-name'}),
      ...createTextField({name: 'ИНН / КПП', id: 'inn-kpp'}),
      ...createTextField({name: 'Адрес', id: 'address'}),   
      createListElement(),
    )
    
    createErrorField()
  }
}
customElements.define("find-organization-widget", findOrganizationWidget)

const createTextField = ({name, id, searchHandler}) => {
  const label = document.createElement('label')
  label.for = id
  label.innerHTML = name
  label.style.display = 'block'

  const field = document.createElement('input')
  field.id = id
  field.type = searchHandler ? 'search' : 'text'
  field.placeholder = searchHandler ? 'Введите название организации' : ''
  field.readOnly = !searchHandler
  field.oninput = searchHandler
  field.style.display = 'block'
  field.style.marginBottom = FIELD_MARGIN_BOTTOM
  field.style.width = FIELD_WIDTH
  return [label, field] 
}

const createListElement = () => {
  const list = document.createElement('select')
  list.id = 'suggestions-select'
  list.style.width = FIELD_WIDTH
  list.style.marginTop = '-' + FIELD_MARGIN_BOTTOM
  list.style.position = 'absolute'
  list.style.display = 'none'
  return list
}

const fillTextFields = (clickedItem) => {
  const shortName = document.getElementById('short-name')
  const fullName = document.getElementById('full-name')
  const innKpp = document.getElementById('inn-kpp')
  const address = document.getElementById('address')
  shortName.value = clickedItem?.data?.name?.short || ''
  fullName.value = clickedItem?.data?.name?.full || ''
  innKpp.value = clickedItem ? `${clickedItem?.data?.inn} / ${clickedItem?.data?.kpp}` : ''
  address.value = clickedItem?.data?.address?.value || ''
}

const displayListOptions = (list, organizationField, response) => {
  list.size  = response.suggestions.length
  list.style.display = ''
  list.innerHTML = ''
  let options = []
  response.suggestions.forEach(i => {
    let option = document.createElement('option')
    option.innerHTML = i.value
    option.onclick = () => {
      organizationField.value = i.value
      fillTextFields(i)
      list.style.display = 'none'
    }
    options.push(option)
  })
  organizationField.after(list)
  list.prepend(...options)
}

const hideListOptions = (list) => {
  list.style.display = 'none'
  fillTextFields()
}

const createErrorField = () => {
  const errorField = document.createElement('span')
  errorField.id = 'error-field'
  errorField.style.color = 'red'
  errorField.style.display = 'none'
  errorField.style.maxWidth = FIELD_WIDTH
  document.body.append(errorField)
}

const displayError = (message) => {
  elem = document.getElementById('error-field')
  if(!message) message = 'Данные не найдены'
  elem.innerHTML = `Ошибка: ${message}`
  elem.style.display = 'block'
}

const hideError = () => {
  elem = document.getElementById('error-field')
  if (elem) elem.innerHTML = ''
}