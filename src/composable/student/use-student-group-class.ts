import { onMounted, reactive, toRefs, watch } from 'vue'
import useStudentApi from '../api/useStudentApi'
import usePaginationRoute from '../usePaginationRoute'
import { IStudentGroupClass } from '/@src/types/interfaces/student.interface'
interface UseStudentGroupClassState {
  data: IStudentGroupClass[]
  total: number
  isLoading: Boolean
}

export default function useStudentGroupClass() {
  const state = reactive<UseStudentGroupClassState>({
    data: [],
    total: 0,
    isLoading: true,
  })
  const { currentPage, perPage, search } = usePaginationRoute()
  const { getStudentGroupClass } = useStudentApi()
  const fetchStudentGroupClass = async (studentId: number) => {
    state.isLoading = true
    const data = await getStudentGroupClass(studentId, {
      currentPage,
      perPage,
      search,
    })
    state.isLoading = false
    if (data) {
      state.data = data.data
      state.total = data.total
    }
  }
  return { ...toRefs(state), fetchStudentGroupClass }
}
