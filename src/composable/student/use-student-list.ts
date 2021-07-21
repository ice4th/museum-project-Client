import { onMounted, reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
import StudentService from '/@src/api/student.service'
import { IStudentList } from '/@src/types/interfaces/student.interface'
interface UseStudentListState {
  data: IStudentList[]
  currentPage: number
  totalPage: number
  perPage: number
  total: number
  search: string
}

export default function useStudentList() {
  const state = reactive<UseStudentListState>({
    data: [],
    currentPage: 1,
    totalPage: 0,
    perPage: 10,
    total: 0,
    search: '',
  })
  const route = useRoute()
  const fetchAllStudents = async () => {
    console.log('search', state.search)
    const { data, status } = await StudentService.getAllStudents(
      {
        currentPage: state.currentPage,
        perPage: state.perPage,
      },
      state.search
    )
    if (status === 200 && data) {
      state.data = data.data
      state.total = data.total
      state.totalPage = data.totalPage
    }
  }
  onMounted(() => {
    const page = route.query.page as string
    const search = route.query.search as string
    const perPage = route.query.perPage as string
    if (page) {
      state.currentPage = +page
    }
    if (perPage) {
      state.perPage = +perPage
    }
    if (search) {
      state.search = search
    }
    fetchAllStudents()
  })
  return { ...toRefs(state) }
}
