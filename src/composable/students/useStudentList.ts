import { onMounted, reactive, toRefs, watch } from 'vue'
import useStudentApi from '../api/useStudentApi'
import usePaginationRoute from '../usePaginationRoute'
import { IStudentList } from '/@src/types/interfaces/student.interface'
interface UseStudentListState {
  data: IStudentList[]
  total: number
  isLoading: Boolean
}

export default function useStudentList() {
  const state = reactive<UseStudentListState>({
    data: [],
    total: 0,
    isLoading: true,
  })
  const { currentPage, perPage, search } = usePaginationRoute()
  const { getAllStudents } = useStudentApi()
  const fetchAllStudents = async () => {
    state.isLoading = true
    const data = await getAllStudents({
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
  onMounted(() => {
    fetchAllStudents()
  })
  return { ...toRefs(state) }
}
