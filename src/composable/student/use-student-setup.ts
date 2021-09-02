import { useRoute } from 'vue-router'
import useStudentApi from '../api/useStudentApi'
import useNotyf from '../useNotyf'
import { errMessage } from '/@src/helpers/filter.helper'
export default function useStudentList() {
  const route = useRoute()
  const notif = useNotyf()

  const { forgotPassword: forgotPasswordApi } = useStudentApi()

  const forgotPassword = async () => {
    const id = route.params.id as string
    const res = await forgotPasswordApi(+id)
    if (res.status === 201) {
      notif.success('Success')
    } else {
      notif.error(errMessage(res.message))
    }
  }

  return { forgotPassword }
}
