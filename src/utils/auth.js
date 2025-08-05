import { handleResponse } from '../utils/api';
import { baseUrl } from './api';

function checkToken() {
  const token = localStorage.getItem('jwt');
  return !!token;
}

function signUp({ name, imageUrl, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      avatar: imageUrl,
      email,
      password,
    }),
  }).then(handleResponse);
}

function signIn({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .then((data) => {
      console.log('Received token:', data.token); // 👈 Log the token
      localStorage.setItem('jwt', data.token); // 👈 Store it
      return data;
    });
}

function signOut() {
  localStorage.removeItem('jwt');
  return Promise.resolve();
}

function validateToken(token) {
  console.log('Validating token:', token);
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then(handleResponse);
}

function updateUser({ token, name, avatar }) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleResponse);
}

export { signIn, signOut, signUp, checkToken, validateToken, updateUser };
