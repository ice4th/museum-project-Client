/**
 * StudentService about student service
 */
import { StudentInfoResponse } from '../types/interfaces/student.interface'
import ApiService, { ApiServiceResponse } from './api.service'

export default class StudentService {
  public static async getStudentInfoById(
    studentId: number
  ): Promise<ApiServiceResponse<StudentInfoResponse>> {
    const res = await ApiService.get<StudentInfoResponse>(
      `/Student/Info/${studentId}`
    )
    return res
  }
}
