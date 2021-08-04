import { checkResponseStatus } from '.'
import useApi, { ApiResponse } from '../useApi'
import {
  IPaginationParams,
  IPaginationResponse,
} from '/@src/types/interfaces/common.interface'
import { StudentPackageItemResponse } from '/@src/types/interfaces/package-item.interface'
import {
  IStudentList,
  IUpdateStudentProfile,
  StudentInfoResponse,
} from '/@src/types/interfaces/student.interface'
import {
  IAddTicketStudent,
  IStartTicketStudent,
  IExpireTicketStudent,
} from '/@src/types/interfaces/ticket.interface'

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

  const getStudentPackageItems = async (
    studentId: number
  ): Promise<StudentPackageItemResponse | null> => {
    const res = await api.get<StudentPackageItemResponse>(
      `/Students/${studentId}/Packages`
    )
    return checkResponseStatus(res)
  }

  const addNewTicketStudent = async (payload: IAddTicketStudent) => {
    const res = await api.post<any, ApiResponse>(
      `/Tickets/${payload.packageItemId}/Add`,
      payload
    )
    return res
  }

  const activatePackageItemById = async (
    packageItemId: number,
    payload: { startDate?: string }
  ) => {
    return await api.post<any, ApiResponse>(
      `/Tickets/${packageItemId}/Activate`,
      payload
    )
  }

  const changeStartDateTicket = async (payload: IStartTicketStudent) => {
    return await api.put<any, ApiResponse>(
      `/Tickets/${payload.packageItemId}/StartDate`,
      payload
    )
  }

  const changeExpireDateTicket = async (payload: IExpireTicketStudent) => {
    return await api.put<any, ApiResponse>(
      `/Tickets/${payload.packageItemId}/ExpireDate`,
      payload
    )
  }

  return {
    getStudentInfoById,
    getAllStudents,
    updateStudentInfoById,
    getStudentPackageItems,
    addNewTicketStudent,
    activatePackageItemById,
    changeStartDateTicket,
    changeExpireDateTicket,
  }
}
