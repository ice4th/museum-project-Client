/**
 * StudentService about student service
 */
import {
  IPaginationParams,
  IPaginationResponse,
} from '../types/interfaces/common.interface'
import { StudentPackageItemResponse } from '../types/interfaces/package-item.interface'
import {
  IStudentList,
  IUpdateStudentProfile,
  StudentInfoResponse,
} from '../types/interfaces/student.interface'
import ApiService, { ApiServiceResponse } from './api.service'

export default class StudentService {
  public static async getStudentInfoById(
    studentId: number
  ): Promise<ApiServiceResponse<StudentInfoResponse>> {
    const res = await ApiService.get<StudentInfoResponse>(
      `/Students/Info/${studentId}`
    )
    return res
  }

  public static async getAllStudents(
    params: IPaginationParams,
    search?: string
  ): Promise<ApiServiceResponse<IPaginationResponse<IStudentList[]>>> {
    return await ApiService.get<IPaginationResponse<IStudentList[]>>(
      `/Students/Info/All`,
      { params: { ...params, search } }
    )
  }

  public static async updateStudentInfoById(
    studentId: number,
    payload: IUpdateStudentProfile
  ): Promise<ApiServiceResponse<StudentInfoResponse>> {
    const res = await ApiService.put<StudentInfoResponse>(
      `/Students/Info/${studentId}`,
      payload
    )
    return res
  }

  public static async getStudentPackageItems(
    studentId: number
  ): Promise<ApiServiceResponse<StudentPackageItemResponse>> {
    const res = await ApiService.get<StudentPackageItemResponse>(
      `/Students/${studentId}/Packages`
    )
    return res
  }
}
