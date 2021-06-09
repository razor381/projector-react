
export function getApiCall(url) {
  return fetch(url)
    .then((res) => res.json())
    .then(({ data }) => data);
}

export function postApiCall(url, payload) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })
    .then((res) => console.log(res));
}
