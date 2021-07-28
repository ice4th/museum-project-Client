import { TicketType } from '../enums/ticket.enum'

export interface ITicketInfo {
  id: number
  type: TicketType
  packageItemId: number
  startDate?: Date
  expireDate: Date
  studentId: number
  comment?: string
  partner?: number
}

export interface IAddTicketStudent {
  type: string
  amount: number
  comment: string
  packageItemId: number
  startDate?: string
  expireDate?: string
}

export interface IExpireTicketStudent {
  type?: string
  expireDate: string
  comment: string
  packageItemId: number
}
