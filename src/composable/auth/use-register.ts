/**
 * useRegister Composition API
 */
import { reactive, ref, toRefs } from 'vue'
import { ICreateAdminUser } from '/@src/types/interfaces/auth.interface'
import { Notyf } from 'notyf'
import { themeColors } from '/@src/utils/themeColors'
import useAuthApi from '../api/useAuthApi'
import { checkResponseStatus } from '../api'

interface UseRegisterState {
  name: string
  email: string
  password: string
  confirmPassword: string
  firstname: string
  lastname: string
  phone: string
  dob?: string
  validation: object
}
export default function useRegister() {
  const notyf = new Notyf({
    duration: 2000,
    position: {
      x: 'center',
      y: 'top',
    },
  })
  const isLoading = ref(false)
  const state = reactive<UseRegisterState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
    phone: '',
    dob: undefined,
    validation: {},
  })

  const { registerAdmin } = useAuthApi()
  const register = async () => {
    const { name, email, password, firstname, lastname, phone, dob } = state
    const payload = {
      name,
      email,
      password,
      firstname,
      lastname,
      phone,
      dob,
    } as ICreateAdminUser
    isLoading.value = true
    const res = await registerAdmin(payload)
    isLoading.value = false
    if (checkResponseStatus(res)) return true
    if (typeof res?.message === 'object') {
      state.validation = res.message
    }
    notyf.error(res?.message || 'Fail! Please try again')
  }

  return { ...toRefs(state), isLoading, register }
}
