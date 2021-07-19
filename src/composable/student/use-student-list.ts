import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'

interface IStudent {
  id: number
  name: string
  status: string
  country: string
  picture: string
  lastlogin: Date
}

interface UseStudentListState {
  data: IStudent[]
  currentPage: number
  totalPage: number
  perPage: number
  total: number
}

export default function useStudentList() {
  const state = reactive<UseStudentListState>({
    data: [],
    currentPage: 0,
    totalPage: 0,
    perPage: 0,
    total: 0,
  })
  const route = useRoute()
  const fetchStudents = async () => {
    // const { data, status } = await RedeemService.getAllRedeems({
    //   currentPage: state.currentPage,
    //   perPage: state.perPage,
    // })
    // if (status === 200 && data) {
    //   state.data = data.data
    //   state.total = data.total
    //   state.totalPage = data.totalPage
    // }
  }
  onMounted(() => {
    const page = route.query.page as string
    if (page) {
      state.currentPage = +page
    }
  })
  return { ...toRefs(state), fetchStudents }
}
