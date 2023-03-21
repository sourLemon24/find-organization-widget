
import { debounce } from "./helpers.js"
import { 
  displayError, 
  hideError,
  displayListOptions,
  fillTextFields,
  hideListOptions } from "./model.js";

const DEBOUNCE_TIME = 400

export const debounceHandler = debounce((e, token) => searchHandler(e, token), DEBOUNCE_TIME)

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
  hideError()
  const response = await fetchData(e.target.value, token)
  if (response?.suggestions?.length) {
    displayListOptions(response)
  } else if (response) {
    fillTextFields()
    hideListOptions()
    displayError(response.message)
  }
  if (!e.target.value?.length) {
    fillTextFields()
    hideListOptions()
    hideError()
  }
}