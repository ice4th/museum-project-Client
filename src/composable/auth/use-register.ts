/**
 * useRegister Composition API
 */
import { onMounted, reactive, ref, toRefs } from 'vue'
import { ICreateAdminUser } from '/@src/types/interfaces/auth.interface'
import { Notyf } from 'notyf'
import useAuthApi from '../api/useAuthApi'
import { isSuccess } from '../api'
import useOptionApi from '../api/useOptionApi'
import { AdminCountry } from '/@src/types/enums/admin.enum'
import { errMessage } from '/@src/helpers/filter.helper'
import { toFormat } from '/@src/helpers/date.helper'

interface UseRegisterState {
  newUser: ICreateAdminUser
  confirmPassword: string
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
    confirmPassword: '',
    newUser: {
      name: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      phone: '',
      dob: toFormat(undefined, 'YYYY-MM-DD'),
      country: AdminCountry.TH,
      teamId: 0,
    },
    validation: {},
  })

  const { registerAdmin } = useAuthApi()
  const { getTeams, teamOptions } = useOptionApi()
  const register = async () => {
    isLoading.value = true
    const res = await registerAdmin(state.newUser)
    isLoading.value = false
    if (isSuccess(res)) return true
    if (typeof res?.message === 'object') {
      state.validation = res.message
      return
    }
    notyf.error(errMessage(res.message) || 'Fail! Please try again')
  }

  onMounted(() => {
    getTeams()
  })

  return { ...toRefs(state), teamOptions, isLoading, register }
}
