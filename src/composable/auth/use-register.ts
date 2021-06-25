/**
 * useRegister Composition API
 */
import { reactive, ref, toRefs } from 'vue'
import useNotyf from '/@src/composable/useNotyf'
import AuthService from '/@src/api/auth.service'
import { ICreateAdminUser } from '/@src/types/interfaces/auth.interface'
import { Notyf } from 'notyf'
import { themeColors } from '/@src/utils/themeColors'

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
    const { status, message } = await AuthService.registerAdmin(payload)
    isLoading.value = false
    if (status === 201) {
      return true
    }
    if (typeof message === 'object') {
      state.validation = message
      return
    }
    notyf.error(message || 'Fail! Please try again')
  }

  return { ...toRefs(state), isLoading, register }
}
