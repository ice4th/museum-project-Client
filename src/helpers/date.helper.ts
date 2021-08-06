import moment, { Moment } from 'moment-timezone'

export const toFormat = (date?: Date | string, format?: string): string => {
  return moment(date).format(format || 'YYYY-MM-DD HH:mm:ss')
}
