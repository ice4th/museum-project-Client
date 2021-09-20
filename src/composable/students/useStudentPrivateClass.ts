import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import useStudentApi from '/@src/composable/api/useStudentApi'
import usePaginationRoute from '/@src/composable/usePaginationRoute'
import { IStudentPrivateClass } from '/@src/types/interfaces/student.interface'
interface UseStudentListState {
  data: IStudentPrivateClass[]
  total: number
  isLoading: Boolean
}

export default function useStudentPrivateClass() {
  const state = reactive<UseStudentListState>({
    data: [],
    total: 0,
    isLoading: true,
  })
  const route = useRoute()

  const { currentPage, perPage, search } = usePaginationRoute()
  const { getStudentPrivateClass } = useStudentApi()
  const fetchStudentPrivateClass = async () => {
    const id = route.params.id as string
    state.isLoading = true
    const data = await getStudentPrivateClass(+id, {
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
    fetchStudentPrivateClass()
  })
  return { ...toRefs(state) }
}
