import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import StudentService from '/@src/api/student.service'
import { StudentCountry, StudentLanguage } from '/@src/types/enums/student.enum'
import {
  IStudentInfo,
  StudentInfoResponse,
} from '/@src/types/interfaces/student.interface'
interface UseStudentInfoState {
  studentInfo?: StudentInfoResponse
}
export default function useStudentInfo() {
  const state = reactive<UseStudentInfoState>({
    studentInfo: undefined,
  })
  const route = useRoute()

  const fetchStudentInfoById = async () => {
    const id = route.params.id as string
    if (!id) return
    const { status, data } = await StudentService.getStudentInfoById(+id)
    if (status === 200) {
      state.studentInfo = data
    }
  }

  onMounted(() => {
    fetchStudentInfoById()
  })

  return { ...toRefs(state) }
}
