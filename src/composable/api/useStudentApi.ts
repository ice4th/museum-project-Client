import { checkResponseStatus } from '.'
import useApi, { ApiResponse } from '../useApi'
import {
  IPaginationParams,
  IPaginationResponse,
} from '/@src/types/interfaces/common.interface'
import {
  IStudentList,
  IUpdateStudentProfile,
  StudentInfoResponse,
} from '/@src/types/interfaces/student.interface'

export default function useStudentApi() {
  const api = useApi()

  const getStudentInfoById = async (
    studentId: number
  ): Promise<StudentInfoResponse | null> => {
    const res = await api.get<StudentInfoResponse>(
      `/Students/Info/${studentId}`
    )
    return checkResponseStatus(res)
  }

  const getAllStudents = async (
    params: IPaginationParams,
    search?: string
  ): Promise<IPaginationResponse<IStudentList[]>> => {
    const res = await api.get<IPaginationResponse<IStudentList[]>>(
      `/Students/Info/All`,
      { params: { ...params, search } }
    )
    return checkResponseStatus(res)
  }

  const updateStudentInfoById = async (
    studentId: number,
    payload: IUpdateStudentProfile
  ) => {
    const res = await api.put<StudentInfoResponse, ApiResponse>(
      `/Students/Info/${studentId}`,
      payload
    )
    return res
  }

  return { getStudentInfoById, getAllStudents, updateStudentInfoById }
}
