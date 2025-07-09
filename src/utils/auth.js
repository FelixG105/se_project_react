import { handleResponse } from '../utils/api';
const baseUrl = 'http://localhost:3001';

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
      name: name,
      avatar: imageUrl,
      email: email,
      password: password,
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
  }).then(handleResponse);
}

function signOut() {
  localStorage.removeItem('jwt');
  return Promise.resolve();
}

function validateToken(token) {
  console.log('Validating token:', token);
  return fetch('http://localhost:3001/users/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Invalid token');
    }
    return res.json();
  });
}

function updateUser({ token, name, avatar }) {
  return fetch('http://localhost:3001/users/me', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, avatar }),
  }).then((res) => {
    if (!res.ok) {
      throw new Error('Invalid token');
    }
    return res.json();
  });
}

export { signIn, signOut, signUp, checkToken, validateToken, updateUser };
