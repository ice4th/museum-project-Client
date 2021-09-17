import { computed, reactive, toRefs } from 'vue'
import { useRoute } from 'vue-router'
import useClipboard from 'vue-clipboard3'
import useStudentApi from '../api/useStudentApi'
import useNotyf from '../useNotyf'
import { errMessage } from '/@src/helpers/filter.helper'

interface UseStudentSetup {
  isCopied: Boolean
}
export default function useStudentSetup() {
  const state = reactive<UseStudentSetup>({
    isCopied: false,
  })
  const route = useRoute()
  const notif = useNotyf()

  const { forgotPassword: forgotPasswordApi } = useStudentApi()

  const studentId = computed(() => route.params.id as string)

  const forgotPassword = async () => {
    const res = await forgotPasswordApi(+studentId.value)
    if (res.status === 201) {
      notif.success('Success')
    } else {
      notif.error(errMessage(res.message))
    }
  }
  const copyForgotLink = async () => {
    // const { data } = await forgotPasswordApi(+studentId)
    // const { toClipboard } = useClipboard()
    // toClipboard()
  }

  return { forgotPassword, copyForgotLink, ...toRefs(state) }
}
