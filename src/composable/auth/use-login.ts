/**
 * useRegister Composition API
 */
import { reactive, ref, toRefs } from 'vue'
import AuthService from '/@src/api/auth.service'
import { Notyf } from 'notyf'
import { useRouter } from 'vue-router'
import useAdminProfile from '../common/use-admin-profile'

interface UseLoginState {
  email: string
  password: string
}
export default function useLogin() {
  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: 'center',
      y: 'top',
    },
  })
  const router = useRouter()
  const { fetchProfile } = useAdminProfile()
  const isLoading = ref(false)
  const state = reactive<UseLoginState>({
    email: '',
    password: '',
  })

  const login = async () => {
    isLoading.value = true
    const { status, message, data } = await AuthService.loginAdmin({
      email: state.email,
      password: state.password,
    })
    isLoading.value = false
    if (status === 201) {
      console.log('success')
      await fetchProfile()
      router.push('/')
      return
    }
    if (typeof message === 'object') {
      return
    }
    notyf.error(message || 'Fail! Please try again')
  }

  return { ...toRefs(state), login }
}
