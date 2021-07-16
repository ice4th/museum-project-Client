import { IStudentInfo } from '../types/interfaces/student.interface'

export const displayStudentFullname = (studentInfo: IStudentInfo) => {
  return studentInfo.firstname.en
    ? `${studentInfo.firstname.en} ${studentInfo.lastname.en}`
    : `${studentInfo.firstname.th} ${studentInfo.lastname.th}`
}
