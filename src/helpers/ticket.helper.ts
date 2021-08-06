import { TicketType } from '../types/enums/ticket.enum'
import ticketTypeList from '/@src/data/ticket-type.json'
export const displayTicketText = (ticketType?: TicketType) => {
  return ticketTypeList.find((type) => type.value === ticketType)?.text || ''
}
