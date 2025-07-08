const baseUrl = 'http://localhost:3001';

export function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function authHeaders(token, contentType = false) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  if (contentType) headers['Content-Type'] = 'application/json';
  return headers;
}

function getItems() {
  return fetch(`${baseUrl}/items`).then(handleResponse);
}

function postItems({ name, imageUrl, weather, token }) {
  return fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: authHeaders(token, true),
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleResponse);
}

function deleteItems({ _id, token }) {
  return fetch(`${baseUrl}/items/${_id}`, {
    method: 'DELETE',
    headers: authHeaders(token),
  }).then(handleResponse);
}

function addCardLike({ _id, token }) {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: 'PUT',
    headers: authHeaders(token),
  }).then(handleResponse);
}

function removeCardLike({ _id, token }) {
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: 'DELETE',
    headers: authHeaders(token),
  }).then(handleResponse);
}

export const api = {
  getItems,
  postItems,
  deleteItems,
  addCardLike,
  removeCardLike,
};
