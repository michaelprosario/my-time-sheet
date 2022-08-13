let urlParts = window.location.href.split('/');
let baseUrl = urlParts[0] + "//" + urlParts[2];

export const environment = {
  production: true,
  API_URL: baseUrl
};