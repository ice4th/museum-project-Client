/**
 * useConfirmAccount Composition API
 */
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import useAuthApi from '../api/useAuthApi'
import { errMessage } from '/@src/helpers/filter.helper'
import { IUserInfo } from '/@src/types/interfaces/admin.interface'
export default function useConfirmAccount() {
  const route = useRoute()
  const isLoading = ref(false)
  const messageError = ref('')
  const myProfile = ref<IUserInfo | undefined>(undefined)
  const { activeAccount, getMyAdminInfo } = useAuthApi()
  const activateAccount = async () => {
    isLoading.value = true
    const token = route.query.token as string
    const { status, message } = await activeAccount(token)
    isLoading.value = false
    if (status === 201) {
      const data = await getMyAdminInfo()
      myProfile.value = data || undefined
      return
    }
    messageError.value = errMessage(message)
  }

  onMounted(() => {
    activateAccount()
  })

  return { activateAccount, isLoading, messageError, myProfile }
}
