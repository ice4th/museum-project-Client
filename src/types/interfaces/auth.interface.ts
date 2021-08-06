import { AdminCountry } from '../enums/admin.enum'

export interface ILoginPayload {
  email: string
  password: string
}

export interface ICreateAdminUser {
  name: string
  email: string
  password: string
  firstname: string
  lastname: string
  phone: string
  dob: string
  teamId: number
  country: AdminCountry
}

export interface IAccessToken {
  accessToken: string
}
