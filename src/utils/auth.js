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
      imageUrl: imageUrl,
      email: email,
      password: password,
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function signIn({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function signOut() {
  return fetch(`${baseUrl}/signout`, {
    method: 'POST',
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function validateToken(token) {
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

export { signIn, signOut, signUp, checkToken, validateToken };
