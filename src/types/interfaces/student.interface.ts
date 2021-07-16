import { StudentCountry, StudentLanguage } from '../enums/student.enum'
import { INameLang } from './common.interface'

export interface IStudentInfo {
  id: number
  email: string
  avatar: string
  gender: string
  firstname: INameLang
  lastname: INameLang
  nickname: INameLang
  dob: string
  devices: string[]
  country: StudentCountry
  language: StudentLanguage
  nationality: string
  industry: string
  occupation: string
  phone: string
  school: string
  timezone: string
}
