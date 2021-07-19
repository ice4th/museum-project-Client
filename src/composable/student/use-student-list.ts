import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import StudentService from '/@src/api/student.service'
import { IStudentList } from '/@src/types/interfaces/student.interface'
interface UseStudentListState {
  data: IStudentList[]
  currentPage: number
  totalPage: number
  perPage: number
  total: number
}
const rows = [
  {
    studentId: 24292,
    firstname: {
      th: '',
      en: 'Erik',
    },
    lastname: {
      th: '',
      en: 'K.',
    },
    nickname: {
      th: '',
      en: 'Erik',
    },
    globishLevel: 0,
    partner: { name: 'Speaking Lab Vietnam' },
    gender: 'male',
    avatar:
      'https://cdn.icon-icons.com/icons2/2643/PNG/512/male_boy_person_people_avatar_icon_159358.png',
    email: 'new0-erik@gmail.com',
    phone: '0839434332',
    country: 'vn',
    package: { packageName: 'Speaking Lab Preteen' },
    lastLogin: '2021-01-20T10:10:00.000Z',
  },
  {
    personalTitle: null,
    studentId: 24293,
    firstname: {
      th: 'ดุษฎี',
      en: 'Dusadee',
    },
    lastname: {
      th: 'ศรีจุลโพธิ์',
      en: 'Srijulpo',
    },
    nickname: {
      th: 'มุกกี้',
      en: 'Mookky',
    },
    email: 'dusadee.s@globish.co.th',
    country: 'th',
    phone: '0829144431',
    gender: 'female',
    dob: '1995-05-21',
    lastLogin: '2021-03-25T04:18:00.000Z',
    interest: '',
    facebook: '10225139245134035',
    avatar:
      'https://d1bnvx5vhcnf8w.cloudfront.net/student/avatar/20210204_a80cc73919374c651827f19a1f5de8aca9ac6e61.JPG',
    language: 'en',
    timezone: 'America/Denver',
    type: 1,
    cefr: null,
    globishLevel: 'A1+',
    package: { packageName: 'Business English G3' },
  },
  {
    personalTitle: null,
    studentId: 24294,
    firstname: {
      th: '',
      en: 'Daniel',
    },
    lastname: {
      th: '',
      en: 'Kang',
    },
    nickname: {
      th: '',
      en: 'Dan',
    },
    email: 'Daniel@gmail.com',
    country: 'kr',
    phone: '0343242334',
    gender: 'male',
    dob: '1996-12-10',
    lastLogin: '2021-07-12T04:09:30.000Z',
    interest: '',
    facebook: '10225139245134035',
    avatar:
      'https://www.hallyukstar.com/wp-content/uploads/2019/03/KANG-DANIEL.jpg',
    language: 'en',
    timezone: 'America/Denver',
    type: 1,
    cefr: null,
    globishLevel: 'A1+',
    id: 24294,
    package: { packageName: 'Business English G4' },
  },
]

const rawData = Array(5).fill(rows[0])
rawData.push(...Array(5).fill(rows[1]))
rawData.push(...Array(5).fill(rows[2]))
export default function useStudentList() {
  const state = reactive<UseStudentListState>({
    data: [],
    currentPage: 1,
    totalPage: 0,
    perPage: 0,
    total: 0,
  })
  const route = useRoute()
  const fetchAllStudents = async () => {
    // const { data, status } = await StudentService.getAllStudents({
    //   currentPage: state.currentPage,
    //   perPage: state.perPage,
    // })
    state.data = rawData
    state.total = rawData.length
    state.totalPage = 2
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
    fetchAllStudents()
  })
  return { ...toRefs(state), fetchAllStudents }
}
