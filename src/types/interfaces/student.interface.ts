import {
  StudentCountry,
  StudentGender,
  StudentLanguage,
  StudentPersonalTitle,
} from '../enums/student.enum'
import { INameLang } from './common.interface'
import { IPackageInfo } from './package.interface'

export interface IStudentInfo {
  id: number
  email: string
  avatar: string
  gender: string
  firstname: INameLang
  lastname: INameLang
  nickname: INameLang
  dob: string
  device: string[]
  country: StudentCountry
  language: StudentLanguage
  nationality: string
  industry: string
  occupation: string
  phone: string
  school: string
  timezone: string
}

export interface IStudentNote {
  id: number
  studentId: number
  nameEn?: string
  exPronounce?: string
  exGrammar?: string
  exHomework?: string
  device: string[]
  occupation?: string
  subOccupation?: string
  industry?: string
  note?: string
  pipedriveNote?: string
  occupationOther?: string
  subOccupationOther?: string
  json?: string
  learningPreference?: string
  persona?: string
  assessmentId?: string
  mailNotify: string
  lineMessage: null
  lineNotify: string
  chromeNotify: string
  learningComment?: string
  adminComment?: string
  school?: string
  createdAt: string
  updatedAt: string
}

export interface StudentInfoResponse {
  personalTitle: StudentPersonalTitle
  studentId: number
  firstname: INameLang
  lastname: INameLang
  nickname: INameLang
  email: string
  country: StudentCountry
  phone: string
  gender: StudentGender
  dob: string
  lastLogin: string
  interest: string
  facebook?: string
  avatar?: string
  language: StudentLanguage
  timezone: string
  type: number
  cefr?: string
  globishLevel?: string
  studentNote: IStudentNote
}

export interface IStudentList extends StudentInfoResponse {
  package?: IPackageInfo
}

export interface IUpdateStudentProfile {
  firstnameTH?: string
  lastnameTH?: string
  nicknameTH?: string
  firstnameEN?: string
  lastnameEN?: string
  nicknameEN?: string
  gender?: StudentGender
  dob?: string
  phone?: string
  email?: string
  country?: StudentCountry
  interests?: string
  timezone?: string
  industry?: string
  school?: string
  device?: string
  occupation?: string
  file?: File
}
