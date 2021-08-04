import { InjectionKey, inject } from 'vue'
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios'

import Cookies from 'js-cookie'
import { ADMIN_ACCESS_TOKEN } from './api'

export const apiSymbol: InjectionKey<AxiosInstance> = Symbol()
export const apiBaseUrl =
  (import.meta.env.VITE_APP_ADMIN_BASE_URL as string) || 'http://localhost:3002'
const HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}
export interface ApiResponse<T = any> extends AxiosResponse {
  data: T
  error?: AxiosError
  code?: number
  message: any
}
export function initApi(): AxiosInstance {
  // Here we set the base URL for all requests made to the api
  const api = axios.create({
    baseURL: apiBaseUrl,
    headers: HEADERS,
  })

  // We set an interceptor for each request to
  // include Bearer token to the request if user is logged in
  api.interceptors.request.use(
    (config) => {
      const token = Cookies.get(ADMIN_ACCESS_TOKEN)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      return config
    },
    (error) => {
      console.error(error.response)
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
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
      return err
    }
  )

  return api
}

export default function useApi() {
  const api = inject<AxiosInstance>(apiSymbol)
  if (!api) {
    throw new Error('Api not properly injected in app')
  }
  return api
}
