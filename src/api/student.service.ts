/**
 * StudentService about student service
 */
import {
  IPaginationParams,
  IPaginationResponse,
} from '../types/interfaces/common.interface'
import {
  IStudentList,
  StudentInfoResponse,
} from '../types/interfaces/student.interface'
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

  public static async getAllStudents(
    params: IPaginationParams
  ): Promise<ApiServiceResponse<IPaginationResponse<IStudentList[]>>> {
    return await ApiService.get<IPaginationResponse<IStudentList[]>>(
      `/Students`,
      { params }
    )
  }
}
