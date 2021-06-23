import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface ApiServiceResponse<T = any> extends AxiosResponse {
  data: T
  error?: AxiosError
  message?: any
  code?: number
}
// const BASE_URL = process.env.ADMIN_BASE_URL || 'http://localhost:3002'
const BASE_URL =
  (import.meta.env.VITE_APP_ADMIN_BASE_URL as string) || 'http://localhost:3002'
const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}

axios.defaults.baseURL = BASE_URL
axios.defaults.headers.common = HEADERS

axios.interceptors.request.use(
  async (config) => {
    // const token = getToken()
    // config.headers.Authorization = token
    return config
  },
  (error) => {
    console.error(error.response)
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (res) => {
    return { ...res, data: res.data?.data }
  },
  (error) => {
    const response = error.response.data
    const code = response?.statusCode
    const message = response?.message
    const err = {
      error,
      message,
      code,
    }
    console.error(err)
    return err
    // return error;
  }
)

export default class ApiService {
  public static get<T = any>(url: string, config?: AxiosRequestConfig) {
    return axios.get<T>(url, config)
  }

  public static post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    return axios.post<T>(url, data, config)
  }

  public static put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    return axios.put<T>(url, data, config)
  }

  public static patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    return axios.patch<T>(url, data, config)
  }

  public static delete<T = any>(url: string, config?: AxiosRequestConfig) {
    return axios.delete<T>(url, config)
  }
}
