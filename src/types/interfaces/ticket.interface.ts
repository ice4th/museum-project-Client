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
  studentId?: number
  startDate?: string
  expireDate?: string
}

export interface IExpireTicketStudent {
  type?: TicketType
  expireDate: string
  comment: string
  packageItemId: number
}

export interface IStartTicketStudent {
  type?: string
  startDate: string | null
  comment: string
  packageItemId: number
}
