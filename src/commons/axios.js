import _axios from "axios";

const instance = _axios.create({
  baseURL: "http://localhost:3004",
  timeout: 1000,
  headers: { "X-Custom-Header": "foobar" },
});

instance.interceptors.request.use((config) => {
  const jwtToken = global.auth.getToken();
  config.headers['Authorization'] = 'Bearer ' + jwtToken;
  return config;
},(error) => {
  // Do something with request error
  return Promise.reject(error);
});

export default instance;