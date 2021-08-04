/**
 * useRegister Composition API
 */
import { reactive, ref, toRefs } from 'vue'
import { Notyf } from 'notyf'
import { useRoute, useRouter } from 'vue-router'
import useAuthApi from '../api/useAuthApi'
import { errMessage } from '/@src/helpers/filter.helper'

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
  const route = useRoute()
  const isLoading = ref(false)
  const state = reactive<UseLoginState>({
    email: '',
    password: '',
  })
  const { loginAdmin } = useAuthApi()

  const login = async () => {
    isLoading.value = true
    const { status, message } = await loginAdmin({
      email: state.email,
      password: state.password,
    })
    isLoading.value = false
    if (status === 201) {
      const routePath = route.query.redirect
        ? { path: route.query.redirect }
        : { name: 'index' }
      router.push(routePath)
      return
    }
    notyf.error(errMessage(message) || 'Fail! Please try again')
  }

  return { ...toRefs(state), login }
}
