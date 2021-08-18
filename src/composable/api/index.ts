import { AxiosResponse } from 'axios'

export const ADMIN_ACCESS_TOKEN = 'wh_access_token'
export const ADMIN_PROFILE = 'wh_profile'

export const checkResponseStatus = (res: AxiosResponse) => {
  if (res.status === 200 || res.status === 201) {
    return res.data
  }
  return null
}

export const isSuccess = (res: AxiosResponse) => {
  return res.status === 200 || res.status === 201
}
