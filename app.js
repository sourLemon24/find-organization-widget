const FIELD_WIDTH = '320px'
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

  let r
  try {
    r = await fetch(url, options)
  } catch {
    displayError('Ошибка сети')
  }
  return r && r.json()
}

const searchHandler = async function (e, token) {
  const list = document.getElementById('suggestions-list')
  const organizationField = document.getElementById('organization-field')
  hideError()
  const response = await fetchData(e.target.value, token)
  if (response?.suggestions?.length) {
    displayListOptions(list, organizationField, response)
  } else if (response) {
    fillTextFields()
    hideListOptions(list)
    displayError(response.message)
  }
  if (!e.target.value?.length) {
    fillTextFields()
    hideListOptions(list)
    hideError()
  }
}

const debounceHandler = debounce((query, token) => searchHandler(query, token), DEBOUNCE_TIME)

class findOrganizationWidget extends HTMLElement {
  connectedCallback () {
    const token = this.getAttribute('token') || null
    addStyles()
    scalePage()
    const widget = createWidget(token)
    document.body.prepend(widget)
    createErrorField(widget)
  }
}
customElements.define("find-organization-widget", findOrganizationWidget)

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
  let listItems = []
  response.suggestions.forEach(i => {
    let listItem = document.createElement('li')
    listItem.classList.add('suggestions-list-item')
    listItem.innerHTML = i.value
    listItem.addEventListener('click', () => {
      organizationField.value = i.value
      fillTextFields(i)
      hideListOptions(list)
    })
    listItems.push(listItem)
  })
  organizationField.after(list)
  list.prepend(...listItems)
}

const hideListOptions = (list) => {
  list.style.display = 'none'
}

const createErrorField = (widget) => {
  const errorField = document.createElement('span')
  errorField.id = 'error-field'
  errorField.classList.add('error-field')
  widget.append(errorField)
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

const scalePage = () => {
  const siteWidth = parseFloat(FIELD_WIDTH) * 1.25;
  const scale = screen.width /siteWidth
  const meta = document.createElement('meta')
  meta.name = 'viewport'
  meta.content = `width=1280, initial-scale=1`
  document.head.prepend(meta)
  document.querySelector('meta[name="viewport"]').setAttribute('content', 'width='+siteWidth+', initial-scale='+scale+'')
}

const addStyles = () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'styles.css'
  document.head.prepend(link)
}

const createWidget = (token) => {
  const widget = document.createElement('div')
  widget.classList.add('widget-wrapper')
  widget.prepend(
    ...createTextField({name: 'Компания или ИП', id: 'organization-field', searchHandler: (e) => debounceHandler(e, token)}),
    ...createTextField({name: 'Краткое наименование', id: 'short-name'}),
    ...createTextField({name: 'Полное наименование', id: 'full-name'}),
    ...createTextField({name: 'ИНН / КПП', id: 'inn-kpp'}),
    ...createTextField({name: 'Адрес', id: 'address'}),   
    createListElement()
  )
  return widget
}