export const API_URL = process.env.API_URL;

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const loginRequest = (user, password) => {
  const formData = new URLSearchParams();
  formData.append('identifier', user);
  formData.append('password', password);

  return fetch(`${API_URL}/auth/local`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: formData
  }).then(handleErrors)
    .then(response => response.json());
};
