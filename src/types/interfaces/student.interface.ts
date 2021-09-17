import {
  StudentCountry,
  StudentGender,
  StudentLanguage,
  StudentPersonalTitle,
} from '../enums/student.enum'
import { INameLang } from './common.interface'
import { IPartner } from './partner.interface'

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

export interface IStudentInfo {
  personalTitle: StudentPersonalTitle
  id: number
  firstname: INameLang
  lastname: INameLang
  nickname: INameLang
  email: string
  country: StudentCountry
  phone: string
  gender: StudentGender
  dob: string
  interest: string
  facebook?: string
  avatar?: string
  language: StudentLanguage
  timezone: string
  type: number
  cefr?: string
  globishLevel?: string
  studentNote: IStudentNote
  ticket?: IStudentTicketResult
}

export interface IStudentTicketResult {
  available: number
  used: number
}

export interface IStudentList extends IStudentInfo {
  partners?: IPartner[]
  ticket: {
    available: number
    used: number
  }
}

export interface IStudentPrivateClass {
  id: number
  time: number
  endTime: number
  coachAttend: Date
  studentAttend: Date
  ticketId: number
  coach: {
    id: number
    name: string
  }
  packageName: string
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

export interface IStudentGroupClass {
  id: number
  topic: string
  type: string
  level: string
  teacher: string
  date: string
  time: string
  attend: string
}

export interface IStudentGlobishPlusInfo {
  firstname: string
  lastname: string
  phone: string
  email: string
  voxyLevel: number
  globishLevel: number
  featureGroupId: number
  featureGroup: {
    id: number
    name: string
  }
  tickets: IStudentGlobishPlusTicket[]
  joinedDate: string
  expireDate: string
  dateOfNextVpa: string
  nativeLanguage: string
  accessType: string
  segments: unknown
  purchasedTutoringCredits: number
  tutoringCredits: number
  tutoringCreditsUsed: number
  canReserveGroupSessions: boolean
}

export interface IUpdateStudentGlobishPlusProfile {
  expireDate: Date
  firstname: string
  lastname: string
  email: string
  globishLevel: number
  featureGroupId: number
}

export interface IStudentGlobishPlusTicket {
  id: number
  packageItemId: number
  featureGroupId: number
  packageId: number
  packageName: string
  productLevel: number
  startDate: Date
  expireDate: Date
}
