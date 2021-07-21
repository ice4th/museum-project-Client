import {
  IStudentInfo,
  StudentInfoResponse,
} from '../types/interfaces/student.interface'

export const displayStudentFullname = (studentInfo?: StudentInfoResponse) => {
  return studentInfo
    ? studentInfo.firstname.th
      ? `${studentInfo.firstname.th} ${studentInfo.lastname.th}`
      : `${studentInfo.firstname.en} ${studentInfo.lastname.en}`
    : ''
}

export const countryFlag = {
  th: '/images/icons/flags/thailand.svg',
  vn: '/images/icons/flags/vietnam.svg',
}
