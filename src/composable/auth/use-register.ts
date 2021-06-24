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
  })

  const register = async () => {
    console.log('register')
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
    notyf.error('hello')
    if (status === 201) {
      return true
    }
    if (typeof message === 'object') {
      return
    }
    notyf.error(message || 'Fail! Please try again')
    // case error
    console.log(message)
  }

  return { ...toRefs(state), register }
}
