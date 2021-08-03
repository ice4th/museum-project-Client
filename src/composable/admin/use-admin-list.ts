import { onMounted, reactive, toRefs, watch } from 'vue'
import { useRoute } from 'vue-router'
import { IAdminInfo } from '/@src/types/interfaces/admin.interface'
interface UseStudentListState {
  data: IAdminInfo[]
  currentPage: number
  totalPage: number
  perPage: number
  total: number
  search: string
  isLoading: Boolean
}

export default function useAdminList() {
  const state = reactive<UseStudentListState>({
    data: [],
    currentPage: 1,
    totalPage: 0,
    perPage: 10,
    total: 0,
    search: '',
    isLoading: true,
  })
  const route = useRoute()
  const fetchAllAdmins = async () => {
    state.isLoading = true
    state.data = [
      {
        avatar:
          'https://d1bnvx5vhcnf8w.cloudfront.net/student/avatar/dq9HN3OHJW4M7LpwferV2gTLskHKb53jECfXU2nh.jpeg',
        dob: '1996-12-11T17:00:00.000Z',
        email: 'asamaporn.c@globish.co.th',
        firstname: 'string',
        id: 4,
        lastLogin: '2021-07-28T12:51:06.000Z',
        lastname: 'string',
        name: 'test',
        phone: '0123456789',
        status: 1,
      },
      {
        avatar:
          'https://d1bnvx5vhcnf8w.cloudfront.net/student/avatar/dq9HN3OHJW4M7LpwferV2gTLskHKb53jECfXU2nh.jpeg',
        dob: '1996-12-11T17:00:00.000Z',
        email: 'asamaporn.c@globish.co.th',
        firstname: 'string',
        id: 3,
        lastLogin: '2021-07-28T12:51:06.000Z',
        lastname: 'string',
        name: 'test',
        phone: '0123456789',
        status: 1,
      },
      {
        avatar:
          'https://d1bnvx5vhcnf8w.cloudfront.net/student/avatar/dq9HN3OHJW4M7LpwferV2gTLskHKb53jECfXU2nh.jpeg',
        dob: '1996-12-11T17:00:00.000Z',
        email: 'asamaporn.c@globish.co.th',
        firstname: 'string',
        id: 2,
        lastLogin: '2021-07-28T12:51:06.000Z',
        lastname: 'string',
        name: 'test',
        phone: '0123456789',
        status: 0,
      },
      {
        avatar:
          'https://d1bnvx5vhcnf8w.cloudfront.net/student/avatar/dq9HN3OHJW4M7LpwferV2gTLskHKb53jECfXU2nh.jpeg',
        dob: '1996-12-11T17:00:00.000Z',
        email: 'asamaporn.c@globish.co.th',
        firstname: 'string',
        id: 1,
        lastLogin: '2021-07-28T12:51:06.000Z',
        lastname: 'string',
        name: 'test',
        phone: '0123456789',
        status: 0,
      },
    ]
    // const data = await getAllStudents(
    //   {
    //     currentPage: state.currentPage,
    //     perPage: state.perPage,
    //   },
    //   state.search
    // )
    state.isLoading = false
    // if (data) {
    //   state.data = data.data
    //   state.total = data.total
    //   state.totalPage = data.totalPage
    // }
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
    fetchAllAdmins()
  })
  return { ...toRefs(state) }
}
