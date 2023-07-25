import { NextPageContext } from "next"
import axios, { AxiosResponse } from "axios"
import CONFIG from '../conf';


const instance = axios.create({
  baseURL: CONFIG.SITEDK_DOMAIN_SERVER_HOST + "/api",
  timeout: 10000,
  // headers: {
  //   "Content-Type": "application/json;charset=utf-8"
  // }
})
// Add a request interceptor
instance.interceptors.request.use(function (config) {
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response: AxiosResponse) {
  // console.log(response)
  if (response && response.data && (response.data.status === 0 || response.data.status === 1)) {
    // const res = 
    return response.data
  }

  return Promise.reject(response?.data || {})
}, function (error) {

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(String(error));
});

export const getApplyList = (params: { page: number, pageSize: number }) => {
  return instance.get('/apply/list', { params })
}

export default instance