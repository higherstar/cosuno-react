// Dependencies
import axios, { AxiosRequestConfig, Method } from 'axios';

// Constants
import { API_SERVER } from '../constants';

// Create http from axios
const http = axios.create({ baseURL: `${API_SERVER}/api` });

// Create request
const request = (method: Method, url: string, options: AxiosRequestConfig) =>
  http
    .request({
      ...options,
      method,
      url
    })
    .then(httpResponseHandler)
    .catch(httpErrorHandler);

// Http responsive handler
const httpResponseHandler = (response: any) => {
  return response.data;
};

// Http error handler
const httpErrorHandler = (err: any) => {
  const response = err?.response;
  if (response?.status === 401) {
    // eslint-disable-next-line no-throw-literal
    throw {
      msg: 'Unauthorized'
    };
  }

  const data = response?.data;
  // eslint-disable-next-line no-throw-literal
  throw {
    msg: data?.msg || 'Network Error!'
  };
};

// Create http
const Http = {
  get(url: string, params: any = {}, headers: any = {}) {
    return request('GET', url, { params, headers });
  },
  post(url: string, body: any = {}, headers: any = {}) {
    return request('POST', url, { data: body, headers });
  },
  put(url: string, body: any = {}, headers: any = {}) {
    return request('PUT', url, { data: body, headers });
  },
  patch(url: string, body: any = {}, headers: any = {}) {
    return request('PATCH', url, { data: body, headers });
  },
  delete(url: string, body: any = {}, headers: any = {}) {
    return request('DELETE', url, { data: body, headers });
  }
};

// Export http
export default Http;
