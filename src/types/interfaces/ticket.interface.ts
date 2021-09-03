import { TicketType } from '../enums/ticket.enum'

export interface ITicketInfo {
  id: number
  type: TicketType
  packageItemId: number
  expireDate: Date
  studentId: number
  startDate?: Date
  comment?: string
  partner?: number
}

export interface IAddTicketStudent {
  type: string
  amount: number
  comment: string
  packageItemId: number
  studentId?: number
  startDate?: string
  expireDate?: string
}

export interface IExpireTicketStudent {
  expireDate: string
  comment: string
  packageItemId: number
  type?: TicketType
}

export interface IStartTicketStudent {
  startDate: string | null
  comment: string
  packageItemId: number
  type?: string
}

export interface IDeleteTicketPayload {
  packageItemId: number
  amount: number
  type: TicketType
  comment: string
}

export interface IAddPackageStudent {
  comment: string
  packageId: number
  studentId?: number
  startDate?: string | null
}
