/**
 * useConfirmAccount Composition API
 */
import { onMounted, reactive, ref, toRefs } from 'vue'
import AuthService from '/@src/api/auth.service'
import { Notyf } from 'notyf'
import { useRoute, useRouter } from 'vue-router'
import useAdminProfile from '../common/use-admin-profile'
export default function useConfirmAccount() {
  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: 'center',
      y: 'top',
    },
  })
  const router = useRouter()
  const route = useRoute()
  const isLoading = ref(false)
  const messageError = ref('')
  const { fetchProfile, adminProfile } = useAdminProfile()

  const activateAccount = async () => {
    isLoading.value = true
    const token = route.query.token as string
    const { status, message } = await AuthService.activeAccount(token)
    isLoading.value = false
    if (status === 201) {
      await fetchProfile()
      return
    }
    messageError.value = message
  }

  onMounted(() => {
    activateAccount()
  })

  return { activateAccount, isLoading, messageError, adminProfile }
}
