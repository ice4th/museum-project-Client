import { onMounted, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import useStudentApi from '../api/useStudentApi'
import { StudentInfoResponse } from '/@src/types/interfaces/student.interface'
interface UseStudentInfoState {
  studentInfo?: StudentInfoResponse
}
export default function useStudentInfo() {
  const state = reactive<UseStudentInfoState>({
    studentInfo: undefined,
  })
  const route = useRoute()
  const { getStudentInfoById } = useStudentApi()

  const fetchStudentInfoById = async () => {
    const id = route.params.id as string
    if (!id) return
    const data = await getStudentInfoById(+id)
    if (data) {
      state.studentInfo = data
    }
  }

  onMounted(() => {
    fetchStudentInfoById()
  })

  return { ...toRefs(state) }
}
