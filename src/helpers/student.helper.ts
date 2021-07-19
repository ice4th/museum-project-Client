import {
  IStudentInfo,
  StudentInfoResponse,
} from '../types/interfaces/student.interface'

export const displayStudentFullname = (studentInfo?: StudentInfoResponse) => {
  return studentInfo
    ? studentInfo.firstname.en
      ? `${studentInfo.firstname.en} ${studentInfo.lastname.en}`
      : `${studentInfo.firstname.th} ${studentInfo.lastname.th}`
    : ''
}
