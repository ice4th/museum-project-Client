import { IInitialAvatar } from '../types/interfaces/common.interface'

export const avatarColor = [
  '',
  'primary',
  'success',
  'warning',
  'danger',
  'info',
  'h-yellow',
  'h-orange',
  'h-purple',
  'h-green',
  'h-blue',
  'h-red',
]

export const initAvatar = (fname: string, lname: string): IInitialAvatar => {
  const initials = (fname || 'x').charAt(0) + (lname || 'x').charAt(0)
  const indexColor =
    `${fname || 'x'}${lname || 'x'}`.length % avatarColor.length
  return { initials, color: avatarColor[indexColor] }
}
