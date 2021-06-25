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
}

export interface IAccessToken {
  accessToken: string
}
