import { checkResponseStatus } from '.'
import useApi from '../useApi'
import { StudentInfoResponse } from '/@src/types/interfaces/student.interface'

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

  return { getStudentInfoById }
}
