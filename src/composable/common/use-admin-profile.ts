/**
 * useAdminProfile Composition API
 */
import { onBeforeMount, reactive, ref, toRefs } from 'vue'
import AuthService from '/@src/api/auth.service'
import { Notyf } from 'notyf'
import { useRoute, useRouter } from 'vue-router'
import { IAdminInfo } from '/@src/types/interfaces/admin.interface'
import { AdminStatus } from '/@src/types/enums/admin.enum'

const LOCAL_KEY = 'wh_profile'
export default function useAdminProfile() {
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
  const adminProfile = reactive<IAdminInfo>({
    id: 0,
    name: '',
    email: '',
    firstname: '',
    lastname: '',
    status: AdminStatus.DEACTIVATE,
    avatar: '',
    phone: '',
    dob: '',
    lastLogin: '',
  })

  const fetchProfile = async () => {
    isLoading.value = true
    const { data, status } = await AuthService.getMyAdminInfo()
    isLoading.value = false
    if (status === 200) {
      adminProfile.id = data.id
      adminProfile.name = data.name
      adminProfile.email = data.email
      adminProfile.firstname = data.firstname
      adminProfile.lastname = data.lastname
      adminProfile.status = data.status
      adminProfile.avatar = data.avatar
      adminProfile.dob = data.dob
      adminProfile.lastLogin = data.lastLogin
      localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
      return
    }
  }

  const getMyProfile = async () => {
    const myProfile = localStorage.getItem(LOCAL_KEY)
    if (!!myProfile) {
      const parsedProfile = JSON.parse(myProfile) as IAdminInfo
      adminProfile.id = parsedProfile.id
      adminProfile.name = parsedProfile.name
      adminProfile.email = parsedProfile.email
      adminProfile.firstname = parsedProfile.firstname
      adminProfile.lastname = parsedProfile.lastname
      adminProfile.status = parsedProfile.status
      adminProfile.avatar = parsedProfile.avatar
      adminProfile.dob = parsedProfile.dob
      adminProfile.lastLogin = parsedProfile.lastLogin
      return
    }
    await fetchProfile()
  }

  const logout = async () => {
    await AuthService.removeCookie()
    localStorage.removeItem(LOCAL_KEY)
    router.push({ name: 'auth-login' })
  }

  onBeforeMount(() => {
    const isLoggedIn = !!AuthService.getToken()
    if (!isLoggedIn) return
    getMyProfile()
  })

  return { adminProfile, fetchProfile, logout, messageError }
}
