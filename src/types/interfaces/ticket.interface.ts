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
