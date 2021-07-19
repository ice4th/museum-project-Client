export const addCommas = (num: number): string => {
  return num ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
}

export const isNil = (val: any): boolean => {
  return val === undefined || val === null
}

export const errMessage = (message: any): string => {
  return message && typeof message === 'object'
    ? Object.values(message).join('\n')
    : Array.isArray(message)
    ? message.join('\n')
    : message
}
