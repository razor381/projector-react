const baseHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export function get(url, additionalHeaders = {}) {
  const headers = {
    ...baseHeaders,
    ...additionalHeaders,
  };

  return fetch(url, {
    method: 'GET',
    headers,
  })
    .then((res) => res.json());
}

export function post(url, payload, additionalHeaders = {}) {
  const headers = {
    ...baseHeaders,
    ...additionalHeaders,
  };

  return fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

export function putCall(url, payload, additionalHeaders = {}) {
  const headers = {
    ...baseHeaders,
    ...additionalHeaders,
  };

  return fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

export function deleteCall(url, additionalHeaders = {}) {
  const headers = {
    ...additionalHeaders,
  };

  return fetch(url, {
    method: 'DELETE',
    headers,
  });
}
