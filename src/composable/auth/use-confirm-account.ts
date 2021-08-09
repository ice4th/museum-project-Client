/**
 * useConfirmAccount Composition API
 */
import { onMounted, ref } from 'vue'
import { Notyf } from 'notyf'
import { useRoute } from 'vue-router'
import useAuthApi from '../api/useAuthApi'
import { errMessage } from '/@src/helpers/filter.helper'
export default function useConfirmAccount() {
  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: 'center',
      y: 'top',
    },
  })
  const route = useRoute()
  const isLoading = ref(false)
  const messageError = ref('')
  const { activeAccount } = useAuthApi()
  const activateAccount = async () => {
    isLoading.value = true
    const token = route.query.token as string
    const { status, message } = await activeAccount(token)
    isLoading.value = false
    if (status === 201) return
    messageError.value = errMessage(message)
  }

  onMounted(() => {
    activateAccount()
  })

  return { activateAccount, isLoading, messageError }
}
