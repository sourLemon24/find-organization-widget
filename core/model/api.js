export const fetchData = async (query, token) => {
  const url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Token " + token
    },
    body: JSON.stringify({ query })
  }

  const r = await fetch(url, options)
  return r && r.json()
}